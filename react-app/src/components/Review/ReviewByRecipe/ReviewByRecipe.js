import React, { useEffect, useState, useRef } from "react";
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
  // const [ulClassName, setUlClassName] = useState('dropdowns hidden')
  const ulRef = useRef(null);

  let reviews = useSelector(state => Object.values(state?.review)).reverse();
  reviews = reviews.filter(review => review.recipe_id === recipe.id)
  const sessionUser = useSelector(state => state?.session.user);

  const openMenu = () => {
    // if (showMenu) return;
    setShowMenu(true);
    // setUlClassName('dropdowns')
  };

  // const closeMenu = () => {
  //   setShowMenu(false)
  //   setUlClassName('dropdowns hidden')
  //   console.log(ulClassName, '--classname')
  // };

  useEffect(() => {

    dispatch(getAllReivewsByRecipe(recipeId))
    // if (!showMenu) return;

    const closeMenu = (e) => {

      if (showMenu && !e.target.closest(".dropbtns")) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [dispatch, showMenu, recipeId])

  const ulClassName = "dropdowns" + (showMenu ? "" : " hidden");
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
                    <div  className={ulClassName} ref={ulRef}>
                      <div className="reviewbtns">
                        <OpenModalButton
                          buttonText='EDIT REVIEW'
                          onItemClick={closeMenu}
                          modalComponent={<EditReview reviews={review} recipeId={recipeId}
                          setShowMenu={setShowMenu}
                          // changeClassName={ulClassName}
                          />}
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
