import React from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../../context/Modal";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { deleteIngredient, getAllIngredients } from "../../../store/ingredient";

const DeleteIngredientModal = ({ ingredientId }) => {
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const history = useHistory();

    const DeleteIngredient = async (e) => {
        e.preventDefault();
        await dispatch(deleteIngredient(ingredientId));
        closeModal();
        await dispatch(getAllIngredients());
        await history.push('/ingredients')
    }

    return (
        <>
        <div>
            <h1>Confirm Delete</h1>
            <p>Are you sure you want to delete this ingredient?</p>
            <button onClick={DeleteIngredient}>Yes</button>
            <button onClick={closeModal}>No</button>
        </div>
        </>
    )
};

export default DeleteIngredientModal
