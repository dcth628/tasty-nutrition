import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllRecipes } from "../../../store/recipe";
import { currentUserCookbook } from "../../../store/cookbook";
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";
import DeleteRecipeModal from "../RecipeDelete/RecipeDelete";
import OpenModalButton from "../../OpenModalButton";
import AddRecipeToCookbook from "./RecipeAddCookbook";
import './RecipeAll.css'

const AllRecipes = () => {
    const dispatch = useDispatch();
    const recipes = useSelector(state => state?.recipe);
    const sessionUser = useSelector(state => state?.session.user)
    const userCookbooks = useSelector(state => state?.cookbook)


    useEffect(() => {
        dispatch(getAllRecipes())
        dispatch(currentUserCookbook())
    }, [dispatch])

    let count = 0

    return (
        <div className="recipe-page">
            <h1 className="cookbook-page-title">Recipes</h1>
            {recipes && (Object.values(recipes).map(recipe =>
                <div className="recipe-card">
                    <NavLink to={`/recipes/${recipe.id}`}>
                        <div className="recipe-image-box">
                            {recipe.images.map((image) => (
                                <img src={image.image} alt={recipe.name} className="recipe-card-image" />
                            ))}
                        </div>
                        <p className="recipe-name">{recipe.name}</p>
                        <p className="recipe-descripiton">Serving: {recipe.serving}</p>
                        <div className="recipe-time">
                            <i className="far fa-clock"></i> {recipe.cooktime} mins
                        </div>
                        <div className="types-list">
                            {recipe.types.map(type =>
                                <>
                                    <img src={type.img} alt={type.types} height={26} width={26} className="recipe-type" />
                                </>
                            )}
                        </div>
                        <div>
                        </div>
                    </NavLink>
                    <OpenModalButton
                        buttonText={'Add to Cookbook'}
                        modalComponent={<AddRecipeToCookbook recipeId={recipe.id} />} />
                </div>))}
        </div>
    )
};

export default AllRecipes
