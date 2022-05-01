from flask import Blueprint, render_template

# Our blueprint is called views
views = Blueprint('views', __name__)


@views.route('/')
def home():
    """
    Function will run anytime we go to the route location
    :return:
    """
    return render_template("home.html")
