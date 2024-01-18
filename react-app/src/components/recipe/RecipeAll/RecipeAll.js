import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllRecipes } from "../../../store/recipe";
import { currentUserCookbook } from "../../../store/cookbook";
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";
import OpenModalButton from "../../OpenModalButton";
import AddRecipeToCookbook from "./RecipeAddCookbook";
import { getAllTypes } from "../../../store/type";
import SimpleImageSlider from "react-simple-image-slider";
import { borderRadius } from "@mui/system";
import Tooltip from '@mui/material/Tooltip';
import './RecipeAll.css'

const AllRecipes = () => {
    const dispatch = useDispatch();
    const recipes = useSelector(state => state?.recipe);
    const sessionUser = useSelector(state => state?.session.user)
    const types = useSelector(state => state?.type)

    const cooktimeLength = (data) => {
        const min = data % 60
        const hour = (data - min) / 60
        if (min === 0 && hour === 1) {
            return `${hour} hour 00 min`
        }
        if (min < 10 && min > 1 && hour === 1) {
            return `${hour} hour 0${min} mins`
        }
        if (min === 1 && hour === 1) {
            return `${hour} hour 01 min`
        }
        if (min >= 10 && hour === 1) {
            return `${hour} hour ${min} mins`
        }
        if (hour > 1 && min > 1 && min < 10) {
            return `${hour} hours 0${min} mins`
        }
        if (hour > 1 && min === 0) {
            return `${hour} hours`
        }
        if (hour > 1 && min === 1) {
            return `${hour} hours 01 min`
        }
        if (hour === 0 && min < 10) {
            return `0${min} mins`
        }
        if (hour === 0 && min >= 10) {
            return `${min} mins`
        }
        if (hour === 0 && min === 1) {
            return `1 min`
        }
        return `${hour} hours ${min} mins`
    };

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
                        <img key={type.id} src={type.img} alt={type.id} width={40} height={40}/>
                        <p>{type.type}</p>
                    </div>
                ))}
            </div>
            {recipes && (Object.values(recipes).map(recipe =>
                <div key={recipe.id} className="recipe-card">
                    <NavLink to={`/recipes/${recipe.id}`}>
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
                        <p className="recipe-name">{recipe.name}</p>
                        <p className="recipe-descripiton">Serving: {recipe.serving}</p>
                        <div className="recipe-time">
                            <i className="far fa-clock"></i> {cooktimeLength(recipe.cooktime)}
                        </div>
                        <div className="types-list">
                            {recipe.types.map(type =>
                                <>
                                <Tooltip title={type.types} arrow>
                                    <img key={type.id} src={type.img} alt={type.types} height={26} width={26} className="recipe-type" />
                                </Tooltip>
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
                <div key={type.id} className="type-tile">
                    <img src={type.img} alt={type.id} width={40} height={40}/>
                    <p>{type.type}</p>
                </div>
            ))}
        </div>
        {recipes && (Object.values(recipes).map(recipe =>
            <div key={recipe.id} className="recipe-card">
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
                        <i className="far fa-clock"></i> {cooktimeLength(recipe.cooktime)}
                    </div>
                    <div className="types-list">
                        {recipe.types.map(type =>
                            <>
                            <Tooltip title={type.types} arrow>
                                <img key={type.id} src={type.img} alt={type.types} height={26} width={26} className="recipe-type" />
                            </Tooltip>
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
