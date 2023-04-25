import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
    serviceTypeList: [],
    selectedServiceType: 0
}
export const serviceTypeSlice = createSlice({
    name: 'serviceTypes',
    initialState,
    reducers: {
        serviceTypeListSet: (state, action) => {
            state.serviceTypeList = action.payload;
        },
        serviceTypeSet: (state, action) => {
            state.selectedServiceType = action.payload
        }
    }
});

export const { serviceTypeListSet, serviceTypeSet } = serviceTypeSlice.actions;

export default serviceTypeSlice.reducer;