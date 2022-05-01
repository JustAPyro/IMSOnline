from flask import Blueprint

# Our auth blueprint defines pages
auth = Blueprint('auth', __name__)

@auth.route('/login')
def login():
    return "<p>Login</p>"

@auth.route('/logout')
def logout():
    return "<p>logout</p>"

@auth.route('/signup')
def sign_up():
    return "<p>Sign Up</p>"


