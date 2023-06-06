import { useEffect, useState, useRef } from "react";
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min";
import { useSelector, useDispatch } from "react-redux";
import { getRecipeDetail } from "../../../store/recipe";
import AddRecipeToCookbook from "../RecipeAll/RecipeAddCookbook";
import OpenModalButton from "../../OpenModalButton";
import EditRecipeModal from "../RecipeEdit/RecipeEdit";
import AddDynamicInput from "../addInstruction";
import { getAllTypes } from "../../../store/type";
import './RecipeDetail.css'

const RecipeDetail = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { recipeId } = useParams();
    const recipe = useSelector(state => state?.recipe[recipeId]);
    const sessionUser = useSelector(state=> state.session.user)

    useEffect(() => {
        dispatch(getRecipeDetail(recipeId))
        dispatch(getAllTypes())
    }, [dispatch, recipeId]);

    const handleRedirect = (e) => {
        e.preventDefault();
        history.push('/recipes/edit')
    }

    console.log(recipe, '--recipe')
    return (
        <div className="recipe-page">
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
                                        <img src={type.img} alt={type.types} height={36} width={36} className="recipe-types" />
                                    </>
                                ))}
                            </div>
                            <div className="recipe-nutrion-list">
                                <span>Cals: {recipe.ingredients && (recipe.ingredients.map(ingredient => ingredient?.calorie * ingredient.quantity).reduce((acc, el) => acc + el, 0))}</span>
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
                                        <p>{ingredient.quantity * ingredient.measurement} g</p>
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
                    </>
                )
            }
        </div >
    )
};

export default RecipeDetail
