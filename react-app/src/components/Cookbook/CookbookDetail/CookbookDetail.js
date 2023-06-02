import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { useSelector, useDispatch } from "react-redux";
import { getCookbookDetail } from "../../../store/cookbook";
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";
import EditCookbookModal from "../CookbookEdit/CookbookEdit";
import OpenModalButton from "../../OpenModalButton";
import { getAllRecipes } from "../../../store/recipe";
import './CookbookDetail.css'

const CookbookDetail = () => {
    const dispatch = useDispatch();
    const { cookbookId } = useParams();
    const cookbook = useSelector(state => state?.cookbook[cookbookId]);
    const recipes = useSelector(state => state?.recipe)
    let recipeCookbook = []
    if (cookbook) {
        recipeCookbook = Object.values(cookbook)[2]
    }


    useEffect(() => {
        dispatch(getCookbookDetail(cookbookId))
        dispatch(getAllRecipes())
    }, [dispatch, cookbookId]);

    return (
        <div className="cookbook-page">
            <div className="cookbook-detail-header">
                <h1>{cookbook && (cookbook.name)}</h1>
                <div className="edit-button">
                    <OpenModalButton
                        buttonText={'EDIT COOKBOOK'}
                        modalComponent={<EditCookbookModal cookbook={cookbook} />} />
                </div>
            </div>
            {recipeCookbook && (recipeCookbook.map(recipe =>
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
                </div>))}
        </div>
    )
};

export default CookbookDetail
