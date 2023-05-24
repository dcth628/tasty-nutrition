import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllRecipes } from "../../../store/recipe";
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";
import DeleteRecipeModal from "../RecipeDelete/RecipeDelete";
import OpenModalButton from "../../OpenModalButton";


const AllRecipes = () => {
    const dispatch = useDispatch();
    const recipes = useSelector(state=> state?.recipe);
    console.log(recipes, 'this is recipe all')

    useEffect(() => {
        dispatch(getAllRecipes())
    }, [dispatch])

    let count = 0

    return (
        <>
        test
        {Object.values(recipes).map(recipe =>
            <div>
                <NavLink to={`/recipes/${recipe.id}`}>
                    <h2>{count += 1}. {recipe.name}</h2>
                    {recipe.types.map(type =>
                        <p key={type.id}>{type.types}</p>)}
                    <img src={recipe.images.map(image => image.url)} alt={recipe.name} height={100} width={100} />
                    <p>Serving: {recipe.serving}</p>
                    <p>Cooktime: {recipe.cooktime}</p>
                </NavLink>
                <OpenModalButton
                buttonText={'Delete Recipe'}
                modalComponent={<DeleteRecipeModal recipeId={recipe.id} />} />
            </div>)}
        </>
    )
};

export default AllRecipes
