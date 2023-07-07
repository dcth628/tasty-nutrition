import { useSelector, useDispatch } from "react-redux";
import { currentUserRecipes, getAllRecipes } from "../../store/recipe";
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";
import { useEffect } from "react";
import OpenModalButton from "../OpenModalButton";
import DeleteRecipeModal from "../recipe/RecipeDelete/RecipeDelete";
import './UserRecipe.css'
import SimpleImageSlider from "react-simple-image-slider";
import { borderRadius } from "@mui/system";
import Tooltip from '@mui/material/Tooltip';

const UserRecipe = () => {
    const dispatch = useDispatch()
    const recipes = useSelector((state) => state?.recipe);
    const sessionUser = useSelector((state) => state?.session.user);
    const userRecipe = Object.values(recipes).filter(recipe => recipe.user_id == sessionUser.id)
    const images = Object.values(recipes).map(recipe => recipe.images)

    const cooktimeLength = (data) => {
        const min = data % 60
        const hour = (data - min) / 60
        if (min === 0 && hour === 1) {
            return `${hour} hour 00 min`
        }
        if (min < 10 && hour === 1) {
            return `${hour} hour 0${min} min`
        }
        if (min >= 10 && hour === 1) {
            return `${hour} hour ${min} mins`
        }
        if (hour > 1 && min < 10) {
            return `${hour} hours 0${min} min`
        }
        if (hour > 1 && min === 0) {
            return `${hour} hours 00 min`
        }
        if (hour === 0 && min < 10) {
            return `0${min} mins`
        }
        if (hour === 0 && min >= 10) {
            return `${min} mins`
        }
        return `${hour} hours ${min} mins`
    };

    useEffect(() => {
        dispatch(getAllRecipes())
        dispatch(currentUserRecipes())
    }, [dispatch])


    return (
        <div>
            {userRecipe && userRecipe.length > 0 ? (
                <div className="user-recipe-page">
                    <h2 className="recipe-title">Recipes</h2>
                    {Object.values(userRecipe).map(recipe =>
                        <div key={recipe.id} className="recipe-card">
                            <NavLink to={`/recipes/${recipe.id}`}>
                                {/* <div className="recipe-image-box">
                                    {recipe.images.map((image) => (
                                        <img key={image.id} src={image.image} alt={recipe.name} className="recipe-card-image" />
                                    ))}
                                </div> */}

                                <div className="recipe-image-box">
                                    <SimpleImageSlider
                                    className="recipe-card-image"
                                    style={borderRadius}
                                        navSize={20}
                                        width={220}
                                        height={220}
                                        bgColor={"#ffffff"}
                                        images={recipe.images.map(image => image.image)}
                                        showNavs={false}
                                    />
                                </div>
                                {/* <NavLink to={`/recipes/${recipe.id}`}> */}
                                <div>
                                    <p className="recipe-name">{recipe.name}</p>
                                    <p className="recipe-descripiton"> Serving: {recipe.serving}</p>
                                    <div className="recipe-time">
                                        <i className="far fa-clock"></i> <div>{cooktimeLength(recipe.cooktime)}</div>
                                    </div>
                                </div>
                                <div className="types-list">
                                    {recipe.types.map(type =>
                                        <>
                                        <Tooltip title={type.types} arrow>
                                            <img key={type.id} src={type.img} alt={type.types} height={24} width={24} className="recipe-type" />
                                        </Tooltip>
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
