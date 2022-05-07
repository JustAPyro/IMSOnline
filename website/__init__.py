from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager
from os import path

db = SQLAlchemy()
DB_NAME = 'database.db'


def create_app():
    app = Flask(__name__)
    app.config['SECRET_KEY'] = 'secretkey'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config['SQLALCHEMY_DATABASE_URI'] = f'sqlite:///{DB_NAME}'

    # Setup database
    db.init_app(app)

    # import our URL views
    from .views import views
    from .auth import auth

    # Register them with the flask framework
    app.register_blueprint(views, url_prefix='/')
    app.register_blueprint(auth, url_prefix='/')

    # Make sure that the database tables are defined
    from .models import User, Transaction, Item

    # If the database hasn't been created, do that
    if not path.exists(f'website/{DB_NAME}'):
        db.create_all(app=app)
        print("Created new database!")
    db.create_all(app=app)

    # Set up the sign in manager
    login_manager = LoginManager()
    login_manager.login_view = 'auth.login'
    login_manager.init_app(app)

    # Describe how to find a user
    @login_manager.user_loader
    def load_user(id):
        return User.query.get(int(id))

    return app
