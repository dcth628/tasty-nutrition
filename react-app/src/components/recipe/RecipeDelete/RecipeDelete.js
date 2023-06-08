import React from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../../context/Modal";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { deleteRecipe, getAllRecipes } from "../../../store/recipe";

const DeleteRecipeModal = ({recipeId}) => {
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const history = useHistory();

    const DeleteRecipe = async (e) => {
        e.preventDefault();
        await dispatch(deleteRecipe(recipeId));
        closeModal();
        await dispatch(getAllRecipes());
        await history.push('/');
    };

    return (
        <>
        <div className="delete-form">
            <h3 className="delete-title">Confirm Delete</h3>
            <p>Are you sure you want to delete this recipe?</p>
            <div>
            <button className='confrim-buttons' onClick={DeleteRecipe}>DELETE</button>
            <button className='create-buttons' onClick={closeModal}>CANCEL</button>
            </div>
        </div>
        </>
    )
};

export default DeleteRecipeModal
