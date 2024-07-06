import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    connection: {}
}
export const signalrSlice = createSlice({
    name: 'signalr',
    initialState,
    reducers: {
        setConnection: (state, action) => {
            state.connection = action.payload;
        },
    }
});

export const { setConnection } = signalrSlice.actions;

export default signalrSlice.reducer;