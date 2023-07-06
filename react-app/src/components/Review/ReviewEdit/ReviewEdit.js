import React, { useState, useEffect } from "react";
import { useModal } from "../../../context/Modal";
import { useDispatch, useSelector } from "react-redux";
import { editReview } from "../../../store/review";
import { getAllReivewsByRecipe } from "../../../store/review";
import Tooltip from '@mui/material/Tooltip';

const EditReview = ({reviews, recipeId}) => {
    const dispatch = useDispatch();
    const {closeModal } = useModal();
    const sessionUser = useSelector(state => state?.session.user)

    const [review, setReview] = useState(reviews.review);
    const [star , setStar ] = useState(reviews.star);
    const [errors, setErrors] = useState([]);

    const updateReview = (e) => setReview(e.target.value);

    const handleSubmit = async (e) => {
        const editedReview = {
            id: reviews.id,
            recipe_id: recipeId,
            user_id: sessionUser.id,
            review, star
        };
        let updatedReview = await dispatch(editReview(editedReview));
        if (updatedReview) {
            closeModal();
            dispatch(getAllReivewsByRecipe())
        }
    };

    const onChange = (e) => {
        setStar(e);
        // const number = e.target.value;
        // setRating(parseInt(number));
    };

    const handleCancelClick = (e) => {
        e.preventDefault();
        closeModal();
    };

    return (
        <section>
            <form onSubmit={handleSubmit}>
                <h3>Update Your Review</h3>
                <ul>
                    {errors.map((error, idx) =>
                        <li key={idx}>{error}</li>
                    )}
                </ul>
                <div className="rating-input">
                    <Tooltip title="Bad" arrow>
                    <div onMouseEnter={() => setStar(1)}
                        onMouseLeave={() => setStar(star)}
                        className={
                            star >= 1
                                ? "filled"
                                : "empty"
                        }
                        onClick={() => onChange(1)}
                    >
                        <i className="fa fa-star"></i>
                    </div>
                    </Tooltip>
                    <Tooltip title="Not Good" arrow>
                    <div onMouseEnter={() => setStar(2)}
                        onMouseLeave={() => setStar(star)}
                        className={
                            star >= 2
                                ? "filled"
                                : "empty"
                        }
                        onClick={() => onChange(2)}
                    >
                        <i className="fa fa-star"></i>
                    </div>
                    </Tooltip>
                    <Tooltip title="OK" arrow>
                    <div onMouseEnter={() => setStar(3)}
                        onMouseLeave={() => setStar(star)}
                        className={
                            star >= 3
                                ? "filled"
                                : "empty"
                        }
                        onClick={() => onChange(3)}
                    >
                        <i className="fa fa-star"></i>
                    </div>
                    </Tooltip>
                    <Tooltip title='Good' arrow>
                    <div onMouseEnter={() => setStar(4)}
                        onMouseLeave={() => setStar(star)}
                        className={
                            star >= 4
                                ? "filled"
                                : "empty"
                        }
                        onClick={() => onChange(4)}
                    >
                        <i className="fa fa-star"></i>
                    </div>
                    </Tooltip>
                    <Tooltip title='Great' arrow>
                    <div onMouseEnter={() => setStar(5)}
                        onMouseLeave={() => setStar(star)}
                        className={
                            star >= 5
                                ? "filled"
                                : "empty"
                        }
                        onClick={() => onChange(5)}
                    >
                        <i className="fa fa-star"></i>
                    </div>
                    </Tooltip>
                </div>
                <div className="input-group">
                    <textarea
                        type="text"
                        rows={4}
                        cols={30}
                        required
                        value={review}
                        onChange={updateReview} />
                    <label>Please write a review</label>
                </div>
                <button className='confrim-buttons' type="submit">Update</button>
                <button className='create-buttons' type="button" onClick={handleCancelClick}>Cancel</button>
            </form>
        </section>
    )

};

export default EditReview
