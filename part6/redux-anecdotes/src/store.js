import anecdoteReducer from './reducers/anecdoteReducer'
import filterReducer from "./reducers/filterReducer.js";
import notificationReducer from './reducers/notificationReducer.js'
import {configureStore} from "@reduxjs/toolkit";

export const store = configureStore(
    {
        reducer : {
            anecdotes: anecdoteReducer,
            filter: filterReducer,
            notification: notificationReducer
        },
        devTools:true
    })