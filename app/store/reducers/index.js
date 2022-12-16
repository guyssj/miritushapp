import { combineReducers } from "@reduxjs/toolkit";
import serviceSlice from './services'
import userSlice from './user'


const rootReducer = combineReducers({
    service: serviceSlice,
    user: userSlice
});

export default rootReducer;