import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import employeeService from "./employeeService";

const initialState = {
  employees: [],
  unemployed: [],
  isError: false,
  isErrorCreate: false,
  isErrorGet: false,
  isSuccess: false,
  isSuccessCreate: false,
  isSuccessAdd: false,
  isSuccessRemove: false,
  isSuccessGet: false,
  isLoading: false,
  isLoadingCreate: false,
  isLoadingGet: false,
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

// Remove employee from company
export const removeEmployee = createAsyncThunk(
  "empolyees/remove",
  async (employeeData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await employeeService.removeEmployee(employeeData, token);
    } catch (error) {
      const message = ( error.response && error.response.data
        && error.response.data.message) ||
        error.message || error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Add employee to the company
export const addEmployee = createAsyncThunk(
  "empolyees/add",
  async (employeeData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await employeeService.addEmployee(employeeData, token);
    } catch (error) {
      const message = ( error.response && error.response.data
        && error.response.data.message) ||
        error.message || error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get unemployed
export const getUnemployed = createAsyncThunk(
  "empolyees/unemployed",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await employeeService.getUnemployed(token);
    } catch (error) {
      const message = ( error.response && error.response.data
        && error.response.data.message) ||
        error.message || error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get unemployed
export const getEmployees = createAsyncThunk(
  "empolyees/getEmployees",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await employeeService.getEmployees(token);
    } catch (error) {
      const message = ( error.response && error.response.data
        && error.response.data.message) ||
        error.message || error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const employeeSlice = createSlice({
  name: "employees",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isLoadingCreate = false;
      state.isLoadingGet = false;
      state.isSuccess = false;
      state.isSuccessCreate = false;
      state.isSuccessAdd = false;
      state.isSuccessRemove = false;
      state.isSuccessGet = false;
      state.isError = false;
      state.isErrorCreate = false;
      state.isErrorGet = false;
      state.message = '';
      state.employees = [];
      state.unemployed = [];
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createEmployee.pending, (state) => {
        state.isLoadingCreate = true;
      })
      .addCase(createEmployee.fulfilled, (state, action) => {
        state.isLoadingCreate = false;
        state.isSuccessCreate = true;
        action.payload.company ? state.unemployed.push(action.payload) : state.employees.push(action.payload);
        state.message = action.payload.message;
      })
      .addCase(createEmployee.rejected, (state, action) => {
        state.isLoadingCreate = false;
        state.isErrorCreate = true;
        state.message = action.payload;
      })
      .addCase(removeEmployee.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(removeEmployee.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccessRemove = true;
        state.employees.push(action.payload.body);
        state.message = action.payload.message;
      })
      .addCase(removeEmployee.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(addEmployee.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addEmployee.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccessAdd = true;
        state.unemployed = state.unemployed.filter(employee => employee._id !== action.payload._id);
        state.message = action.payload.message;
      })
      .addCase(addEmployee.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getUnemployed.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUnemployed.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.unemployed = action.payload.unemployed;
        state.message = action.payload.message;
      })
      .addCase(getUnemployed.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getEmployees.pending, (state) => {
        state.isLoadingGet = true;
      })
      .addCase(getEmployees.fulfilled, (state, action) => {
        state.isLoadingGet = false;
        state.isSuccessGet = true;
        state.unemployed = action.payload.unemployed;
        state.employees = action.payload.employed;
        state.message = action.payload.message;
      })
      .addCase(getEmployees.rejected, (state, action) => {
        state.isLoadingGet = false;
        state.isErrorGet = true;
        state.message = action.payload;
      })
  }
});

export const { reset } = employeeSlice.actions;
export default employeeSlice.reducer;