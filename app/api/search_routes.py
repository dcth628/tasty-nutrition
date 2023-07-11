from flask import Blueprint, request
from app.models import db, Recipe, Cookbook, Ingredient
from app.forms.search_form import SearchForm

search_routes = Blueprint('search', __name__)

# Search
@search_routes.route('/', methods=['POST'])
def search():
    form = SearchForm()
    searched = form.data['searched']
    recipes = Recipe.query.filter(Recipe.name.like(f'%{searched}%')).all()
    cookbooks = Cookbook.query.filter(Cookbook.name.like(f'%{searched}%')).all()
    ingredients = Ingredient.query.filter(Ingredient.name.like(f'%{searched}%')).all()
    return {'recipes':[recipe.to_dict() for recipe in recipes] if recipes else [],
            'cookbooks': [cookbook.to_dict() for cookbook in cookbooks] if cookbooks else [],
            'ingredients': [ingredient.to_dict() for ingredient in ingredients] if ingredients else []
            }
