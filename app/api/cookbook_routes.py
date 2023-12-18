from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from app.models import db, Cookbook, Recipe
from app.forms.cookbook_form import CreateCookbookForm

cookbooks_routes = Blueprint('cookbooks', __name__)

#Get all cookbooks
@cookbooks_routes.route('')
def all_cookbooks():
    cookbooks = Cookbook.query.all()
    return {cookbook.id: cookbook.to_dict() for cookbook in cookbooks}

#Get all cookbooks for the current user
@cookbooks_routes.route('/current')
def user_cookbooks():
    user_id = current_user.get_id()
    cookbooks = Cookbook.query.filter_by(user_id = user_id)
    return {cookbook.id: cookbook.to_dict() for cookbook in cookbooks}

#Get details of a cookbook by the id
@cookbooks_routes.route('/<int:id>')
def cookbook_detail(id):
    cookbook = Cookbook.query.filter(Cookbook.id == id).first()
    if cookbook:
        return cookbook.to_dict()
    return jsonify({"error": "Cookbook not found"}), 404

#Create a new cookbook
@cookbooks_routes.route('', methods=['POST'])
@login_required
def create_cookbook():
    form = CreateCookbookForm()
    user_id =current_user.get_id()

    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        new_cookbook = Cookbook(
            name = form.data['name'],
            user_id = user_id
        )
        db.session.add(new_cookbook)
        db.session.commit()
        return new_cookbook.to_dict()

#Edit a cookbook
@cookbooks_routes.route('/<int:id>/', methods=['PUT'])
@login_required
def edit_cookbook(id):
    form = CreateCookbookForm()
    cookbook = Cookbook.query.get(id)
    if not cookbook:
        return jsonify({"error": "Cookbook not found"}), 404

    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        name = form.data['name']

        cookbook.name = name

        db.session.commit()
        return cookbook.to_dict()

#Delete a cookbook
@cookbooks_routes.route('/<int:id>/', methods=['DELETE'])
@login_required
def delete_cookbook(id):
    cookbook = Cookbook.query.get(id)
    if not cookbook:
        return jsonify({"error": "Cookbook not found"}), 404
    db.session.delete(cookbook)
    db.session.commit()

    return jsonify({'message':'Sucessfully Deleted'})
