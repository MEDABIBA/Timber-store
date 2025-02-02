import { configureStore } from "@reduxjs/toolkit";
import timbers from "../components/timberList/timberSlice";
import types from "../components/listTypes/listTypesSlice";
const store = configureStore({
  reducer: { timbers, types },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  devTools: process.env.NODE_ENV !== "production",
});
export type RootState = ReturnType<typeof store.getState>;
export default store;
