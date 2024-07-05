import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import generalSlice from "./generalSlice";

const reducers = combineReducers({
  general: generalSlice.reducer,
});

const store = configureStore({
  reducer: reducers,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
