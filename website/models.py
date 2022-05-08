from . import db
from flask_login import UserMixin
from sqlalchemy.sql import func


class Item(db.Model):
    item_id = db.Column(db.Integer, primary_key=True)
    sku = db.Column(db.Integer)
    name = db.Column(db.String(100))
    link = db.Column(db.String(100))
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    transactions = db.relationship("Transaction")


class Transaction_Information(db.Model):

    # The unique key for this transaction information
    transaction_info_id = db.Column(db.Integer, primary_key=True)

    # The date the transaction was made
    transaction_date = db.Column(db.Date)

    # The source of the transaction
    transaction_source = db.Column(db.String(100))

    # The transaction ID
    transaction_id = db.Column(db.Integer, db.ForeignKey('transaction.transaction_id'))


class Transaction(db.Model):
    """
    Represents a unique transaction/purchase from a specific
    time/location/series of items.
    """
    # Unique transaction ID for keying purposes
    transaction_id = db.Column(db.Integer, primary_key=True)

    # Information associated with this transaction (Links to date/source)
    transaction_info = db.relationship("Transaction_Information", lazy="dynamic")

    # If multiple items are bought in the same transaction, _batch will match
    transaction_batch = db.Column(db.Integer)

    # Number of items purchased
    quantity = db.Column(db.Integer)

    # Total cost of these items
    cost = db.Column(db.Integer)

    # The user that made the transaction, linked with unique key
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))

    # The item that was involved in the transaction, linked with unique key
    item_id = db.Column(db.Integer, db.ForeignKey('item.item_id'))


class User(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(150), unique=True)  # Max email length is 150
    password = db.Column(db.String(150))
    first_name = db.Column(db.String(150))
    items = db.relationship('Item', lazy="dynamic")
    transactions = db.relationship('Transaction', lazy="dynamic")
