import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllIngredients } from "../../../store/ingredient";
import DeleteIngredientModal from "../IngredientDelete/IngredientDelete";
import IngredientDetail from "../IngredientDetail/IngredientDetail";
import OpenModalButton from "../../OpenModalButton";
import './IngredientAll.css'


const AllIngredients = () => {
    const dispatch = useDispatch()
    const sessionUser = useSelector((state) => state?.session.user);
    const ingredients = useSelector(state => state?.ingredient)
    const fruits = Object.values(ingredients).filter(ingredient => ingredient.type === "Fruit")
    const proteins = Object.values(ingredients).filter(ingredient => ingredient.type === "Protein")
    const vegetables = Object.values(ingredients).filter(ingredient => ingredient.type === "Vegetable")
    const grains = Object.values(ingredients).filter(ingredient => ingredient.type === "Grains")
    const dairy = Object.values(ingredients).filter(ingredient => ingredient.type === "Dairy")
    const other = Object.values(ingredients).filter(ingredient => ingredient.type === "Other")
    useEffect(() => {
        dispatch(getAllIngredients())
    }, [dispatch])

    return (
        sessionUser ? (<div className="ingredient-page">
            <div className="ingredient-title">
                <h3 className="ingredient-circle fruit">F</h3>
                <h3>Fruits</h3>
            </div>
            <div className="ingredient-list">
                {fruits.map(fruit => (
                    <div className="ingredients">
                        {/* <NavLink to={`/ingredients/${fruit.id}`}>
                            <p className="ingredient-name">{fruit.name}</p>
                        </NavLink> */}
                        <OpenModalButton
                        buttonText={fruit.name}
                        modalComponent={<IngredientDetail ingredient={fruit}/>} />
                        <OpenModalButton
                        buttonText={'Delete Ingredient'}
                        modalComponent={<DeleteIngredientModal ingredientId={fruit.id}/>} />
                    </div>
                ))}
            </div>
            <div className="ingredient-title">
                <h3 className="ingredient-circle vegetable">V</h3>
                <h3>Vegetables</h3>
            </div>
            <div className="ingredient-list">
                {vegetables.map(vegetable => (
                    <div className="ingredients">
                    <OpenModalButton
                        buttonText={vegetable.name}
                        modalComponent={<IngredientDetail ingredient={vegetable}/>} />
                    <OpenModalButton
                        buttonText={'Delete Ingredient'}
                        modalComponent={<DeleteIngredientModal ingredientId={vegetable.id}/>} />
                    </div>
                ))}
            </div>
            <div className="ingredient-title">
                <h3 className="ingredient-circle grains">G</h3>
                <h3>Grains</h3>
            </div>
            <div className="ingredient-list">
                {grains.map(grain => (
                    <div className="ingredients">
                    <OpenModalButton
                        buttonText={grain.name}
                        modalComponent={<IngredientDetail ingredient={grain}/>} />
                    <OpenModalButton
                        buttonText={'Delete Ingredient'}
                        modalComponent={<DeleteIngredientModal ingredientId={grain.id}/>} />
                    </div>
                ))}
            </div>
            <div className="ingredient-title">
                <h3 className="ingredient-circle protein">P</h3>
                <h3>Protein</h3>
            </div>
            <div className="ingredient-list">
                {proteins.map(protein => (
                    <div className="ingredients">
                    <OpenModalButton
                        buttonText={protein.name}
                        modalComponent={<IngredientDetail ingredient={protein}/>} />
                    <OpenModalButton
                        buttonText={'Delete Ingredient'}
                        modalComponent={<DeleteIngredientModal ingredientId={protein.id}/>} />
                    </div>
                ))}
            </div>
            <div className="ingredient-title">
                <h3 className="ingredient-circle dairy">D</h3>
                <h3>Dairy</h3>
            </div>
            <div className="ingredient-list">
                {dairy.map(dairy => (
                    <div className="ingredients">
                    <OpenModalButton
                        buttonText={dairy.name}
                        modalComponent={<IngredientDetail ingredient={dairy}/>} />
                    <OpenModalButton
                        buttonText={'Delete Ingredient'}
                        modalComponent={<DeleteIngredientModal ingredientId={dairy.id}/>} />
                    </div>
                ))}
            </div>
            <div className="ingredient-title">
                <h3 className="ingredient-circle other">O</h3>
                <h3>Others</h3>
            </div>
            <div className="ingredient-list">
                {other.map(other => (
                    <div className="ingredients">
                    <OpenModalButton
                        buttonText={other.name}
                        modalComponent={<IngredientDetail ingredient={other}/>} />
                    <OpenModalButton
                        buttonText={'Delete Ingredient'}
                        modalComponent={<DeleteIngredientModal ingredientId={other.id}/>} />
                    </div>
                ))}
            </div>
        </div>)
        :
        (<div className="ingredient-page">
            <div className="ingredient-title">
                <h3 className="ingredient-circle fruit">F</h3>
                <h3>Fruit</h3>
            </div>
            <div className="ingredient-list">
                {fruits.map(fruit => (
                    <div className="ingredients">
                        <OpenModalButton
                        buttonText={fruit.name}
                        modalComponent={<IngredientDetail ingredient={fruit}/>} />
                    </div>
                ))}
            </div>
            <div className="ingredient-title">
                <h3 className="ingredient-circle vegetable">V</h3>
                <h3>Vegetable</h3>
            </div>
            <div className="ingredient-list">
                {vegetables.map(vegetable => (
                    <div className="ingredients">
                    <OpenModalButton
                        buttonText={vegetable.name}
                        modalComponent={<IngredientDetail ingredient={vegetable}/>} />
                    </div>
                ))}
            </div>
            <div className="ingredient-title">
                <h3 className="ingredient-circle grains">G</h3>
                <h3>Grains</h3>
            </div>
            <div className="ingredient-list">
                {grains.map(grain => (
                    <div className="ingredients">
                    <OpenModalButton
                        buttonText={grain.name}
                        modalComponent={<IngredientDetail ingredient={grain}/>} />
                    </div>
                ))}
            </div>
            <div className="ingredient-title">
                <h3 className="ingredient-circle protein">P</h3>
                <h3>Protein</h3>
            </div>
            <div className="ingredient-list">
                {proteins.map(protein => (
                    <div className="ingredients">
                    <OpenModalButton
                        buttonText={protein.name}
                        modalComponent={<IngredientDetail ingredient={protein}/>} />
                    </div>
                ))}
            </div>
            <div className="ingredient-title">
                <h3 className="ingredient-circle dairy">D</h3>
                <h3>Dairy</h3>
            </div>
            <div className="ingredient-list">
                {dairy.map(dairy => (
                    <div className="ingredients">
                    <OpenModalButton
                        buttonText={dairy.name}
                        modalComponent={<IngredientDetail ingredient={dairy}/>} />
                    </div>
                ))}
            </div>
        </div>)
    )
};

export default AllIngredients
