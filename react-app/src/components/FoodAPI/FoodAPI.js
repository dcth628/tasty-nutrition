import React, { useState } from 'react';
import OpenModalButton from '../OpenModalButton';
import CreateIngredientFormModal from '../Ingredient/IngredientCreate/IngredientCreate';
import './FoodAPI.css'

function USDAFoodNutrition() {
    const [foodName, setFoodName] = useState('');
    const [nutritionInfo, setNutritionInfo] = useState('');
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const apiKey = 'S6E7mcmZT2YcPxTvQWcb3ZtC9ZPEskXqshYIO3sH'; // Replace with your USDA API key
            const response = await fetch(`https://api.nal.usda.gov/fdc/v1/foods/search?api_key=${apiKey}&query=${encodeURIComponent(foodName)}&dataType=SR%20Legacy`);
            const data = await response.json();

            if (data.foods && data.foods.length > 0) {
                const food = data.foods[0];
                const nutrients = food.foodNutrients;
                console.log(nutrients,'----nutrition')
                const nutritionData = {
                    calories: getNutrientValue(nutrients, 1008),
                    protein: getNutrientValue(nutrients, 1003),
                    carbohydrates: getNutrientValue(nutrients, 1005),
                    fat: getNutrientValue(nutrients, 1004)
                };
                setNutritionInfo(nutritionData);
                setError(null);
            } else {
                setNutritionInfo(null);
                setError(`No nutrition information found for ${foodName}`);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
            setNutritionInfo(null);
            setError('An error occurred while fetching data');
        }
    };

    const getNutrientValue = (nutrients, nutrientId) => {
        const nutrient = nutrients.find(nutrient => nutrient.nutrientId === nutrientId);
        return nutrient ? Math.abs(nutrient.value.toFixed(1)) : 'N/A';
    };
    return (
        <form onSubmit={handleSubmit}>
            <div className='search-form'>
                <h2>USDA Food Nutrition</h2>
                <label htmlFor="foodName">Enter Food Name:</label>
                <div className="input-group">
                    <input
                        type="text"
                        id="foodName"
                        value={foodName}
                        onChange={(e) => setFoodName(e.target.value)}
                        required
                    />
                    <label>Food Name</label>
                </div>
                <button className='confrim-buttons' type="submit">Get Nutrition</button>
                {/* <div>
                        <h3>Nutrition for {foodName} per 100 g</h3>
                        <p>Calories: {nutritionInfo.calories} kcal</p>
                        <p>Protein: {nutritionInfo.protein} g</p>
                        <p>Carbs: {nutritionInfo.carbohydrates} g</p>
                        <p>Fats: {nutritionInfo.fat} g</p>
                        <span>
                            <OpenModalButton
                                buttonText="CREATE INGREDIENT"
                                modalComponent={<CreateIngredientFormModal nutritionInfo={nutritionInfo} foodName={foodName}/>}
                            />
                        </span>
                    </div> */}
                {nutritionInfo && (
                    <div>
                        <h3>Nutrition for {foodName} per 100 g</h3>
                        <p>Calories: {nutritionInfo.calories} kcal</p>
                        <p>Protein: {nutritionInfo.protein} g</p>
                        <p>Carbs: {nutritionInfo.carbohydrates} g</p>
                        <p>Fats: {nutritionInfo.fat} g</p>
                        <span>
                            <OpenModalButton
                                buttonText="CREATE INGREDIENT"
                                modalComponent={<CreateIngredientFormModal nutritionInfo={nutritionInfo} foodName={foodName}/>}
                            />
                        </span>
                    </div>
                )}
                {error && <p>{error}</p>}
            </div>
        </form>
    );
}

export default USDAFoodNutrition;
