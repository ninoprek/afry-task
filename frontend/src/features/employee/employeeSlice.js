import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import employeeService from "./employeeService";

const initialState = {
  employees: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: ''
}

// Create new employee
export const createEmployee = createAsyncThunk(
  "empolyees/create",
  async (employeeData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await employeeService.createEmployee(employeeData, token);
    } catch (error) {
      const message = ( error.response && error.response.data
        && error.response.data.message) ||
        error.message || error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const companySlice = createSlice({
  name: "employees",
  initialState,
  reducers: {
    reset: (state) => initialState
  },
  extraReducers: (builder) => {
    builder
      .addCase(createEmployee.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createEmployee.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.employees.push(action.payload.body);
        state.message = action.payload.message;
      })
      .addCase(createEmployee.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
  }
});

export const { reset } = companySlice.actions;
export default companySlice.reducer;