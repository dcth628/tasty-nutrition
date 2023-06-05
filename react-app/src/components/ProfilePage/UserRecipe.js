import { useSelector, useDispatch } from "react-redux";
import { currentUserRecipes } from "../../store/recipe";
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";
import { useEffect } from "react";
import OpenModalButton from "../OpenModalButton";
import DeleteRecipeModal from "../recipe/RecipeDelete/RecipeDelete";
import './UserRecipe.css'

const UserRecipe = () => {
    const dispatch = useDispatch()
    const recipes = useSelector((state) => state?.recipe);
    const sessionUser = useSelector((state) => state?.session.user);
    const userRecipe = Object.values(recipes).filter(recipe => recipe.user_id == sessionUser.id)

    useEffect(() => {
        dispatch(currentUserRecipes())
    }, [dispatch])


    return (
        <div>
            {userRecipe && userRecipe.length > 0 ? (
                <div className="user-recipe-page">
                    <h1 className="recipe-title">Recipes</h1>
                    {Object.values(userRecipe).map(recipe =>
                        <div className="recipe-card">
                            <NavLink to={`/recipes/${recipe.id}`}>
                                <div className="recipe-image-box">
                                {recipe.images.map((image) => (
                                    <img src={image.image} alt={recipe.name} className="recipe-card-image" />
                                    ))}
                                </div>
                                <div>
                                <p className="recipe-name">{recipe.name}</p>
                                <p className="recipe-descripiton"> Serving: {recipe.serving}</p>
                                <div className="recipe-time">
                                <i className="far fa-clock"></i> {recipe.cooktime} mins
                                </div>
                                </div>
                                <div className="types-list">
                                {recipe.types.map(type =>
                                    <>
                                        <img src={type.img} alt={type.types} height={24} width={24} className="recipe-type"/>
                                    </>
                                )}
                                </div>
                            </NavLink>
                            <OpenModalButton
                                buttonText={'Delete Recipe'}
                                modalComponent={<DeleteRecipeModal recipeId={recipe.id} />} />
                        </div>)}
                </div>
            ) : <></>}
        </div>
    )
};

export default UserRecipe
