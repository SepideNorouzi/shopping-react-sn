import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/config";

const initialState = {
  loading: false,
  products: [],
  error: "",
};

// createAsyncThunk: A function for handling asynchronous operations, 
// like API calls, in a standardized way.
const fetchProducts = createAsyncThunk("product/fetchProducts", () => {
  return api.get("/products");
});
// This creates an async thunk named fetchProducts.

// createSlice: A function that simplifies creating Redux reducers and actions.
// It automatically generates action creators and action types based on the reducers you define
const productsSlice = createSlice({
  name: "product",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.loading = false;
      state.products = action.payload;
      //  The data returned from the API is available in action.payload. 
      // This line updates the products array in our state with that data.
      state.error = "";
    });
    builder.addCase(fetchProducts.rejected, (state, action) => {
      state.loading = false;
      state.products = [];
      state.error = action.error.message;
    });
  },
});

export default productsSlice.reducer;
export { fetchProducts };
