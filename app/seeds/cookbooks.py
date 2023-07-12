from app.models import db, Cookbook, SCHEMA, environment
from sqlalchemy.sql import text

cookbook_1 = Cookbook(
    name = 'Snack Ideas',
    user_id = 1
)

cookbook_2 = Cookbook(
    name = 'Dinner Party',
    user_id = 1
)

cookbook_3 = Cookbook(
    name = 'Salad',
    user_id = 2
)

cookbook_4 = Cookbook(
    name = 'Quick Meal',
    user_id = 3
)

cookbook_5 = Cookbook(
    name = 'July 4th BBQ',
    user_id = 1
)

cookbook_5 = Cookbook(
    name = 'Bulking Season',
    user_id = 2
)

cookbook_6 = Cookbook(
    name = 'Breakfast',
    user_id = 3
)

cookbook_7 = Cookbook(
    name = 'Desserts',
    user_id = 1
)

def seed_cookbooks():
    db.session.add(cookbook_1)
    db.session.add(cookbook_2)
    db.session.add(cookbook_3)
    db.session.add(cookbook_4)
    db.session.add(cookbook_5)
    db.session.add(cookbook_6)
    db.session.add(cookbook_7)
    db.session.commit()

def undo_cookbooks():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.cookbooks RESTART IDENTITY CASCADE;")
    else:
        db.session.delete(cookbook_1)
        db.session.delete(cookbook_2)
        db.session.delete(cookbook_3)
        db.session.delete(cookbook_4)
        db.session.delete(cookbook_5)
        db.session.delete(cookbook_6)
        db.session.delete(cookbook_7)
        db.session.execute(text("DELETE FROM coobooks"))

    db.session.commit()
