import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import AllIngredients from "./components/Ingredient/IngredientAll/IngredientAll";
import IngredientDetail from "./components/Ingredient/IngredientDetail/IngredientDetail";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route path="/login" >
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route exact path="/ingredients">
            <AllIngredients />
          </Route>
          <Route path="/ingredients/:ingredientId">
            <IngredientDetail />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
