import { useSelector, useDispatch } from "react-redux";
import { currentUserRecipes } from "../../store/recipe";
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";
import { useEffect } from "react";
import OpenModalButton from "../OpenModalButton";
import DeleteRecipeModal from "../recipe/RecipeDelete/RecipeDelete";

const UserRecipe = () => {
    const dispatch = useDispatch()
    const recipes = useSelector((state) => state?.recipe);
    const sessionUser = useSelector((state) => state?.session.user);
    const userRecipe = Object.values(recipes).filter(recipe => recipe.user_id == sessionUser.id)

    useEffect(() => {
        dispatch(currentUserRecipes())
    }, [dispatch])

    let count = 0

    return (
        <div>
            {userRecipe && userRecipe.length > 0 ? (
                <div>
                    {Object.values(userRecipe).map(recipe =>
                        <div>
                            <NavLink to={`/recipes/${recipe.id}`}>
                                <h2>{count += 1}. {recipe.name}</h2>
                                {recipe.types.map(type =>
                                    <>
                                        <img src={type.img} alt={type.types} height={30} width={30} />
                                        <span key={type.id}>{type.types}</span>
                                    </>
                                )}
                                {recipe.images.map((image) => (
                                    <img src={image.image} alt={recipe.name} height={100} width={100} />
                                ))}
                                <p>Serving: {recipe.serving}</p>
                                <p>Cooktime: {recipe.cooktime}</p>
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
