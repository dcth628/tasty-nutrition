import { useEffect, useState, useRef } from "react";
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
    const history = useHistory();
    const { recipeId } = useParams();
    const recipe = useSelector(state => state?.recipe[recipeId]);
    const sessionUser = useSelector(state => state.session.user)
    let reviews = useSelector(state => Object.values(state?.review));
    let sessionUserReview;
    if (sessionUser) sessionUserReview = reviews.filter(review => review.user_id === sessionUser.id)
    console.log(sessionUserReview, '--review')

    useEffect(() => {
        dispatch(getRecipeDetail(recipeId))
        dispatch(getAllTypes())
        dispatch(getAllReivewsByRecipe(recipeId))
    }, [dispatch, recipeId]);

    const handleRedirect = (e) => {
        e.preventDefault();
        history.push('/recipes/edit')
    }

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
                            <div className="recipe-detail-time"><i className="far fa-clock"></i> {recipe.cooktime} mins</div>
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
                        <div>
                            {sessionUserReview.length > 0 || sessionUser.id === recipe.user_id ?
                                sessionUser.id === recipe.user_id ?
                                <>You Can Not Review Your Recipe</> :
                                <>You Have Left a Review</>
                                :
                                <CreateReview recipeId={recipe.id} />}
                        </div>
                        <div>
                            <ReviewbyRecipe recipe={recipe} />
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
                                <div className="recipe-detail-time"><i className="far fa-clock"></i> {recipe.cooktime} mins</div>
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
                            <div>
                                <OpenModalButton
                                    buttonText="Log in"
                                    modalComponent={<LoginFormModal />}
                                /> or <OpenModalButton
                                    buttonText="Sign up"
                                    modalComponent={<SignupFormModal />}
                                /> to Leave a Review</div>
                            <div>
                                <ReviewbyRecipe recipe={recipe} />
                            </div>
                        </>
                    )
                }
            </div >)
    )
};

export default RecipeDetail
