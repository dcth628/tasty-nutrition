import React from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../../context/Modal";
import { deleteRecipeCookbook } from "../../../store/cookbook";
import { getCookbookDetail } from "../../../store/cookbook";

const DeleteRecipeCookbookModal = ({recipeId, cookbookId}) => {
    const dispatch = useDispatch();
    const { closeModal } = useModal();

    const DeleteRecipeCookbook = async (e) => {
        e.preventDefault();
        await dispatch(deleteRecipeCookbook(recipeId, cookbookId));
        await dispatch(getCookbookDetail(cookbookId));
        closeModal();
    };

    return (
        <div className="delete-form">
            <h3 className="delete-title">Confirm Delete</h3>
            <p>Are you sure you want to remove this recipe?</p>
            <div>
            <button className='confrim-buttons' onClick={DeleteRecipeCookbook}>DELETE</button>
            <button className='create-buttons'onClick={closeModal}>CANCEL</button>
            </div>
        </div>
    )
};

export default DeleteRecipeCookbookModal
