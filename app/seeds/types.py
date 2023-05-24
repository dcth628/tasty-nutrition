from app.models import db, Type, environment, SCHEMA
from sqlalchemy.sql import text

type_1 = Type(
    type='Air Fryer'
)

type_2 = Type(
    type='Keto'
)

type_3 = Type(
    type='Slow cooker'
)

type_4 = Type(
    type='Vegan'
)

type_5 = Type(
    type='High Protein'
)

type_6 = Type(
    type='Gluten Free'
)

type_7 = Type(
    type='Low Carb'
)

type_8 = Type(
    type='Dessert'
)

type_9 = Type(
    type='Dairy Free'
)

type_10 = Type(
    type='Instant Pot'
)

type_11 = Type(
    type='Vegetarian'
)

type_12 = Type(
    type='Quick Recipe'
)

def seed_types():
    db.session.add(type_1)
    db.session.add(type_2)
    db.session.add(type_3)
    db.session.add(type_4)
    db.session.add(type_5)
    db.session.add(type_6)
    db.session.add(type_7)
    db.session.add(type_8)
    db.session.add(type_9)
    db.session.add(type_10)
    db.session.add(type_11)
    db.session.add(type_12)
    db.session.commit()

def undo_types():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.types RESTART IDENTITY CASCADE;")
    else:
        db.session.delete(type_1)
        db.session.delete(type_2)
        db.session.delete(type_3)
        db.session.delete(type_4)
        db.session.delete(type_5)
        db.session.delete(type_6)
        db.session.delete(type_7)
        db.session.delete(type_8)
        db.session.delete(type_9)
        db.session.delete(type_10)
        db.session.delete(type_11)
        db.session.delete(type_12)
        db.session.execute(text("DELETE FROM types"))

    db.session.commit()
