import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface TableSlice {
  tables: Record<string, string[]>;
}

export interface TablePayload {
  areaName: string;
  tableName: string[];
}

const initialStateTable: TableSlice = {
  tables: {},
};

const tableSlice = createSlice({
  name: "table",
  initialState: initialStateTable,
  reducers: {
    defineTable(state, action: PayloadAction<TablePayload>) {
      state.tables[action.payload.areaName] = action.payload.tableName; 
    },
  },
});

export const { defineTable } = tableSlice.actions;
export default tableSlice.reducer;
