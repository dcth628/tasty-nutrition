from app.models import db, Type, environment, SCHEMA
from sqlalchemy.sql import text

type_1 = Type(
    type='Air Fryer',
    img='https://res.cloudinary.com/ddxewbhmy/image/upload/v1689015417/airfryer_ybihlz.png'
)

type_2 = Type(
    type='Keto',
    img='https://res.cloudinary.com/ddxewbhmy/image/upload/v1689015418/keto_mgvkin.png'
)

type_3 = Type(
    type='Slow Cooker',
    img='https://res.cloudinary.com/ddxewbhmy/image/upload/v1689015417/slowcooker_khnohj.png'
)

type_4 = Type(
    type='Vegan',
    img='https://res.cloudinary.com/ddxewbhmy/image/upload/v1689015417/vegan_nxf9kw.png'
)

type_5 = Type(
    type='High Protein',
    img='https://res.cloudinary.com/ddxewbhmy/image/upload/v1689015417/highprotein_kebkyq.png'
)

type_6 = Type(
    type='Gluten Free',
    img='https://res.cloudinary.com/ddxewbhmy/image/upload/v1689015417/glutenfree_qpswz5.png'
)

type_7 = Type(
    type='Low Carb',
    img='https://res.cloudinary.com/ddxewbhmy/image/upload/v1689015417/lowcarb_ozewim.png'
)

type_8 = Type(
    type='Dessert',
    img='https://res.cloudinary.com/ddxewbhmy/image/upload/v1689015418/dessert_u2erdt.png'
)

type_9 = Type(
    type='Dairy Free',
    img='https://res.cloudinary.com/ddxewbhmy/image/upload/v1689015418/DairyFree_ap3qqd.png'
)

type_10 = Type(
    type='Instant Pot',
    img='https://res.cloudinary.com/ddxewbhmy/image/upload/v1689015418/instantpot_tigwsp.png'
)

type_11 = Type(
    type='Vegetarian',
    img='https://res.cloudinary.com/ddxewbhmy/image/upload/v1689015418/vegetarian_ux5lyx.png'
)

type_12 = Type(
    type='Quick Recipe',
    img='https://res.cloudinary.com/ddxewbhmy/image/upload/v1689015418/quick_azeas4.png'
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
