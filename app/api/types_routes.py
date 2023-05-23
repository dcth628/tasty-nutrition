from flask import Blueprint, request, jsonify
from app.models import db, Type

types_routes = Blueprint('types', __name__)

#Get all Types
@types_routes.route('')
def all_types():
    types = Type.query.all()
    return {type.id: type.to_dict() for type in types}
