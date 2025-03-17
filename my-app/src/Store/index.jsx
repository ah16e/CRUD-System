import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./LoginSlice";
import registerReducer from "./RegisterSlice";
import employeeReducer from "./EmployeeSlice"; 

const store = configureStore({
  reducer: {
    user: userReducer,
    register: registerReducer,
    employee: employeeReducer, 
  },
});

export default store;
