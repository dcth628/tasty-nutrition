from flask.cli import AppGroup
from .users import seed_users, undo_users
from.ingredients import seed_ingredients, undo_ingredients
from .recipes import seed_recipes, undo_recipes
from .types import seed_types, undo_types
from .recipes_types import seed_recipe_types, undo_recipe_types
from .ingredients_recipes import seed_ingredient_recipes, undo_ingredient_recipes
from .images import seed_images, undo_images
from .cookbooks import seed_cookbooks, undo_cookbooks
from .reviews import seed_review, undo_review
from .recipe_cookbook import seed_recipe_cookbooks, undo_recipe_cookbooks
from app.models.db import db, environment, SCHEMA

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    if environment == 'production':
        # Before seeding in production, you want to run the seed undo
        # command, which will  truncate all tables prefixed with
        # the schema name (see comment in users.py undo_users function).
        # Make sure to add all your other model's undo functions below
        undo_users()
        undo_ingredients()
        undo_recipes()
        undo_types()
        undo_recipe_types()
        undo_ingredient_recipes()
        undo_images()
        undo_cookbooks()
        undo_review()
        undo_recipe_cookbooks()
    seed_users()
    seed_ingredients()
    seed_recipes()
    seed_types()
    seed_recipe_types()
    seed_ingredient_recipes()
    seed_images()
    seed_cookbooks()
    seed_review()
    seed_recipe_cookbooks()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users()
    undo_ingredients()
    undo_recipes()
    undo_types
    undo_recipe_types()
    undo_ingredient_recipes()
    undo_images()
    undo_cookbooks()
    undo_review()
    undo_recipe_cookbooks()
    # Add other undo functions here
