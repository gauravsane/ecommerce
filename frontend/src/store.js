import { createStore,applyMiddleware, combineReducers  } from "redux";
import cartReducer from './reducers/index'
import { thunk } from "redux-thunk";
import dataReducer from "./Redux-toolkit/dataSlice";

const rootReducer = combineReducers({
    cart: cartReducer,
    getData: dataReducer
  });

const store = createStore(rootReducer,applyMiddleware(thunk));

export default store