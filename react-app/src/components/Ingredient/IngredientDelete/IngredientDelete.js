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
        <div className="delete-form">
            <h3 className="delete-title">Confirm Delete</h3>
            <p>Are you sure you want to delete this ingredient?</p>
            <div>
            <button className='confrim-buttons' onClick={DeleteIngredient}>DELETE</button>
            <button className='create-buttons' onClick={closeModal}>CANCEL</button>
            </div>
        </div>
    )
};

export default DeleteIngredientModal
