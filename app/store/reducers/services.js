import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
    serviceList: [],
    selectedService: 0
}
export const serviceSlice = createSlice({
    name: 'services',
    initialState,
    reducers: {
        serviceListSet: (state, action) => {
            state.serviceList = action.payload;
        },
        serviceSet: (state, action) => {
            state.selectedService = action.payload
        }
    }
});

export const { serviceListSet, serviceSet } = serviceSlice.actions;

export default serviceSlice.reducer;