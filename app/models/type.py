from .db import db, environment, SCHEMA, add_prefix_for_prod
from .recipe_type import RecipeType

class Type(db.Model):
    __tablename__ = 'types'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    type = db.Column(db.String, nullable=False)

    recipe_type = db.relationship('RecipeType', back_populates='types', cascade="all, delete-orphan")

    def to_dict(self):
        return {
            "id": self.id,
            "type": self.type,
        }
