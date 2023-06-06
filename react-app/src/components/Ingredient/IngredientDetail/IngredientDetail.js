import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { useSelector, useDispatch } from "react-redux";
import { getIngredientDetail } from "../../../store/ingredient";
import OpenModalButton from '../../OpenModalButton'
import EditIngredientModal from "../IngredientEdit/IngredientEdit";
import './IngredientDetail.css'

const IngredientDetail = ({ ingredient }) => {
    const dispatch = useDispatch();
    const { ingredientId } = useParams()
    const ingredients = useSelector(state => state?.ingredient[ingredientId])

    useEffect(() => {
        dispatch(getIngredientDetail(ingredientId))
    }, [dispatch, ingredientId]);
    let inClassName = ""
    if (ingredient.type === "Fruit") {
        inClassName = "ingredient-circle fruit"
    } else if (ingredient.type === 'Vegetable') {
        inClassName = "ingredient-circle vegetable"
    } else if (ingredient.type === 'Grains') {
        inClassName = "ingredient-circle grains"
    } else if (ingredient.type === 'Protein') {
        inClassName = "ingredient-circle protein"
    } else if (ingredient.type === 'Dairy') {
        inClassName = "ingredient-circle dairy"
    }

    return (
        <div className="ingredient-card">
            {
                ingredient && (
                    <div>
                        <div className="ingredient-header">
                            <h3 className={inClassName}>{ingredient.type[0]}</h3>
                            <h2>{ingredient.name}</h2>
                            <OpenModalButton
                                buttonText={'EDIT INGREDIENT'}
                                modalComponent={<EditIngredientModal ingredient={ingredient} />} />
                        </div>
                        <div className="ingredient-details">
                        <div className="ingredient-image-box">
                            <img src={ingredient.img} alt={ingredient.name} className="recipe-card-image" />
                        </div>
                        <div className="nutrition-facts">
                            <p>Weight: {ingredient.measurement}g</p>
                            <p>Calories: {ingredient.calorie}</p>
                            <p>Carbs: {ingredient.carb}g</p>
                            <p>Protein: {ingredient.protein}g</p>
                            <p>Fats: {ingredient.fat}g</p>
                        </div>
                        </div>
                    </div>
                )}
        </div>
    )
};

export default IngredientDetail
