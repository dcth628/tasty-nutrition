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
        <div>
            <h1>Confirm Delete</h1>
            <p>Are you sure you want to remove this recipe from this cookbook?</p>
            <button onClick={DeleteRecipeCookbook}>Yes</button>
            <button onClick={closeModal}>No</button>
        </div>
    )
};

export default DeleteRecipeCookbookModal
