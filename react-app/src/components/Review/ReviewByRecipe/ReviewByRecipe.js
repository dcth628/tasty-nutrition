import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllReivewsByRecipe } from "../../../store/review";
import './ReviewByRecipe.css'
const ReviewbyRecipe = ({ recipe }) => {
    const dispatch = useDispatch();
    const { recipeId } = useParams();
    let reviews = useSelector(state => Object.values(state?.review)).reverse();
    reviews = reviews.filter(review => review.recipe_id === recipe.id)
    const sessionUser = useSelector(state => state?.session.user);

    console.log(reviews)
    useEffect(() => {
        dispatch(getAllReivewsByRecipe(recipeId))
    }, [dispatch])

    return (
        // <div>test</div>
        <div>
            {reviews && (reviews.length > 0 ?
                <div>
                    {reviews.map(review =>

                        <div key={review.id}>
                            <div >{review && review.username}</div>
                            <div >{new Date(review.createdAt).toDateString().split(" ")[1]} {new Date(review.createdAt).toDateString().split(" ")[3]}</div>
                            <div >{review.review}</div>
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

              {/* {sessionUser && sessionUser.id === review.userId ?
                <div>
                  <button className="review-action-button">
                    <OpenModalMenuItem
                      itemText="Edit Review"
                      onItemClick={closeMenu}
                      modalComponent={<EditReviewForm reviews={reviews} />}
                    />
                  </button>
                  <button className="review-action-button">
                    <OpenModalMenuItem
                      itemText="Delete Review"
                      onItemClick={closeMenu}
                      modalComponent={<DeleteReview reviewId={review.id} spotId={spotId} />}
                    />
                  </button>
                </div>
                :
                <></>
              } */}
            </div>
          )}
        </div>
        :
<>
    <div>

        <i className="fa fa-star no-review-star"> </i> <div >NEW!</div>
    </div>
    <div>Be the first to leave a review!</div>
</>
      )}
    </div >
    )

};

export default ReviewbyRecipe
