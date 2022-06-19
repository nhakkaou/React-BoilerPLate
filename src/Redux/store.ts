import { configureStore } from "@reduxjs/toolkit";
import { UserReducer } from "./Reducers/User";

export const store = configureStore({
  reducer: {
    data: UserReducer,
  },
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
