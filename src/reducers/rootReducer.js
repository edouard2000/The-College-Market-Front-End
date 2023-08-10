import { combineReducers } from "@reduxjs/toolkit";
import userReducer from "./userReducer";
import productReducer  from './productReducer'


const rootReducer = combineReducers({
    products : productReducer,
    user :  userReducer,
})

export default rootReducer;