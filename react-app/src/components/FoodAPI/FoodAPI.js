import React, { useState } from 'react';

function USDAFoodNutrition() {
  const [foodName, setFoodName] = useState('');
  const [nutritionInfo, setNutritionInfo] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const apiKey = 'S6E7mcmZT2YcPxTvQWcb3ZtC9ZPEskXqshYIO3sH'; // Replace with your USDA API key
      const response = await fetch(`https://api.nal.usda.gov/fdc/v1/foods/search?api_key=${apiKey}&query=${encodeURIComponent(foodName)}&dataType=Foundation`);
      const data = await response.json();
      const convertKJtoKcal = (kJ) => {
        // Conversion factor: 1 kJ = 0.239006 kcal
        return (kJ * 0.239006).toFixed(2);
      };
      if (data.foods && data.foods.length > 0) {
        const food = data.foods[0];
        const nutrients = food.foodNutrients;
        const nutritionData = {
          calories: getNutrientValue(nutrients, 'Energy (Atwater General Factors)'),
          protein: getNutrientValue(nutrients, 'Protein'),
          carbohydrates: getNutrientValue(nutrients, 'Carbohydrate, by difference'),
          fat: getNutrientValue(nutrients, 'Total lipid (fat)')
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

  const getNutrientValue = (nutrients, name) => {
    const nutrient = nutrients.find(nutrient => nutrient.nutrientName === name);
    return nutrient ? Math.abs(nutrient.value.toFixed(1)) : 'N/A';
  };

  return (
    <div>
        <h1>test</h1>
        <h1>test</h1>
      <h2>USDA Food Nutrition</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="foodName">Enter Food Name:</label>
        <input
          type="text"
          id="foodName"
          value={foodName}
          onChange={(e) => setFoodName(e.target.value)}
          required
        />
        <button type="submit">Get Nutrition</button>
      </form>
      {nutritionInfo && (
        <div>
          <h3>Nutrition Information for {foodName}</h3>
          <p>Calories: {nutritionInfo.calories} kcal</p>
          <p>Protein: {nutritionInfo.protein} g</p>
          <p>Carbohydrates: {nutritionInfo.carbohydrates} g</p>
          <p>Fat: {nutritionInfo.fat} g</p>
        </div>
      )}
      {error && <p>{error}</p>}
    </div>
  );
}

export default USDAFoodNutrition;
