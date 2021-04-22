import { createSlice } from '@reduxjs/toolkit';

export const socketSlice = createSlice({
    name: 'socket',
    initialState: {
        value: {},
    },
    reducers: {
        update: (state, action) => {
            state.value = action.payload;
        },
    },
});

export const { updateSocket } = socketSlice.actions;

export const selectSocket = state => state.socket.value;
export const socketReducer = socketSlice.reducer;