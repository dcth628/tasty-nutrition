import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import session from './session'
import ingredientReducer from './ingredient';
import recipeReducer from './recipe';
import typeReducer from './type';
import imageReducer from './image';
import cookbookReducer from './cookbook';

const rootReducer = combineReducers({
  session,
  ingredient: ingredientReducer,
  recipe: recipeReducer,
  type: typeReducer,
  image: imageReducer,
  cookbook: cookbookReducer
});


let enhancer;

if (process.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require('redux-logger').default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
