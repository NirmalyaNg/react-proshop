import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  products: [],
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts(state, action) {
      state.products = action.payload;
    },
  },
});

export const fetchProducts = () => {
  return async (dispatch) => {
    const getAllProducts = async () => {
      const { data } = await axios.get('/api/products');
      return data.products;
    };

    try {
      const products = await getAllProducts();
      dispatch(productActions.setProducts(products));
    } catch (error) {
      console.log(error);
    }
  };
};

export const productActions = productsSlice.actions;
export default productsSlice.reducer;
