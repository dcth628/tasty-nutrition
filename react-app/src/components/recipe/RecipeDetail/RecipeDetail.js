import { useEffect } from "react";
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min";
import { useSelector, useDispatch } from "react-redux";
import { getRecipeDetail } from "../../../store/recipe";
import AddRecipeToCookbook from "../RecipeAll/RecipeAddCookbook";
import OpenModalButton from "../../OpenModalButton";
import EditRecipeModal from "../RecipeEdit/RecipeEdit";
import ReviewbyRecipe from "../../Review/ReviewByRecipe/ReviewByRecipe";
import { getAllTypes } from "../../../store/type";
import CreateReview from "../../Review/ReviewCreate/ReviewCreate";
import LoginFormModal from "../../LoginFormModal";
import SignupFormModal from "../../SignupFormModal";
import { getAllReivewsByRecipe } from "../../../store/review";
import Tooltip from '@mui/material/Tooltip';
import './RecipeDetail.css'

const RecipeDetail = () => {
    const dispatch = useDispatch();
    const { recipeId } = useParams();
    const recipe = useSelector(state => state?.recipe[recipeId]);
    const sessionUser = useSelector(state => state.session.user)
    let review = useSelector(state => Object.values(state?.review));
    let reviews = review.filter(review => review.recipe_id == recipeId)
    let sessionUserReview;
    if (sessionUser) sessionUserReview = reviews.filter(review => review.user_id === sessionUser.id)

    const cooktimeLength = (data) => {
        const min = data % 60
        const hour = (data - min) / 60
        if (min === 0 && hour === 1) {
            return `${hour} hour 00 min`
        }
        if (min < 10 && min > 1 && hour === 1) {
            return `${hour} hour 0${min} mins`
        }
        if (min === 1 && hour === 1) {
            return `${hour} hour 01 min`
        }
        if (min >= 10 && hour === 1) {
            return `${hour} hour ${min} mins`
        }
        if (hour > 1 && min > 1 && min < 10) {
            return `${hour} hours 0${min} mins`
        }
        if (hour > 1 && min === 0) {
            return `${hour} hours`
        }
        if (hour > 1 && min === 1) {
            return `${hour} hours 01 min`
        }
        if (hour === 0 && min < 10) {
            return `0${min} mins`
        }
        if (hour === 0 && min >= 10) {
            return `${min} mins`
        }
        if (hour === 0 && min === 1) {
            return `1 min`
        }
        return `${hour} hours ${min} mins`
    };

    useEffect(() => {
        dispatch(getRecipeDetail(recipeId))
        dispatch(getAllTypes())
        dispatch(getAllReivewsByRecipe(recipeId))
    }, [dispatch, recipeId]);

    return (
        sessionUser ? (<div className="recipe-page">
            {
                recipe && (
                    <>
                        <h2 className="recipe-detail-title">{recipe.name}</h2>
                        <div className="recipe-detail-image-box">
                            {recipe.images.map((image) => {
                                return (
                                    <img src={image.image} alt={image.id} className="recipe-detail-image" />
                                )
                            })}
                        </div>
                        <div className="recipe-detail-list">
                            <div>
                                {recipe.types.map(type => (
                                    <>
                                        <Tooltip title={type.types} arrow>
                                            <img src={type.img} alt={type.types} height={36} width={36} className="recipe-types" />
                                        </Tooltip>
                                    </>
                                ))}
                            </div>
                            <div className="recipe-nutrion-list">
                                <span>Cals: {recipe.ingredients && (recipe.ingredients.map(ingredient => ingredient?.calorie * ingredient.quantity).reduce((acc, el) => acc + el, 0).toFixed(1))}</span>
                                <span className="recipe-nutrition">Protein: {recipe.ingredients && (recipe.ingredients.map(ingredient => ingredient?.protein * ingredient.quantity).reduce((acc, el) => acc + el, 0).toFixed(1))}</span>
                                <span className="recipe-nutrition">Carbs: {recipe.ingredients && (recipe.ingredients.map(ingredient => ingredient?.carb * ingredient.quantity).reduce((acc, el) => acc + el, 0).toFixed(1))}</span>
                                <span className="recipe-nutrition">Fats: {recipe.ingredients && (recipe.ingredients.map(ingredient => ingredient?.fat * ingredient.quantity).reduce((acc, el) => acc + el, 0).toFixed(1))}</span>
                            </div>
                            <div className="recipe-detail-time"><i className="far fa-clock"></i> {cooktimeLength(recipe.cooktime)}</div>
                            <div className="recipe-detail-serving">
                                <p>{recipe.serving} Serving</p>
                            </div>
                            <div>
                                {recipe.user_id === sessionUser.id ? (
                                    <OpenModalButton
                                        buttonText={'EDIT RECIPE'}
                                        modalComponent={<EditRecipeModal recipe={recipe} />} />
                                ) : <></>}
                            </div>
                            <div>
                                <OpenModalButton
                                    buttonText={'ADD TO COOKBOOK'}
                                    modalComponent={<AddRecipeToCookbook recipeId={recipe.id} />} />
                            </div>
                        </div>
                        <p className="recipe-description">{recipe.description}</p>
                        <div className="recipe-detail-page">
                            <div className="recipe-ingredient">
                                <h3>Ingredients </h3>
                                {recipe.ingredients.map(ingredient => (
                                    <div className="recipe-ingredient-list">
                                        <p>{ingredient.name}</p>
                                        <p>{(ingredient.quantity * ingredient.measurement).toFixed(0)} g</p>
                                    </div>
                                ))}
                            </div>
                            <div className="recipe-instruction">
                                <h3>Instructions </h3>
                                {recipe.instruction.split("\\").map((instruction, i) => (
                                    <div className="recipe-instruction-list">
                                        <div className="reicpe-instruction-number">{i + 1}</div>
                                        <div className="recipe-instructions" key={instruction}>{instruction}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="recipe-detail-page">
                            <div>
                                {sessionUserReview.length > 0 || sessionUser.id === recipe.user_id ?
                                    sessionUser.id === recipe.user_id ?
                                        <div className="review-not-create">You can not review your recipe</div> :
                                        <div className="review-not-create">You have left a review</div>
                                    :
                                    <CreateReview recipeId={recipe.id} />}
                            </div>
                            <div className="review-list">
                                <ReviewbyRecipe recipe={recipe} />
                            </div>
                        </div>
                    </>
                )
            }
        </div >)
            :
            (<div className="recipe-page">
                {
                    recipe && (
                        <>
                            <h2 className="recipe-detail-title">{recipe.name}</h2>
                            <div className="recipe-detail-image-box">
                                {recipe.images.map((image) => {
                                    return (
                                        <img src={image.image} alt={image.id} className="recipe-detail-image" />
                                    )
                                })}
                            </div>
                            <div className="recipe-detail-list">
                                <div>
                                    {recipe.types.map(type => (
                                        <>
                                            <Tooltip title={type.types} arrow>
                                                <img src={type.img} alt={type.types} height={36} width={36} className="recipe-types" />
                                            </Tooltip>
                                        </>
                                    ))}
                                </div>
                                <div className="recipe-nutrion-list">
                                    <span>Cals: {recipe.ingredients && (recipe.ingredients.map(ingredient => ingredient?.calorie * ingredient.quantity).reduce((acc, el) => acc + el, 0).toFixed(1))}</span>
                                    <span className="recipe-nutrition">Protein: {recipe.ingredients && (recipe.ingredients.map(ingredient => ingredient?.protein * ingredient.quantity).reduce((acc, el) => acc + el, 0).toFixed(1))}</span>
                                    <span className="recipe-nutrition">Carbs: {recipe.ingredients && (recipe.ingredients.map(ingredient => ingredient?.carb * ingredient.quantity).reduce((acc, el) => acc + el, 0).toFixed(1))}</span>
                                    <span className="recipe-nutrition">Fats: {recipe.ingredients && (recipe.ingredients.map(ingredient => ingredient?.fat * ingredient.quantity).reduce((acc, el) => acc + el, 0).toFixed(1))}</span>
                                </div>
                                <div className="recipe-detail-time"><i className="far fa-clock"></i> {cooktimeLength(recipe.cooktime)}</div>
                                <div className="recipe-detail-serving">
                                    <p>{recipe.serving} Serving</p>
                                </div>
                            </div>
                            <p className="recipe-description">{recipe.description}</p>
                            <div className="recipe-detail-page">
                                <div className="recipe-ingredient">
                                    <h3>Ingredients </h3>
                                    {recipe.ingredients.map(ingredient => (
                                        <div className="recipe-ingredient-list">
                                            <p>{ingredient.name}</p>
                                            <p>{(ingredient.quantity * ingredient.measurement).toFixed(1)} g</p>
                                        </div>
                                    ))}
                                </div>
                                <div className="recipe-instruction">
                                    <h3>Instructions </h3>
                                    {recipe.instruction.split("\\").map((instruction, i) => (
                                        <div className="recipe-instruction-list">
                                            <div className="reicpe-instruction-number">{i + 1}</div>
                                            <div className="recipe-instructions" key={instruction}>{instruction}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="recipe-detail-page">
                            <div>
                                <OpenModalButton
                                    buttonText="LOG IN"
                                    modalComponent={<LoginFormModal />}
                                /> or <OpenModalButton
                                    buttonText="SIGN UP"
                                    modalComponent={<SignupFormModal />}
                                /> to Leave a Review
                            </div>
                            <div className="review-list">
                                <ReviewbyRecipe recipe={recipe} />
                            </div>
                            </div>
                        </>
                    )
                }
            </div >)
    )
};

export default RecipeDetail
