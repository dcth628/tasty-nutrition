import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { useSelector, useDispatch } from "react-redux";
import { getRecipeDetail } from "../../../store/recipe";
import OpenModalButton from "../../OpenModalButton";
import EditIngredientModal from "../../Ingredient/IngredientEdit/IngredientEdit";
import EditRecipeModal from "../RecipeEdit/RecipeEdit";

const RecipeDetail = () => {
    const dispatch = useDispatch();
    const { recipeId } = useParams();
    const recipe = useSelector(state => state?.recipe[recipeId]);

    console.log(recipe, 'this is recipe in detail')
    useEffect(() => {
        dispatch(getRecipeDetail(recipeId))
    }, [dispatch, recipeId]);

    const ingredientArr = recipe?.ingredients.map(ingredient => ingredient)
    return (
        <div>
            {
                recipe && (
                    <>
                        <h2>{recipe.name} by {recipe.user_id}</h2>
                        <img src={recipe.images.map(img => img.url)} alt={recipe.name} height={200} width={200} />
                        <h3>{recipe.description}</h3>
                        <p>{recipe.instruction}</p>
                        <p>{recipe.serving} Serving</p>
                        <p>Cooktime: {recipe.cooktime}</p>
                        {recipe.types.map(type => (
                            <p key={type.id}>{type.types}</p>
                        ))}
                        {/* Ingredients: {ingredientArr[0].name} */}
                        <OpenModalButton
                            buttonText={'Edit Recipe'}
                            modalComponent={<EditRecipeModal recipe={recipe} />} />
                    </>
    )
}
        </div >
    )
};

export default RecipeDetail
