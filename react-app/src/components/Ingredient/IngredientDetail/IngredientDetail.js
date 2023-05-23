import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { useSelector, useDispatch } from "react-redux";
import { getIngredientDetail } from "../../../store/ingredient";
import OpenModalButton from '../../OpenModalButton'
import EditIngredientModal from "../IngredientEdit/IngredientEdit";

const IngredientDetail = () => {
    const dispatch = useDispatch();
    const { ingredientId } = useParams()
    const ingredient = useSelector(state => state?.ingredient[ingredientId])

    useEffect(() => {
        dispatch(getIngredientDetail(ingredientId))
    }, [dispatch, ingredientId]);

    return (
        <div>
            {
            ingredient && (
                <>
            <h2>{ingredient.name}</h2>
            <p>Type: {ingredient.type}</p>
            <img src={ingredient.img} alt={ingredient.name} height={100} width={100} />
            <p>Quantity: {ingredient.measurement}g</p>
            <p>Calorie: {ingredient.calorie}</p>
            <p>Carb: {ingredient.carb}g</p>
            <p>Protein: {ingredient.protein}g</p>
            <p>Fat: {ingredient.fat}g</p>
            <OpenModalButton
                buttonText={'Edit Ingredient'}
                modalComponent={<EditIngredientModal ingredient={ingredient} />} />
                </>
            )}
        </div>
    )
};

export default IngredientDetail
