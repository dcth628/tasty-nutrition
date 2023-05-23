import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllIngredients } from "../../../store/ingredient";
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";
import DeleteIngredientModal from "../IngredientDelete/IngredientDelete";
import OpenModalButton from "../../OpenModalButton";


const AllIngredients = () => {
    const dispatch = useDispatch()
    const ingredients = useSelector(state=> state?.ingredient)

    useEffect(()=> {
        dispatch(getAllIngredients())
    }, [dispatch])

    let count = 0

    return (
        <>
        {Object.values(ingredients).map(ingredient =>
            <div key={ingredient.id}>
                <NavLink to={`/ingredients/${ingredient.id}`}>
                <h2>{count += 1}. {ingredient.name}</h2>
                <p>Type: {ingredient.type}</p>
                <img src={ingredient.img} alt={ingredient.name} height={90} width={90} />
                </NavLink>
                <OpenModalButton
                buttonText={'Delete Ingredient'}
                modalComponent={<DeleteIngredientModal ingredientId={ingredient.id} />} />
            </div>)}
        </>
    )
};

export default AllIngredients
