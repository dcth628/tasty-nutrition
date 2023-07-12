from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from app.models import db, Review, Recipe
from app.forms.review_form import CreateReviewForm

reviews_routes = Blueprint('reviews', __name__)

#Get all reviews
@reviews_routes.route('')
def all_reviews():
    reviews = Review.query.all()
    return {review.id: review.to_dict() for review in reviews}

#Get all reviews for the current user
@reviews_routes.route('/current')
@login_required
def user_reviews():
    user_id = current_user.get_id()
    reviews = Review.query.filter_by(user_id = user_id)
    return {review.id: review.to_dict() for review in reviews}

#Get details of a review by the id
@reviews_routes.route('/<int:id>')
def review_detail(id):
    review = Review.query.filter(Review.id == id).first()
    if review:
        return review.to_dict()
    return jsonify({"error": "Review not found"}), 404

#Edit a review
@reviews_routes.route('/<int:id>', methods=["PUT"])
def edit_review(id):
    form = CreateReviewForm()
    edit_review = Review.query.get(id)
    if not edit_review:
        return jsonify({"error": "Review not found"}), 404

    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        review = form.data['review']
        star = form.data['star']

        edit_review.review = review
        edit_review.star = star
        db.session.commit()
        return edit_review.to_dict()

#Delete a review
@reviews_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_review(id):
    review = Review.query.get(id)
    if not review:
        return jsonify({"error": "Review not found"}), 404
    db.session.delete(review)
    db.session.commit()

    return jsonify({'message':'Sucessfully Deleted'})
