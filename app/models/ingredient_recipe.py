from .db import db, environment, SCHEMA, add_prefix_for_prod

class IngredientRecipe(db.Model):
    __tablename__ = 'ingredient_recipe'

    if environment == 'production':
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    ingredient_id= db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('ingredient.id')), nullable=False)
    recipe_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('recipe.id')), nullable=False)

    ingredients = db.relationship('Ingredient', back_populates='recipe_ingredient')

    recipes = db.relationship('Recipe', back_populates='ingredient_recipe')
