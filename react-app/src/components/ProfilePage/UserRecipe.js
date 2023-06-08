import { useSelector, useDispatch } from "react-redux";
import { currentUserRecipes } from "../../store/recipe";
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";
import { useEffect } from "react";
import OpenModalButton from "../OpenModalButton";
import DeleteRecipeModal from "../recipe/RecipeDelete/RecipeDelete";
import './UserRecipe.css'
import SimpleImageSlider from "react-simple-image-slider";
import { borderRadius } from "@mui/system";

const UserRecipe = () => {
    const dispatch = useDispatch()
    const recipes = useSelector((state) => state?.recipe);
    const sessionUser = useSelector((state) => state?.session.user);
    const userRecipe = Object.values(recipes).filter(recipe => recipe.user_id == sessionUser.id)

    useEffect(() => {
        dispatch(currentUserRecipes())
    }, [dispatch])

    const images = Object.values(recipes).map(recipe => recipe.images)

    return (
        <div>
            {userRecipe && userRecipe.length > 0 ? (
                <div className="user-recipe-page">
                    <h2 className="recipe-title">Recipes</h2>
                    {Object.values(userRecipe).map(recipe =>
                        <div className="recipe-card">
                            <NavLink to={`/recipes/${recipe.id}`}>
                                {/* <div className="recipe-image-box">
                                    {recipe.images.map((image) => (
                                        <img src={image.image} alt={recipe.name} className="recipe-card-image" />
                                    ))}
                                </div>
                                </NavLink> */}

                                <div className="recipe-image-box">
                                    <SimpleImageSlider
                                    className="recipe-card-image"
                                    style={borderRadius}

                                        navSize={20}
                                        width={220}
                                        height={220}
                                        bgColor={"#ffffff"}
                                        images={recipe.images.map(image => image.image)}
                                        showNavs={true}
                                    />
                                </div>
                                {/* <NavLink to={`/recipes/${recipe.id}`}> */}
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
                                            <img src={type.img} alt={type.types} height={24} width={24} className="recipe-type" />
                                        </>
                                    )}
                                </div>
                            </NavLink>
                            <OpenModalButton
                                buttonText={'Delete Recipe'}
                                modalComponent={<DeleteRecipeModal recipeId={recipe.id} />} />
                        </div>)}
                </div>
            ) : <h2 className="no-title">No Recipe</h2>}
        </div>
    )
};

export default UserRecipe
