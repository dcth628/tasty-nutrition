from app.models.ingredient_recipe import db, IngredientRecipe, SCHEMA, environment
from sqlalchemy.sql import text

ingredient_recipe_1 = IngredientRecipe(
    recipe_id= 1,
    ingredient_id = 2,
    quantity= 2
)

ingredient_recipe_2 = IngredientRecipe(
    recipe_id= 2,
    ingredient_id = 1,
    quantity= 3
)

ingredient_recipe_3 = IngredientRecipe(
    recipe_id= 3,
    ingredient_id = 3,
    quantity= 4
)

ingredient_recipe_4 = IngredientRecipe(
    recipe_id= 4,
    ingredient_id = 4,
    quantity= 5
)

ingredient_recipe_5 = IngredientRecipe(
    recipe_id= 5,
    ingredient_id = 5,
    quantity= 1
)

def seed_ingredient_recipes():
    db.session.add(ingredient_recipe_1)
    db.session.add(ingredient_recipe_2)
    db.session.add(ingredient_recipe_3)
    db.session.add(ingredient_recipe_4)
    db.session.add(ingredient_recipe_5)
    db.session.commit()

def undo_ingredient_recipes():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.ingredient recipes RESTART IDENTITY CASCADE;")
    else:
        db.session.delete(ingredient_recipe_1)
        db.session.delete(ingredient_recipe_2)
        db.session.delete(ingredient_recipe_3)
        db.session.delete(ingredient_recipe_4)
        db.session.delete(ingredient_recipe_5)
        db.session.execute(text("DELETE FROM ingredient recipes"))

    db.session.commit()
