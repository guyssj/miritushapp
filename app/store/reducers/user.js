import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isSignIn: false
}
export const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        userSignInSet: (state, action) => {
            state.isSignIn = action.payload;
        },
    }
});

export const { userSignInSet } = userSlice.actions;

export default userSlice.reducer;