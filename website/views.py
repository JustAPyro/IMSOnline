from flask import Blueprint, render_template, request
from flask_login import login_required, current_user
from .models import Item
from . import db

# Our blueprint is called views
views = Blueprint('views', __name__)


@views.route('/')
@login_required
def home():
    return render_template("home.html", user=current_user)


@views.route('/add_inventory', methods=['GET', 'POST'])
@login_required
def add_inventory():
    if request.method == 'POST':
        print(request.form)
        return _add_inventory_POST()
    if request.method == 'GET':
        return _add_inventory_GET()


def _add_inventory_POST():

    # Get the number of entries
    num_entries = int(request.form.get("entries"))

    # For each entry construct a DB item and insert it
    for i in range(num_entries):
        new_item = Item(
            sku=1,
            name=request.form.get(f"name_{i}"),
            quantity=request.form.get(f"quantity_{i}"),
            cost=request.form.get(f"cost_{i}"),
            link=request.form.get(f"link_{i}"),
            source=request.form.get(f"source_{i}"),
            user_id=current_user.id
        )
        db.session.add(new_item)
    db.session.commit()

    return render_template("add_inventory.html", user=current_user)


def _add_inventory_GET():
    print("Getted")
    return render_template("add_inventory.html", user=current_user)
