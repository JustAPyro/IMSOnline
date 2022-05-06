from flask import Blueprint, render_template, request, redirect, url_for
from flask_login import login_required, current_user
from sqlalchemy import func
from .models import Item
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

@views.route('/add_inventory', methods=['GET', 'POST'])
@login_required
def add_inventory():
    if request.method == 'POST':
        return _add_inventory_POST()
    if request.method == 'GET':
        return _add_inventory_GET()


def _add_inventory_POST():
    print("Posting info")

    # Get the number of entries
    num_entries = int(request.form.get("entries"))

    # For each entry construct a DB item and insert it
    for i in range(num_entries):

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

    # Construct a hashset showing the sku's this user is using
    for item in current_user.items.all():
        item_skus[item.name] = item.sku
        item_qty[item.sku] = item.quantity

    return render_template("add_inventory.html", user=current_user, item_skus=item_skus, item_qty=item_qty)
