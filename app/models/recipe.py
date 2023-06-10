from .db import db, environment, SCHEMA, add_prefix_for_prod
from .recipe_type import RecipeType
from .recipe_cookbook import RecipeCookbook

class Recipe(db.Model):
    __tablename__ = 'recipes'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    description = db.Column(db.String, nullable=False)
    instruction = db.Column(db.String, nullable=False)
    serving = db.Column(db.Integer, nullable=False)
    cooktime = db.Column(db.Integer, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)

    owner = db.relationship('User', back_populates='recipes')

    recipe_cookbook = db.relationship('RecipeCookbook', back_populates='recipes', cascade="all, delete-orphan")

    ingredient_recipe = db.relationship('IngredientRecipe', back_populates='recipes', cascade="all, delete-orphan")

    reviews = db.relationship('Review', back_populates='recipes', cascade="all, delete-orphan")

    recipe_type = db.relationship('RecipeType', back_populates='recipes', cascade="all, delete-orphan")

    images = db.relationship('Image', back_populates='recipes', cascade="all, delete-orphan")

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "types": [type.to_dict() for type in self.recipe_type] if self.recipe_type else [],
            "description": self.description,
            "instruction": self.instruction,
            "serving": self.serving,
            "cooktime": self.cooktime,
            "user_id": self.owner.id,
            "username": self.owner.username,
            "ingredients": [ingred.to_dict() for ingred in self.ingredient_recipe] if self.ingredient_recipe else [],
            "images": [image.to_dict() for image in self.images] if self.images else [],
            "cookbook": [cookbook.to_dict() for cookbook in self.recipe_cookbook] if self.recipe_cookbook else [],
            "reviews": [review.to_dict() for review in self.reviews] if self.reviews else [],
        }

    def ing_to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "types": [type.to_dict() for type in self.recipe_type] if self.recipe_type else [],
            "description": self.description,
            "instruction": self.instruction,
            "serving": self.serving,
            "cooktime": self.cooktime,
            "ingredients": [ingred.to_dict() for ingred in self.ingredient_recipe] if self.ingredient_recipe else []
        }
