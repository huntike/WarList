import { createSlice } from '@reduxjs/toolkit';

export const listsSlice = createSlice({
    name: 'lists',
    initialState: {
        value: [],
    },
    reducers: {
        update: (state, action) => {
            state.value = action.payload;
        },
    },
});

export const { update } = listsSlice.actions;

export const selectLists = state => state.lists.value;
export const listsReducer = listsSlice.reducer;