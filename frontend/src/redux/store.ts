import { configureStore } from "@reduxjs/toolkit";
// import protocolsReducer from "./features/ProtocolSlice";
import employeeReducer from './reducers/features/employee';
// import logger from "redux-logger";
import thunk from "redux-thunk";

export const store = configureStore({
  reducer: { employees: employeeReducer },
  middleware: [thunk],
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch