from flask import Blueprint, request, jsonify
from flask_login import login_required
from app.models import db, Ingredient
from app.forms.ingredient_form import CreateIngredientForm

ingredients_routes = Blueprint('ingredients', __name__)

# Get all ingredients
@ingredients_routes.route('')
def all_ingredients():
    ingredients = Ingredient.query.all()
    return {ingredient.id: ingredient.to_dict() for ingredient in ingredients}

# Get details of an ingredient by the id
@ingredients_routes.route('/<int:id>')
def ingred_detail(id):
    ingredient = Ingredient.query.filter(Ingredient.id == id).first()
    if ingredient:
        return ingredient.to_dict()
    return jsonify({"error": "can't find ingredient"}),404

# Create an Ingredient
@ingredients_routes.route('', methods=['POST'])
def create_ingred():
    """
    create an ingredient
    """
    form = CreateIngredientForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        new_ingredient = Ingredient(
            name = form.data['name'],
            img = form.data['img'],
            type = form.data['type'],
            measurement = form.data['measurement'],
            calorie = form.data['calorie'],
            carb = form.data['carb'],
            protein = form.data['protein'],
            fat = form.data['fat'],
        )
        db.session.add(new_ingredient)
        db.session.commit()
        return new_ingredient.to_dict()
    return {"error" : "Error form did not validate"}


# Update an ingredient
@ingredients_routes.route('/<int:id>/', methods=['PUT'])
def edit_ingred(id):
    """
    edit an ingredient
    """
    form = CreateIngredientForm()
    ingredient = Ingredient.query.get(id)
    if not ingred_detail:
        return jsonify({"error": "Ingredient not found"}), 404

    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        name = form.data['name']
        img = form.data['img']
        type = form.data['type']
        measurement = form.data['measurement']
        calorie = form.data['calorie']
        carb = form.data['carb']
        protein = form.data['protein']
        fat = form.data['fat']

        ingredient.name = name
        ingredient.img = img
        ingredient.type = type
        ingredient.measurement = measurement
        ingredient.calorie = calorie
        ingredient.carb = carb
        ingredient.protein = protein
        ingredient.fat = fat

        db.session.commit()
        return ingredient.to_dict()
    return {"error" : "Error form did not validate"}

#Delete an ingredient
@ingredients_routes.route('/<int:id>', methods=['DELETE'])
def delete_ingred(id):
    ingredient = Ingredient.query.get(id)
    if ingredient:
        db.session.delete(ingredient)
        db.session.commit()
        return ingredient.to_dict()
    return jsonify({"error":"Ingredient not found"}), 404
