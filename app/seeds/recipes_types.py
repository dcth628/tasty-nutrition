from app.models.recipe_type import db, RecipeType, SCHEMA, environment
from sqlalchemy.sql import text

recipe_type_1 = RecipeType(
    recipe_id = 1,
    type_id = 5
)

recipe_type_2 = RecipeType(
    recipe_id = 1,
    type_id = 2
)

recipe_type_3 = RecipeType(
    recipe_id = 1,
    type_id = 9
)

recipe_type_4 = RecipeType(
    recipe_id = 2,
    type_id = 4
)

recipe_type_5 = RecipeType(
    recipe_id = 2,
    type_id = 8
)

recipe_type_6 = RecipeType(
    recipe_id = 2,
    type_id = 9
)

recipe_type_7 = RecipeType(
    recipe_id = 3,
    type_id = 4
)

recipe_type_8 = RecipeType(
    recipe_id = 3,
    type_id = 6
)

recipe_type_9 = RecipeType(
    recipe_id = 3,
    type_id = 9
)

recipe_type_10 = RecipeType(
    recipe_id = 3,
    type_id = 11
)

recipe_type_11 = RecipeType(
    recipe_id = 3,
    type_id = 12
)

recipe_type_12 = RecipeType(
    recipe_id = 4,
    type_id = 4
)

recipe_type_13 = RecipeType(
    recipe_id = 4,
    type_id = 12
)

recipe_type_14 = RecipeType(
    recipe_id = 5,
    type_id = 1
)

recipe_type_15 = RecipeType(
    recipe_id = 5,
    type_id = 2
)

recipe_type_16 = RecipeType(
    recipe_id = 5,
    type_id = 7
)

recipe_type_17 = RecipeType(
    recipe_id = 5,
    type_id = 11
)

recipe_type_18 = RecipeType(
    recipe_id = 5,
    type_id = 12
)

def seed_recipe_types():
    db.session.add(recipe_type_1)
    db.session.add(recipe_type_2)
    db.session.add(recipe_type_3)
    db.session.add(recipe_type_4)
    db.session.add(recipe_type_5)
    db.session.add(recipe_type_6)
    db.session.add(recipe_type_7)
    db.session.add(recipe_type_8)
    db.session.add(recipe_type_9)
    db.session.add(recipe_type_10)
    db.session.add(recipe_type_11)
    db.session.add(recipe_type_12)
    db.session.add(recipe_type_13)
    db.session.add(recipe_type_14)
    db.session.add(recipe_type_15)
    db.session.add(recipe_type_16)
    db.session.add(recipe_type_17)
    db.session.add(recipe_type_18)
    db.session.commit()


def undo_recipe_types():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.recipe types RESTART IDENTITY CASCADE;")
    else:
        db.session.delete(recipe_type_1)
        db.session.delete(recipe_type_2)
        db.session.delete(recipe_type_3)
        db.session.delete(recipe_type_4)
        db.session.delete(recipe_type_5)
        db.session.delete(recipe_type_6)
        db.session.delete(recipe_type_7)
        db.session.delete(recipe_type_8)
        db.session.delete(recipe_type_9)
        db.session.delete(recipe_type_10)
        db.session.delete(recipe_type_11)
        db.session.delete(recipe_type_12)
        db.session.delete(recipe_type_13)
        db.session.delete(recipe_type_14)
        db.session.delete(recipe_type_15)
        db.session.delete(recipe_type_16)
        db.session.delete(recipe_type_17)
        db.session.delete(recipe_type_18)
        db.session.execute(text("DELETE FROM recipe types"))

    db.session.commit()
