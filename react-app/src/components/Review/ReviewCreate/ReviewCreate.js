import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createReview, getAllReivewsByRecipe } from "../../../store/review";
import { getRecipeDetail } from "../../../store/recipe";
import Tooltip from '@mui/material/Tooltip';
import './ReviewCreate.css'


const CreateReview = ({ recipeId }) => {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state?.session.user)

    const [review, setReview] = useState("");
    const [star, setStar] = useState(0);
    const [errors, setErrors] = useState([]);

    const updateReview = (e) => setReview(e.target.value);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newReview = {
            recipe_id: recipeId,
            user_id: sessionUser.id,
            review,
            star
        };

        return dispatch(createReview(newReview))
            .then(dispatch(getAllReivewsByRecipe(recipeId)))
            .then(dispatch(getRecipeDetail(recipeId)))
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) setErrors(data.errors)
            })
    };

    const onChange = (e) => {
        setStar(e);
        // const number = e.target.value;
        // setRating(parseInt(number));
    };

    return (
        <section>
            <form onSubmit={handleSubmit} className="review-create">
                <h3>Rate and review this recipe!</h3>
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
                        onClick={() => setStar(1)}
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
                        onClick={() => setStar(2)}
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
                        onClick={() => setStar(3)}
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
                        onClick={() => setStar(4)}
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
                        onClick={() => setStar(5)}
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
                <button className='confrim-buttons' type="submit">Submit</button>
            </form>
        </section>
    )
};

export default CreateReview
