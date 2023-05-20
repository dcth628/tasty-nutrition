from .db import db, environment, SCHEMA, add_prefix_for_prod
from .type import Type

class Recipe(db.Model):
    __tablename__ = 'recipes'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    type = db.Column(db.String, nullable=False)
    description = db.Column(db.String, nullable=False)
    instruction = db.Column(db.String, nullable=False)
    serving = db.Column(db.Integer, nullable=False)
    cooktime = db.Column(db.Integer, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)

    owner = db.relationship('User', back_populates='recipes')

    ingredient_recipe = db.relationship('IngredientRecipe', back_populates='recipes', cascade="all, delete-orphan")

    cookbooks = db.relationship('Cookbook', back_populates='recipes', cascade="all, delete-orphan")

    reviews = db.relationship('Review', back_populates='recipes', cascade="all, delete-orphan")

    types = db.relationship('Type', back_populates='recipes', cascade="all, delete-orphan")

    images = db.relationship('Image', lazy=True, primaryjoin='and_(Image.imageable_type=="recipe", foreign(Image.imageable_id)==Recipe.id)', back_populates='recipes', cascade="all, delete-orphan")

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "type": [type.to_dict() for type in self.types] if self.types else [],
            "description": self.description,
            "instruction": self.instruction,
            "serving": self.serving,
            "cooktime": self.cooktime
        }

    def ing_to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "type": [type.to_dict() for type in self.types] if self.types else [],
            "description": self.description,
            "instruction": self.instruction,
            "serving": self.serving,
            "cooktime": self.cooktime,
            "ingredients": [ingred.to_dict() for ingred in self.ingredient_recipe] if self.ingredient_recipe else []
        }
