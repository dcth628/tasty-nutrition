from .db import db, environment, SCHEMA, add_prefix_for_prod

class Cookbook(db.Model):
    __tablename__ = 'cookbooks'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)

    owner = db.relationship('User', back_populates='cookbooks')

    recipes = db.relationship('Recipe', back_populates='cookbooks', cascade="all, delete-orphan")

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "user_id": self.user_id,
        }
