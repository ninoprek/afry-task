import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice"
import companyReducer from "../features/company/companySlice"
import employeeReducer from "../features/employee/employeeSlice"

export const store = configureStore({
  reducer: {
    auth: authReducer,
    company: companyReducer,
    employee: employeeReducer
  },
});
