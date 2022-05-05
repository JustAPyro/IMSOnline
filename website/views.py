from flask import Blueprint, render_template, request
from flask_login import login_required, current_user

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
        return _add_inventory_POST()
    if request.method == 'GET':
        return _add_inventory_GET()


def _add_inventory_POST():
    print("Posted")


def _add_inventory_GET():
    print("Getted")
    return render_template("add_inventory.html", user=current_user)
