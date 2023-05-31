import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { useSelector, useDispatch } from "react-redux";
import { getRecipeDetail } from "../../../store/recipe";
import OpenModalButton from "../../OpenModalButton";
import EditRecipeModal from "../RecipeEdit/RecipeEdit";
import AddDynamicInput from "../addInstruction";
import { getAllTypes } from "../../../store/type";

const RecipeDetail = () => {
    const dispatch = useDispatch();
    const { recipeId } = useParams();
    const recipe = useSelector(state => state?.recipe[recipeId]);

    useEffect(() => {
        dispatch(getRecipeDetail(recipeId))
        dispatch(getAllTypes())
    }, [dispatch, recipeId]);

    return (
        <div>
            {
                recipe && (
                    <>
                        <h2>{recipe.name} by {recipe.username}</h2>
                        {recipe.images.map((image) => {
                            return (
                                <img src={image.image} alt={image.id} height={200} width={200} />
                            )
                        })}
                        <h3>{recipe.description}</h3>
                        {recipe.instruction.split("\\").map((instruction, i) =>
                            <p key={instruction}>Step {i + 1}. {instruction}</p>)}
                        <p>{recipe.serving} Serving</p>
                        <p>Cooktime: {recipe.cooktime}</p>
                        {recipe.types.map(type => (
                            <>
                                <img src={type.img} alt={type.types} height={50} width={50} />
                                <span key={type.id}> {type.types}</span>
                            </>
                        ))}
                        <p>
                            Ingredients: {recipe.ingredients.map(ingredient => (
                                <>
                                <p>{ingredient.name}</p>
                                <p>{ingredient.quantity * ingredient.measurement} g</p>
                                </>
                                ))}
                        </p>
                        <div>
                            Total Nutrition Facts:
                            <p>Calories: {recipe.ingredients && (recipe.ingredients.map(ingredient => ingredient?.calorie * ingredient.quantity).reduce((acc, el) => acc+ el , 0))}</p>
                            <p>Carbs: {recipe.ingredients && (recipe.ingredients.map(ingredient => ingredient?.carb * ingredient.quantity).reduce((acc, el) => acc+ el, 0))}g</p>
                            <p>Protein: {recipe.ingredients && (recipe.ingredients.map(ingredient => ingredient?.protein * ingredient.quantity).reduce((acc, el) => acc+ el, 0))}g</p>
                            <p>Fat: {recipe.ingredients && (recipe.ingredients.map(ingredient => ingredient?.fat * ingredient.quantity).reduce((acc, el) => acc+ el, 0))}g</p>
                        </div>
                        <OpenModalButton
                            buttonText={'Edit Recipe'}
                            modalComponent={<EditRecipeModal recipe={recipe} />} />
                        <OpenModalButton
                            buttonText={'Trying'}
                            modalComponent={<AddDynamicInput />} />
                    </>
                )
            }
        </div >
    )
};

export default RecipeDetail
