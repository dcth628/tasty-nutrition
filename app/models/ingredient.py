from .db import db, environment, SCHEMA, add_prefix_for_prod

class Ingredient(db.Model):
    __tablename__ = 'ingredients'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    img = db.Column(db.String)
    name = db.Column(db.String, nullable=False)
    type = db.Column(db.String, nullable=False)
    measurement = db.Column(db.Integer, nullable=False)
    calorie = db.Column(db.Numeric(6,1), nullable=False)
    carb = db.Column(db.Numeric(6,1), nullable=False)
    protein = db.Column(db.Numeric(6,1), nullable=False)
    fat = db.Column(db.Numeric(6,1), nullable=False)

    recipe_ingredient = db.relationship('IngredientRecipe', back_populates='ingredients', cascade="all, delete-orphan")

    def to_dict(self):
        return {
            "id": self.id,
            "img" : self.img,
            "name": self.name,
            "type": self.type,
            "measurement": self.measurement,
            "calorie": self.calorie,
            "carb": self.carb,
            "protein": self.protein,
            "fat": self.fat
        }
