import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import companyService from "./companyService";

const initialState = {
  companies: [],
  currentCompany: {},
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: ''
}

// Create new company
export const createCompany = createAsyncThunk(
  "companies/create",
  async (companyData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await companyService.createCompany(companyData, token);
    } catch (error) {
      const message = ( error.response && error.response.data
        && error.response.data.message) ||
        error.message || error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get one company
export const getCompany = createAsyncThunk(
  "companies/get",
  async (id, thunkAPI) => {
    try {
      return await companyService.getCompany(id);
    } catch (error) {
      const message = ( error.response && error.response.data
        && error.response.data.message) ||
        error.message || error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get companies
export const getCompanies = createAsyncThunk(
  "companies/getAll",
  async (company, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await companyService.getCompanies(token);
    } catch (error) {
      const message = ( error.response && error.response.data
        && error.response.data.message) ||
        error.message || error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Delete a company
export const deleteCompany = createAsyncThunk(
  "companies/delete",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await companyService.deleteCompany(id, token);
    } catch (error) {
      const message = ( error.response && error.response.data
        && error.response.data.message) ||
        error.message || error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const companySlice = createSlice({
  name: "companies",
  initialState,
  reducers: {
    reset: (state) => initialState
  },
  extraReducers: (builder) => {
    builder
      .addCase(createCompany.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createCompany.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.companies.owned.push(action.payload.body);
        state.message = action.payload.message;
      })
      .addCase(createCompany.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getCompanies.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCompanies.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.companies = action.payload;
      })
      .addCase(getCompanies.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteCompany.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteCompany.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.companies.owned = state.companies.owned.filter(company => company._id !== action.payload.id);
      })
      .addCase(deleteCompany.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getCompany.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCompany.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.currentCompany = action.payload.body;
      })
      .addCase(getCompany.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.currentCompany = {};
        state.message = action.payload;
      })
  }
});

export const { reset } = companySlice.actions;
export default companySlice.reducer;