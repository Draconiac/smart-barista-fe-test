import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface TestSlice {
  areaName: string;
}

const initialState: TestSlice[] = [];

const testSlice = createSlice({
  name: "test",
  initialState: initialState,
  reducers: {
    defineArea(state, action: PayloadAction<TestSlice>) {
      state.push(action.payload);
    },
  },
});

export const { defineArea } = testSlice.actions;
export default testSlice.reducer;
