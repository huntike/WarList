import { createSlice } from '@reduxjs/toolkit';

export const commentsSlice = createSlice({
    name: 'comments',
    initialState: {
        value: [],
    },
    reducers: {
        updatecomment: (state, action) => {
            state.value = action.payload;
        },
    },
});

export const { updatecomment } = commentsSlice.actions;

export const selectComments = state => state.comments.value;
export const commentsReducer = commentsSlice.reducer;