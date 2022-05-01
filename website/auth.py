from flask import Blueprint, render_template

# Our auth blueprint defines pages
auth = Blueprint('auth', __name__)

@auth.route('/login')
def login():
    return render_template("sign_in.html", text="Testing")

@auth.route('/logout')
def logout():
    return "<p>logout</p>"

@auth.route('/signup')
def sign_up():
    return render_template("sign_up.html")


