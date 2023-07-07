import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { useSelector, useDispatch } from "react-redux";
import { getCookbookDetail } from "../../../store/cookbook";
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";
import EditCookbookModal from "../CookbookEdit/CookbookEdit";
import OpenModalButton from "../../OpenModalButton";
import { getAllRecipes } from "../../../store/recipe";
import Tooltip from '@mui/material/Tooltip';
import './CookbookDetail.css'

const CookbookDetail = () => {
    const dispatch = useDispatch();
    const { cookbookId } = useParams();
    const cookbook = useSelector(state => state?.cookbook[cookbookId]);
    const sessionUser = useSelector(state=> state?.session.user)
    const recipes = useSelector(state => state?.recipe)
    let recipeCookbook = []
    if (cookbook) {
        recipeCookbook = Object.values(cookbook)[2]
    };

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
        dispatch(getCookbookDetail(cookbookId))
        dispatch(getAllRecipes())
    }, [dispatch, cookbookId]);

    return (
        sessionUser ? (<div className="cookbook-page">
            <div className="cookbook-detail-header">
                <h1>{cookbook && (cookbook.name)}</h1>
                <div className="edit-button">
                    {cookbook && cookbook.user_id === sessionUser.id ?
                     (<OpenModalButton
                        buttonText={'EDIT COOKBOOK'}
                        modalComponent={<EditCookbookModal cookbook={cookbook} />} />)
                    : <></>}
                </div>
            </div>
            {recipeCookbook && recipeCookbook.length > 0 ? (recipeCookbook.map(recipe =>
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
                            <i className="far fa-clock"></i> {cooktimeLength(recipe.cooktime)}
                        </div>
                        <div>
                            {recipe.types.map(type =>
                                <>
                                <Tooltip title={type.types} arrow>
                                    <img src={type.img} alt={type.types} height={26} width={26} className="recipe-type" />
                                </Tooltip>
                                </>
                            )}
                        </div>
                        <div>
                        </div>
                    </NavLink>
                    {/* {sessionUser.id == recipe.user_id ? (
                        <OpenModalButton
                            buttonText={'Delete Recipe'}
                            modalComponent={<DeleteRecipeModal recipeId={recipe.id} />} />
                    ) : <></>} */}
                </div>)):
                <p className="no-recipe">No Recipe In This Cookbook</p>
                }
        </div>)
        :
        (<div className="cookbook-page">
            <div className="cookbook-detail-header">
                <h1>{cookbook && (cookbook.name)}</h1>
            </div>
            {recipeCookbook && recipeCookbook.length > 0 ? (recipeCookbook.map(recipe =>
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
                            <i className="far fa-clock"></i> {cooktimeLength(recipe.cooktime)}
                        </div>
                        <div>
                            {recipe.types.map(type =>
                                <>
                                <Tooltip title={type.types} arrow>
                                    <img src={type.img} alt={type.types} height={26} width={26} className="recipe-type" />
                                </Tooltip>
                                </>
                            )}
                        </div>
                        <div>
                        </div>
                    </NavLink>
                    {/* {sessionUser.id == recipe.user_id ? (
                        <OpenModalButton
                            buttonText={'Delete Recipe'}
                            modalComponent={<DeleteRecipeModal recipeId={recipe.id} />} />
                    ) : <></>} */}
                </div>)):
                <p className="no-recipe">No Recipe In This Cookbook</p>
                }
        </div>)
    )
};

export default CookbookDetail
