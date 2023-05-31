import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { useSelector, useDispatch } from "react-redux";
import { getCookbookDetail } from "../../../store/cookbook";
import EditCookbookModal from "../CookbookEdit/CookbookEdit";
import OpenModalButton from "../../OpenModalButton";
import { getAllRecipes } from "../../../store/recipe";
import DeleteRecipeCookbookModal from "./RemoveRecipe";

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
        <div>
            <h1>{cookbook && (cookbook.name)}</h1>
            <OpenModalButton
                buttonText={'Edit Cookbook'}
                modalComponent={<EditCookbookModal cookbook={cookbook} />} />
            {recipeCookbook && (recipeCookbook.map(recipe => (
                <div>
                {recipe.images.map(image => (
                    <img src={image.image} alt={image.id} width={200} height={200} />
                ))}
                <h2>{recipe.name} by {recipe.username}</h2>
                <p>description: {recipe.description}</p>
                <p>serving: {recipe.serving}</p>
                <p>Cooktime: {recipe.cooktime}</p>
                {recipe.types.map(type => (
                    <>
                    <img src={type.img} alt={type.name} width={30} height={30}/>
                    <span>{type.types}</span>
                    </>
                ))}
                <OpenModalButton
                buttonText={'Remove Recipe'}
                modalComponent={<DeleteRecipeCookbookModal cookbookId={cookbookId} recipeId={recipe.id} />} />
                </div>
            )))}
        </div>
    )
};

export default CookbookDetail
