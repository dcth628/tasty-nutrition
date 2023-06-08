import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllRecipes } from "../../../store/recipe";
import { currentUserCookbook } from "../../../store/cookbook";
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";
import DeleteRecipeModal from "../RecipeDelete/RecipeDelete";
import OpenModalButton from "../../OpenModalButton";
import AddRecipeToCookbook from "./RecipeAddCookbook";
import { getAllTypes } from "../../../store/type";
import SimpleImageSlider from "react-simple-image-slider";
import { borderRadius } from "@mui/system";
import './RecipeAll.css'

const AllRecipes = () => {
    const dispatch = useDispatch();
    const recipes = useSelector(state => state?.recipe);
    const sessionUser = useSelector(state => state?.session.user)
    const userCookbooks = useSelector(state => state?.cookbook)
    const types = useSelector(state => state?.type)


    useEffect(() => {
        dispatch(getAllRecipes())
        dispatch(currentUserCookbook())
        dispatch(getAllTypes())
    }, [dispatch])

    return (
        sessionUser ? (<div className="recipe-page">
            <div className="typelists">
                {Object.values(types).map(type => (
                    <div className="type-tile">
                        <img src={type.img} alt={type.id} width={40} height={40}/>
                        <p>{type.type}</p>
                    </div>
                ))}
            </div>
            {recipes && (Object.values(recipes).map(recipe =>
                <div className="recipe-card">
                    <NavLink to={`/recipes/${recipe.id}`}>
                        {/* <div className="recipe-image-box">
                            {recipe.images.map((image) => (
                                <img src={image.image} alt={recipe.name} className="recipe-card-image" />
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
                                        showNavs={true}
                                    />
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
        </div>)
        :
        (<div className="recipe-page">
        <div className="typelists">
            {Object.values(types).map(type => (
                <div className="type-tile">
                    <img src={type.img} alt={type.id} width={40} height={40}/>
                    <p>{type.type}</p>
                </div>
            ))}
        </div>
        {recipes && (Object.values(recipes).map(recipe =>
            <div className="recipe-card">
                <NavLink to={`/recipes/${recipe.id}`}>
                    {/* <div className="recipe-image-box">
                        {recipe.images.map((image) => (
                            <img src={image.image} alt={recipe.name} className="recipe-card-image" />
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
                                    showNavs={true}
                                />
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
            </div>))}
    </div>)
    )
};

export default AllRecipes
