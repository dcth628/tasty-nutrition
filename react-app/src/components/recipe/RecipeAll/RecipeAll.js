import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllRecipes } from "../../../store/recipe";
import { currentUserCookbook } from "../../../store/cookbook";
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";
import DeleteRecipeModal from "../RecipeDelete/RecipeDelete";
import OpenModalButton from "../../OpenModalButton";
import AddRecipeToCookbook from "./RecipeAddCookbook";

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
        <>
            {Object.values(recipes).map(recipe =>
                <div>
                    <NavLink to={`/recipes/${recipe.id}`}>
                        <h2>{count += 1}. {recipe.name}</h2>
                        {recipe.images.map((image) => (
                        <img src={image.image} alt={recipe.name} height={100} width={100} />
                        ))}
                        {recipe.types.map(type =>
                            <>
                                <img src={type.img} alt={type.types} height={30} width={30} />
                                <span key={type.id}>{type.types}</span>
                            </>
                        )}
                        <p>Serving: {recipe.serving}</p>
                        <p>Cooktime: {recipe.cooktime}</p>
                    </NavLink>
                    {sessionUser.id == recipe.user_id ? (
                        <OpenModalButton
                            buttonText={'Delete Recipe'}
                            modalComponent={<DeleteRecipeModal recipeId={recipe.id} />} />
                    ) : <></>}
                    <OpenModalButton
                            buttonText={'Add to Cookbook'}
                            modalComponent={<AddRecipeToCookbook recipeId={recipe.id} />} />
                    </div>)}
        </>
    )
};

export default AllRecipes
