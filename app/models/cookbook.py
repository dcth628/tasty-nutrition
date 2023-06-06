from .db import db, environment, SCHEMA, add_prefix_for_prod
from .recipe_cookbook import RecipeCookbook

class Cookbook(db.Model):
    __tablename__ = 'cookbooks'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)

    owner = db.relationship('User', back_populates='cookbooks')

    recipe_cookbook = db.relationship('RecipeCookbook', back_populates='cookbooks', cascade="all, delete-orphan")

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "user_id" : self.user_id,
            "recipes": [recipe.to_recipe() for recipe in self.recipe_cookbook] if self.recipe_cookbook else [],

        }
