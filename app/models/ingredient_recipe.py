from .db import db, environment, SCHEMA, add_prefix_for_prod

class IngredientRecipe(db.Model):
    __tablename__ = 'ingredient_recipe'

    if environment == 'production':
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    ingredient_id= db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('ingredients.id')), nullable=False)
    recipe_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('recipes.id')), nullable=False)

    ingredients = db.relationship('Ingredient', back_populates='recipe_ingredient')

    recipes = db.relationship('Recipe', back_populates='ingredient_recipe')

    def to_dict(self):
        return {
            "id": self.id,
            "ingredient_id": self.ingredients.id,
            "ingredient_name": self.ingredients.name,
            "ingredient_type": self.ingredients.type,
            "ingredient_measurement": self.ingredients.measurement,
            "ingredient_calorie": self.ingredients.calorie,
            "ingredient_carb": self.ingredients.carb,
            "ingredient_protein": self.ingredients.protein,
            "ingredient_fat": self.ingredients.fat,
        }
