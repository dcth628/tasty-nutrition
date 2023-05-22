from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from app.models import db, Recipe, Type, Image, Like, Ingredient, IngredientRecipe
from app.forms.recipe_form import CreateRecipeForm

recipes_routes = Blueprint('recipes', __name__)

#Get all recipes
@recipes_routes.route('')
def all_recipes():
    recipes = Recipe.query.all()
    return {recipe.id : recipe.to_dict() for recipe in recipes}

#Get all recipes for the current user
@recipes_routes.route('/current')
@login_required
def user_recipes():
    """
    Queries for all recipes for the user and return in a list
    """
    user_id = current_user.get_id()
    recipes = Recipe.query.filter_by(user_id == user_id)
    return {recipe.id: recipe.to_dict() for recipe in recipes}

#Get details of a recipe by the id
@recipes_routes.route('/<int:id>')
def recipe_detail(id):
    recipe = Recipe.query.filter(Recipe.id == id).first()
    if recipe:
        return recipe.to_dict()
    return {"error": "Recipe can not find"}

#Create a recipe
@recipes_routes.route('', methods=['POST'])
@login_required
def create_recipe():
    form = CreateRecipeForm()
    user_id = current_user.get_id()

    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        new_recipe = Recipe(
            name = form.data['name'],
            description = form.data['description'],
            instruction = form.data['instruction'],
            serving = form.data['serving'],
            cooktime = form.data['cooktime'],
        )
        db.session.add(new_recipe)
        db.session.commit()
        return new_recipe.to_dict()

#Edit a recipe
@recipes_routes.route('/<int:id>/', methods=['PUT'])
@login_required
def edit_recipe(id):
    form = CreateRecipeForm()
    recipe = Recipe.query.get_or_404(id)

    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        name = form.data['name']
        description = form.data['description']
        instruction = form.data['instruction']
        serving = form.data['serving']
        cooktime = form.data['cooktime']

        recipe.name = name
        recipe.description = description
        recipe.instruction = instruction
        recipe.serving = serving
        recipe.cooktime = cooktime

        db.session.commit()
        return recipe.to_dict()


#Delete a recipe
@recipes_routes.route('/<int:id>/', methods=['DELETE'])
@login_required
def delete_recipe(id):
    recipe = Recipe.query.get(id)
    db.session.delete(recipe)
    db.session.commit()

    return recipe.to_dict()


#Add an ingredient to a recipe
@recipes_routes.route('/<int:recipe_id>/ingredients/<int:ingredient_id>', methods=['POST'])
def ingred_add_recipe(recipe_id, ingredient_id):
    recipe = Recipe.query.get(recipe_id)
    ingredient = Ingredient.query.get(ingredient_id)

    if not recipe or not ingredient:
        return jsonify({'error': 'Recipe or ingredient not found'}), 404

    recipe_ingred = IngredientRecipe.query.filter_by(
        recipe_id=recipe_id, ingredient_id=ingredient_id
    ).first()

    if recipe_ingred:
        return jsonify({"error": "Ingredient was already added"})

    new_ingredient = IngredientRecipe(
        recipe_id = recipe_id,
        ingredient_id = ingredient_id
    )

    # recipe.ingredient_recipe.append(new_ingredient)
    db.session.add(new_ingredient)
    db.session.commit()
    return recipe.to_dict()
