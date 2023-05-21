from app.models import db, Ingredient, environment, SCHEMA
from sqlalchemy.sql import text

ingredient_1 = Ingredient(
    name='Strawberry',
    img='https://res.cloudinary.com/ddxewbhmy/image/upload/v1684693252/images_ufi8ru.jpg',
    type='fruit',
    measurement=100,
    calorie=32,
    carb=7.7,
    protein=0.7,
    fat=0.3
)

ingredient_2 = Ingredient(
    name='Beef shank',
    img='https://res.cloudinary.com/ddxewbhmy/image/upload/v1684693323/download_njwiga.jpg',
    type='protein',
    measurement=100,
    calorie=201,
    carb=0,
    protein=34,
    fat=6
)

ingredient_3 = Ingredient(
    name='Spinach',
    img='https://res.cloudinary.com/ddxewbhmy/image/upload/v1684693454/download_1_b0uniz.jpg',
    type='vegetable',
    measurement=100,
    calorie=23,
    carb=3.6,
    protein=2.9,
    fat=0.4
)

ingredient_4 = Ingredient(
    name='Oatmeal',
    img='https://res.cloudinary.com/ddxewbhmy/image/upload/v1684693642/images_1_w940vd.jpg',
    type='grains',
    measurement=100,
    calorie=68,
    carb=12,
    protein=2.4,
    fat=1.4
)

ingredient_5 = Ingredient(
    name='Gouda Cheese',
    img='https://res.cloudinary.com/ddxewbhmy/image/upload/v1684693765/images_2_qnisuu.jpg',
    type='dairy',
    measurement=100,
    calorie=365,
    carb=2.2,
    protein=25,
    fat=27
)

def seed_ingredients():
    db.session.add(ingredient_1)
    db.session.add(ingredient_2)
    db.session.add(ingredient_3)
    db.session.add(ingredient_4)
    db.session.add(ingredient_5)
    db.session.commit()


def undo_ingredients():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.ingredients RESTART IDENTITY CASCADE;")
    else:
        db.session.delete(ingredient_1)
        db.session.delete(ingredient_2)
        db.session.delete(ingredient_3)
        db.session.delete(ingredient_4)
        db.session.delete(ingredient_5)
        db.session.execute(text("DELETE FROM ingredients"))

    db.session.commit()
