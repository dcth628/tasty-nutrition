import React, { useEffect, useState, useRef } from "react";
import { useModal } from "../../../context/Modal";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllReivewsByRecipe } from "../../../store/review";
import OpenModalButton from "../../OpenModalButton";
import EditReview from "../ReviewEdit/ReviewEdit";
import DeleteReviewModal from "../ReviewDelete/ReviewDelete";
import './ReviewByRecipe.css'

const ReviewbyRecipe = ({ recipe }) => {
  const dispatch = useDispatch();
  const { recipeId } = useParams();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef(null);
  const { closeModal } = useModal();

  let reviews = useSelector(state => Object.values(state?.review)).reverse();
  reviews = reviews.filter(review => review.recipe_id === recipe.id)
  const sessionUser = useSelector(state => state?.session.user);

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {

    dispatch(getAllReivewsByRecipe(recipeId))
    if (!showMenu) return;

    const closeMenu = (e) => {

      if (ulRef.current && !ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [dispatch, showMenu])

  const ulClassName = "dropdown" + (showMenu ? "" : " hidden");
  const closeMenu = () => setShowMenu(false);

  return (
    <div>
      {reviews && (reviews.length > 0 ?
        <div >
          {reviews.map(review =>
            <div className="review-list" key={review.id}>
              <div className="review-title">
              <h4>{review && review.username}</h4>
                {sessionUser && review.user_id === sessionUser.id ?
                  <div className="review-menu">
                    <button className="dropbtns" onClick={openMenu}>
                      <i className="fas fa-ellipsis-h" />
                    </button>
                    <div className={ulClassName} ref={ulRef}>
                      <div className="reviewbtns">
                    <OpenModalButton
                      buttonText='EDIT REVIEW'
                      onItemClick={closeMenu}
                      modalComponent={<EditReview reviews={review} recipeId={recipeId} />}
                    />
                      </div>
                    <div className="reviewbtns">
                    <OpenModalButton
                      buttonText="DELETE REVIEW"
                      onItemClick={closeMenu}
                      modalComponent={<DeleteReviewModal reviewId={review.id} recipeId={recipeId} />}
                      />
                    </div>
                    </div>
                  </div>
                  :
                  <></>
                }
              </div>
              <div className="rating-input">
                <div>
                  <i className={
                    review.star >= 1
                      ? "fa fa-star filled"
                      : "fa fa-star empty"
                  }></i>
                </div>
                <div>
                  <i className={
                    review.star >= 2
                      ? "fa fa-star filled"
                      : "fa fa-star empty"
                  }></i>
                </div>
                <div>
                  <i className={
                    review.star >= 3
                      ? "fa fa-star filled"
                      : "fa fa-star empty"
                  }></i>
                </div>
                <div>
                  <i className={
                    review.star >= 4
                      ? "fa fa-star filled"
                      : "fa fa-star empty"
                  }></i>
                </div>
                <div>
                  <i className={
                    review.star >= 5
                      ? "fa fa-star filled"
                      : "fa fa-star empty"
                  }></i>
                </div>
              </div>
              <div >{review.review}</div>
            </div>
          )}
        </div>
        :
        <>
          <div className="no-review">
            <i className="fa fa-star"> <span >NEW!</span></i>
          </div>
        </>
      )}
    </div >
  )

};

export default ReviewbyRecipe
