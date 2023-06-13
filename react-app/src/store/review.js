const LOAD_REVIEW = 'review/LOAD_REVIEW';
const CREATE_REVIEW = 'review/CREATE_REVIEW';
const EDIT_REVIEW = 'review/EDIT_REVIEW';
const REMOVE_REVIEW = 'reivew/REMOVE_REVIEW';

const load = (review) => ({
    type: LOAD_REVIEW,
    review
});

const create = (review) => ({
    type:CREATE_REVIEW,
    review
});

const edit = (review) => ({
    type:EDIT_REVIEW,
    review
});

const remove = (reviewId) => ({
    type: REMOVE_REVIEW,
    reviewId
});

export const getAllReviews = () => async (dispatch) => {
    const response = await fetch('/api/reviews');

    if (response.ok) {
        const reviews = await response.json();
        dispatch(load(reviews));
        return reviews
    };
};

export const getAllReivewsByRecipe = (recipeId) => async (dispatch) => {
    const response = await fetch(`/api/recipes/${recipeId}/reviews`);

    if (response.ok) {
        const reviews = await response.json();
        dispatch(load(reviews, recipeId));
        return reviews
    };
};


export const getAllReviewsByUser = () => async (dispatch) => {
    const response = await fetch('/api/reviews/current');

    if (response.ok) {
        const reviews = await response.json();
        dispatch(load(reviews));
        return reviews
    };
};


export const createReview = (reviews) => async (dispatch) => {
    const { review, star, userId, recipeId } = reviews
    const response = await fetch(`/api/recipes/${recipeId}/reviews`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            review, star, userId, recipeId
        })
    });

    if (response.ok) {
        const new_review = await response.json();
        dispatch(create(new_review));
        return new_review
    };
};

const initialState = {}

const reviewReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_REVIEW:
            return {...state, ...action.review}
        case CREATE_REVIEW:
            return {...state, [action.review.id]: action.review}
        default:
            return state
    }
};

export default reviewReducer
