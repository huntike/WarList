import { createSlice } from '@reduxjs/toolkit';

export const likesSlice = createSlice({
    name: 'likes',
    initialState: {
        value: [],
    },
    reducers: {
        updateLikes: (state, action) => {
            state.value = action.payload;
        },
    },
});

export const { updateLikes } = likesSlice.actions;

export const selectLikes = state => state.likes.value;
export const likesReducer = likesSlice.reducer;