import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isSignIn: false,
    langCode: 'en',
};

export const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        userSignInSet: (state, action) => {
            state.isSignIn = action.payload;
        },
        userLangCodeSet: (state, action) => {
            state.langCode = action.payload;
        },
    },
});

export const { userSignInSet, userLangCodeSet } = userSlice.actions;

export default userSlice.reducer;
