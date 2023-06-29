import React from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../../context/Modal";
import { deleteReview, getAllReivewsByRecipe } from "../../../store/review";

const DeleteReviewModal = ({reviewId, recipeId}) => {
    const dispatch = useDispatch();
    const { closeModal } = useModal();

    const DeleteReview = async (e) => {
        e.preventDefault();
        await dispatch(deleteReview(reviewId));
        closeModal();
        await dispatch(getAllReivewsByRecipe(recipeId));
    };

    return (
        <div className="delete-form">
            <h3 className="delete-title">Confirm Delete</h3>
            <p>Are you sure you want to delete this review?</p>
            <div>
            <button className='confrim-buttons' onClick={DeleteReview}>DELETE</button>
            <button className='create-buttons' onClick={closeModal}>CANCEL</button>
            </div>
        </div>
    );
};

export default DeleteReviewModal
