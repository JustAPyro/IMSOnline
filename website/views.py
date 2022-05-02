from flask import Blueprint, render_template
from flask_login import login_required, current_user

# Our blueprint is called views
views = Blueprint('views', __name__)


@views.route('/')
@login_required
def home():
    return render_template("home.html", user=current_user)

@views.route('/add_inventory')
@login_required
def add_inventory():
    print("Tested add inv")
    return render_template("add_inventory.html", user=current_user)