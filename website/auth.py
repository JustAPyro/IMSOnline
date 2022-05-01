from flask import Blueprint, render_template, request, flash

# Our auth blueprint defines pages
auth = Blueprint('auth', __name__)

# The log-in route can accept get(load) methods and post(update) requests
@auth.route('/login', methods=['GET', 'POST'])
def login():
    data = request.form
    print(data)
    return render_template("sign_in.html")

@auth.route('/logout')
def logout():
    return "<p>logout</p>"

@auth.route('/signup', methods=['GET', 'POST'])
def sign_up():
    if request.method == 'POST':
        email = request.form.get('email')
        first_name = request.form.get('first_name')
        password1 = request.form.get('password_first')
        password2 = request.form.get('password_second')

        if len(email) < 4:
            flash('E-mail must be greater than 3 characters.', category='error')
        elif len(first_name) < 2:
            flash('First name must be greater than 1 character.', category='error')
        elif password1 != password2:
            flash('Passwords don\'t match.', category='error')
        elif len(password1) < 7:
            flash('Password must be at least 7 characters', category='error')
        else:
            flash('Account created!', category='success')

    return render_template("sign_up.html")


