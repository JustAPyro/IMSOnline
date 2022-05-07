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


class Transaction(db.Model):
    """
    Represents a unique transaction/purchase from a specific
    time/location/series of items.
    """
    # Unique transaction ID for keying purposes
    transaction_id = db.Column(db.Integer, primary_key=True)

    # If multiple items are bought in the same transaction, _batch will match
    transaction_batch = db.Column(db.Integer)

    # The date the transaction was made
    transaction_date = db.Column(db.Date)

    # The source of the transaction
    transaction_source = db.Column(db.String(100))

    # Number of items purchased
    quantity = db.Column(db.Integer)

    # Total cost of these items
    total_cost = db.Column(db.Integer)

    # The user that made the transaction, linked with unique key
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))

    # The item that was involved in the transaction, linked with unique key
    item_id = db.Column(db.Integer, db.ForeignKey('item.id'))


class User(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(150), unique=True)  # Max email length is 150
    password = db.Column(db.String(150))
    first_name = db.Column(db.String(150))
    items = db.relationship('Item', lazy="dynamic")
    transactions = db.relationship('Transaction', lazy="dynamic")
