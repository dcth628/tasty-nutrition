from app.models import db, Type, environment, SCHEMA
from sqlalchemy.sql import text

type_1 = Type(
    type='Air Fryer',
    img='https://res.cloudinary.com/ddxewbhmy/image/upload/v1684993821/AF_rrcwyl.png'
)

type_2 = Type(
    type='Keto',
    img='https://res.cloudinary.com/ddxewbhmy/image/upload/v1684993822/K_dfszow.png'
)

type_3 = Type(
    type='Slow Cooker',
    img='https://res.cloudinary.com/ddxewbhmy/image/upload/v1684993822/SC_d3tghg.png'
)

type_4 = Type(
    type='Vegan',
    img='https://res.cloudinary.com/ddxewbhmy/image/upload/v1684993822/V_cqso0f.png'
)

type_5 = Type(
    type='High Protein',
    img='https://res.cloudinary.com/ddxewbhmy/image/upload/v1684993821/HP_t18d4j.png'
)

type_6 = Type(
    type='Gluten Free',
    img='https://res.cloudinary.com/ddxewbhmy/image/upload/v1684993821/GF_xxif9o.png'
)

type_7 = Type(
    type='Low Carb',
    img='https://res.cloudinary.com/ddxewbhmy/image/upload/v1684993822/LC_u6bqaj.png'
)

type_8 = Type(
    type='Dessert',
    img='https://res.cloudinary.com/ddxewbhmy/image/upload/v1684993821/D_cvnzz8.png'
)

type_9 = Type(
    type='Dairy Free',
    img='https://res.cloudinary.com/ddxewbhmy/image/upload/v1684993821/DF_zcgpw3.png'
)

type_10 = Type(
    type='Instant Pot',
    img='https://res.cloudinary.com/ddxewbhmy/image/upload/v1684993821/IP_qfqzkq.png'
)

type_11 = Type(
    type='Vegetarian',
    img='https://res.cloudinary.com/ddxewbhmy/image/upload/v1684993822/VG_h7my8y.png'
)

type_12 = Type(
    type='Quick Recipe',
    img='https://res.cloudinary.com/ddxewbhmy/image/upload/v1684993822/Q_lpkutv.png'
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
