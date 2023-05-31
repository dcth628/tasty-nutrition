const CREATE_IMAGE = 'image/CREATE_IMAGE';
const DELETE_IMAGE = 'image/DELETE_IMAGE';

const create = (image) => ({
    type: CREATE_IMAGE,
    image
});

const remove = (image) => ({
    type: DELETE_IMAGE,
    image
})

export const createImageRecipe = (imageArray, userId,recipeId) => async dispatch => {
    imageArray.forEach( async (image) => {
        const response = await fetch(`/api/recipes/${recipeId}/images/`, {
            method: 'POST',
            // headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                url: image,
                recipe_id: recipeId,
                user_id: userId
            })
        });
        const newImage = await response.json();
        dispatch(create(newImage));
    })
};

export const deleteImage = (imageArray) => async dispatch => {
    imageArray.forEach( async (image) => {
        const response = await fetch(`/api/recipes/images/${image.id}`, {
            method: "DELETE"
        });

        if (response.ok) {
            const image = await response.json();
            dispatch(remove(image.id));
            return image
        };
    })
};

const initialState = {};

const imageReducer = (state = initialState, action) => {
    switch (action.type){
        case CREATE_IMAGE:
            const newState = {
                ...state,
                [action.image.id]: action.image
            };
            return newState;
        case DELETE_IMAGE:
            const deleteState = {...state}
            delete deleteState[action.imageId]
            return deleteState
        default:
            return state
    }
};

export default imageReducer;
