import { combineReducers } from "@reduxjs/toolkit";
import serviceSlice from './services'
import serviceTypeSlice from "./serviceTypes";
import signalrSlice from "./signalrConnection";
import userSlice from './user'


const rootReducer = combineReducers({
    serviceType: serviceTypeSlice,
    service: serviceSlice,
    user: userSlice,
    signalrCon: signalrSlice
});

export default rootReducer;