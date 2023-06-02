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
                        <h3 className="recipe-name">{recipe.name}</h3>
                        <div>
                            {recipe.types.map(type =>
                                <>
                                    <img src={type.img} alt={type.types} height={30} width={30} className="recipe-type" />
                                </>
                            )}
                        </div>
                        <p>Serving: {recipe.serving}</p>
                        <div className="recipe-time">
                            <i className="far fa-clock"></i> {recipe.cooktime} mins
                        </div>
                        <div>
                        </div>
                    </NavLink>
                    {/* {sessionUser.id == recipe.user_id ? (
                        <OpenModalButton
                            buttonText={'Delete Recipe'}
                            modalComponent={<DeleteRecipeModal recipeId={recipe.id} />} />
                    ) : <></>} */}
                    <OpenModalButton
                        buttonText={'Add to Cookbook'}
                        modalComponent={<AddRecipeToCookbook recipeId={recipe.id} />} />
                </div>))}
        </div>
    )
};

export default AllRecipes
