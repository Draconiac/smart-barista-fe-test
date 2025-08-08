import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Dot{
    mynumber: number;
}

const initialState: number = 0;

const dotsSlice = createSlice({
    name: 'dots',
    initialState: initialState,
    reducers: {
        dotsIncreased(state, action: PayloadAction<Dot>) {
            return state + action.payload.mynumber;
        }
    }       
});

export const { dotsIncreased } = dotsSlice.actions;
export default dotsSlice.reducer;