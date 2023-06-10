from .db import db, environment, SCHEMA, add_prefix_for_prod

class RecipeCookbook(db.Model):
    __tablename__ = 'recipe_cookbook'

    if environment == 'production':
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    cookbook_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('cookbooks.id')), nullable=False)
    recipe_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('recipes.id')), nullable=False)

    cookbooks = db.relationship('Cookbook', back_populates='recipe_cookbook')

    recipes = db.relationship('Recipe', back_populates='recipe_cookbook', )

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.cookbooks.name,
            'cookbook_id': self.cookbooks.id
        }

    def to_recipe(self):
        return {
            "id": self.recipes.id,
            "name": self.recipes.name,
            "description": self.recipes.description,
            "serving": self.recipes.serving,
            "cooktime": self.recipes.cooktime,
            "username": self.recipes.owner.username,
            "images": [image.to_dict() for image in self.recipes.images] if self.recipes.images else [],
            "types": [type.to_dict() for type in self.recipes.recipe_type] if self.recipes.recipe_type else [],
        }
