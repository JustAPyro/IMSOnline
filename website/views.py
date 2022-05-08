from datetime import datetime

from flask import Blueprint, render_template, request, redirect, url_for
from flask_login import login_required, current_user
from sqlalchemy import func
from .models import Transaction, Transaction_Information, Item
from . import db

# Our blueprint is called views
views = Blueprint('views', __name__)


@views.route('/')
@login_required
def home():
    return render_template("home.html", user=current_user)


@views.route('/view_inventory')
@login_required
def view_inventory():
    user_items = current_user.items.all()
    return render_template("view_inventory.html", user=current_user, user_items=user_items)


@views.route('/add_transaction', methods=['GET', 'POST'])
@login_required
def add_inventory():
    if request.method == 'POST':
        return _add_inventory_POST()
    if request.method == 'GET':
        return _add_inventory_GET()


def _add_inventory_POST():
    # Get the number of entries
    num_entries = int(request.form.get("entries"))
    item_names = map(lambda itm: item.name, current_user.items.all())
    skus = map(lambda itm: itm.sku, current_user.items.all())

    # get the batch ID
    batch_id = request.form.get("batchID")
    batch_date = datetime.strptime(request.form.get("calDate"), "%Y-%m-%d").date()

    # Create a transaction information object and send to DB
    trans_info = Transaction_Information(
        transaction_id=batch_id,
        transaction_date=batch_date,
        transaction_source=request.form.get("inpSource")
    )

    # Commit this to the DB and get the unique key assigned it
    db.session.add(trans_info)
    db.session.commit()
    info_key = trans_info.transaction_info_id

    # now, for each entry construct a DB item and insert it (Along with the info key)
    for i in range(num_entries):

        # Start with an invalid item sku
        item_sku = -1

        # Try to get the item by this name from the DB
        item = current_user.items.filter_by(name=request.form.get("inpName")).first()

        # Create a list of all skus known to this item
        skus = list(map(lambda itm: itm.sku, current_user.items.all()))

        # Finalize sku
        if item is None:
            # If an item doesn't exist with this name, create one:

            if len(skus) > 0:
                # If we already have a series generate next sku
                item_sku = max(skus) + 1
            else:
                # Otherwise, if we have no skus use the default
                from . import DEFAULT_ITEM_SKU
                item_sku = DEFAULT_ITEM_SKU

            # And insert it into the DB
            new_db_item = Item(
                # id is auto-generated
                sku=item_sku,
                name=request.form.get("inpName"),
                link=request.form.get("inpLink"),
                user_id=current_user.id)
            db.session.add(new_db_item)

        else:
            # Otherwise, get the item sku
            item_sku = item.sku

        # Now generate a new transaction with the item sku
        new_transaction = Transaction(
            # transaction_id is assigned automatically
            transaction_info=info_key,
            transaction_batch=batch_id,
            quantity=request.form.get("inpQuantity"),
            cost=request.form.get("inpCost"),
            user_id=current_user.id,
            item_id=item
        )

        # Check if we have a sku
        next_sku = 0
        for item in current_user.items.all():
            next_sku = max(next_sku, item.sku)

        new_item = Item(
            sku=next_sku + 1,
            name=request.form.get(f"name_{i}"),
            quantity=request.form.get(f"quantity_{i}"),
            cost=request.form.get(f"cost_{i}"),
            link=request.form.get(f"link_{i}"),
            source=request.form.get(f"source_{i}"),
            user_id=current_user.id
        )

        db.session.add(new_item)
    db.session.commit()

    return redirect(url_for('views.view_inventory'))


def _add_inventory_GET():
    # Datamaps
    item_skus = {}
    item_qty = {}

    # If this is the first transaction, use 10000, otherwise get the max+1
    next_transaction_batch = 10000
    if len(current_user.transactions.all()) > 0:
        next_transaction_batch = \
            max(map(lambda transaction: transaction.transaction_batch, current_user.transactions.all())) + 1

    # Construct a hashset showing the sku's this user is using
    for item in current_user.items.all():
        item_skus[item.name] = item.sku
        item_qty[item.sku] = item.quantity

    # Return the rendered HTML template
    return render_template("add_transaction.html", user=current_user, next_transaction_batch=next_transaction_batch,
                           item_skus=item_skus, item_qty=item_qty)
