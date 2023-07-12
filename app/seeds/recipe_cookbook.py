from app.models.recipe_cookbook import db, RecipeCookbook, SCHEMA, environment
from sqlalchemy.sql import text

recipe_cookbook_1 = RecipeCookbook(
    cookbook_id = 1,
    recipe_id = 5
)

recipe_cookbook_2 = RecipeCookbook(
    cookbook_id = 2,
    recipe_id = 1
)

recipe_cookbook_3 = RecipeCookbook(
    cookbook_id = 3,
    recipe_id = 3
)

recipe_cookbook_4 = RecipeCookbook(
    cookbook_id = 4,
    recipe_id = 4
)

recipe_cookbook_5 = RecipeCookbook(
    cookbook_id = 5,
    recipe_id = 1
)

recipe_cookbook_6 = RecipeCookbook(
    cookbook_id = 2,
    recipe_id = 5
)

recipe_cookbook_7 = RecipeCookbook(
    cookbook_id = 3,
    recipe_id = 5
)

recipe_cookbook_8 = RecipeCookbook(
    cookbook_id = 5,
    recipe_id = 5
)

recipe_cookbook_9 = RecipeCookbook(
    cookbook_id = 4,
    recipe_id = 3
)

def seed_recipe_cookbooks():
    db.session.add(recipe_cookbook_1)
    db.session.add(recipe_cookbook_2)
    db.session.add(recipe_cookbook_3)
    db.session.add(recipe_cookbook_4)
    db.session.add(recipe_cookbook_5)
    db.session.add(recipe_cookbook_6)
    db.session.add(recipe_cookbook_7)
    db.session.add(recipe_cookbook_8)
    db.session.add(recipe_cookbook_9)
    db.session.commit()


def undo_recipe_cookbooks():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.recipe_cookbook RESTART IDENTITY CASCADE;")
    else:
        db.session.delete(recipe_cookbook_2)
        db.session.delete(recipe_cookbook_1)
        db.session.delete(recipe_cookbook_3)
        db.session.delete(recipe_cookbook_4)
        db.session.delete(recipe_cookbook_5)
        db.session.delete(recipe_cookbook_6)
        db.session.delete(recipe_cookbook_7)
        db.session.delete(recipe_cookbook_8)
        db.session.delete(recipe_cookbook_9)
        db.session.execute(text("DELETE FROM recipe_cookbook"))

    db.session.commit()
