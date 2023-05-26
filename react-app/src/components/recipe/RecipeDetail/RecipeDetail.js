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

    // console.log(recipe, 'this is recipe in detail')
    useEffect(() => {
        dispatch(getRecipeDetail(recipeId))
        dispatch(getAllTypes())
    }, [dispatch, recipeId]);

    const ingredientArr = recipe?.ingredients.map(ingredient => ingredient)
    return (
        <div>
            {
                recipe && (
                    <>
                        <h2>{recipe.name} by {recipe.user_id}</h2>
                        {recipe.images.map((image) => {
                            return (
                                <img src={image.url} alt={image.id} height={200} width={200} />
                            )
                        })}
                        <h3>{recipe.description}</h3>
                        {recipe.instruction.split("\\").map(instruction =>
                            <p key={instruction}>{instruction}</p>)}
                        <p>{recipe.serving} Serving</p>
                        <p>Cooktime: {recipe.cooktime}</p>
                        {recipe.types.map(type => (
                            <>
                            <img src={type.img} alt={type.types} height={50} width={50} />
                            <span key={type.id}> {type.types}</span>
                            </>
                        ))}
                        {/* Ingredients: {ingredientArr[0].name} */}
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
