import React from "react";
import {createRoot} from 'react-dom/client'
import App from './components/App'
import { Provider } from "react-redux";
import rootReducer from "./reducers/rootReducer";
import { configureStore } from "@reduxjs/toolkit";


const store = configureStore({
    reducer: rootReducer,
})


const root = createRoot(document.getElementById('main'))
root.render(
    <Provider store = {store}>
        <App/>
    </Provider>
)