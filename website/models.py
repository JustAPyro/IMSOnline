from . import db
from flask_login import UserMixin
from sqlalchemy.sql import func


class Item(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    sku = db.Column(db.Integer)
    quantity = db.Column(db.Integer)
    name = db.Column(db.String(100))
    cost = db.Column(db.BigInteger)
    link = db.Column(db.String(100))
    source = db.Column(db.String(100))
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))


class Note(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    text = db.Column(db.String(10000))
    date = db.Column(db.DateTime(timezone=True), default=func.now())
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))


class User(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(150), unique=True)  # Max email length is 150
    password = db.Column(db.String(150))
    first_name = db.Column(db.String(150))
    notes = db.relationship('Note')
    items = db.relationship('Item')
