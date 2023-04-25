import { combineReducers } from "@reduxjs/toolkit";
import serviceSlice from './services'
import serviceTypeSlice from "./serviceTypes";
import userSlice from './user'


const rootReducer = combineReducers({
    serviceType: serviceTypeSlice,
    service: serviceSlice,
    user: userSlice
});

export default rootReducer;