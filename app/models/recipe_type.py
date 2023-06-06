from .db import db, environment, SCHEMA, add_prefix_for_prod

class RecipeType(db.Model):
    __tablename__ = 'recipe_types'

    if environment == 'production':
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    recipe_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('recipes.id')), nullable=False)
    type_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('types.id')), nullable=False)

    recipes = db.relationship('Recipe', back_populates='recipe_type')

    types = db.relationship('Type', back_populates='recipe_type')

    def to_dict(self):
        return {
            "id": self.id,
            "type_id": self.types.id,
            "types": self.types.type,
            "img":self.types.img
        }
