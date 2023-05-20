from .db import db, environment, SCHEMA, add_prefix_for_prod

class Type(db.Model):
    __tablename__ = 'types'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    type = db.Column(db.String, nullable=False)
    recipe_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('recipe.id')), nullable=False)

    recipes = db.relationship('Recipe', back_populates='types')

    def to_dict(self):
        return {
            "id": self.id,
            "type": self.type,
            "recipes": [recipe.id for recipe in self.recipes] if self.recipes else []
        }
