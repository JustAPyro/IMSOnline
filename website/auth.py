from flask import Blueprint, render_template, request, flash, redirect, url_for
from werkzeug.security import generate_password_hash, check_password_hash
from .models import User
from . import db
from flask_login import login_user, login_required, logout_user, current_user


# Our auth blueprint defines pages
auth = Blueprint('auth', __name__)

# The log-in route can accept get(load) methods and post(update) requests
@auth.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        email = request.form.get('email')
        password = request.form.get('password')

        user = User.query.filter_by(email=email).first()
        if user:
            if check_password_hash(user.password, password):
                flash("Logged in successfully", category='success')
                login_user(user, remember=True)
                return redirect(url_for('views.home'))
            else:
                flash("Invalid username or password", category='error')
        else:
            flash('Email does not exist. Please sign up.', category='error')

    return render_template("sign_in.html", user=current_user)

@auth.route('/logout')
@login_required
def logout():
    logout_user()
    return redirect(url_for('auth.login'))

@auth.route('/signup', methods=['GET', 'POST'])
def sign_up():
    if request.method == 'POST':
        email = request.form.get('email')
        first_name = request.form.get('first_name')
        password1 = request.form.get('password_first')
        password2 = request.form.get('password_second')

        user = User.query.filter_by(email=email).first()

        if user:
            flash('E-mail already exists.', category='error')
        elif len(email) < 4:
            flash('E-mail must be greater than 3 characters.', category='error')
        elif len(first_name) < 2:
            flash('First name must be greater than 1 character.', category='error')
        elif password1 != password2:
            flash('Passwords don\'t match.', category='error')
        elif len(password1) < 7:
            flash('Password must be at least 7 characters', category='error')
        else:
            # Create a new database user
            new_user = User(
                email=email,
                first_name=first_name,
                password=generate_password_hash(password1, method='sha256')
            )

            # Add the user to database
            db.session.add(new_user)
            db.session.commit()

            # Mark the user as logged in
            login_user(user, remember=True)

            # Flash that it was successful
            flash('Account created!', category='success')

            # Redirect them to the homepage
            return redirect(url_for('views.home'))

    return render_template("sign_up.html", user=current_user)





