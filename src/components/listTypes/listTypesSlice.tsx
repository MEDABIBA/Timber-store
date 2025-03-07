import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IInitialStateTypes } from "../../types/timbers";

const initialState: IInitialStateTypes = {
  type: "all types",
};
const listTypesSlice = createSlice({
  name: "listTypes",
  initialState,
  reducers: {
    filterAdd: (state, action: PayloadAction<IInitialStateTypes["type"]>) => {
      state.type = action.payload;
    },
  },
});
const { actions, reducer } = listTypesSlice;
export default reducer;
export const { filterAdd } = actions;
