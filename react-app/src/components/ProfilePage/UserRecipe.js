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
    console.log(userRecipe, '-- user recipe')
    useEffect(() => {
        dispatch(currentUserRecipes())
    }, [dispatch])


    return (
        <div>
            {userRecipe && userRecipe.length > 0 ? (
                <div className="recipe-page">
                    {Object.values(userRecipe).map(recipe =>
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
                                        <img src={type.img} alt={type.types} height={30} width={30} className="recipe-type"/>
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
