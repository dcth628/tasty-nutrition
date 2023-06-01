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
        await history.push('/profile');
    };

    return (
        <>
        <div>
            <h1>Confir Delete</h1>
            <p>Are you sure you want to delete this recipe?</p>
            <button onClick={DeleteRecipe}>Yes</button>
            <button onClick={closeModal}>No</button>
        </div>
        </>
    )
};

export default DeleteRecipeModal
