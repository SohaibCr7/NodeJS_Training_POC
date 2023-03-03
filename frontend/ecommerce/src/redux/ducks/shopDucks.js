/* eslint-disable no-lone-blocks */
/* eslint-disable default-case */

import { createSlice } from "@reduxjs/toolkit";
import update from "immutability-helper";

export const { actions, reducer } = createSlice({
  name: "shopReducer",
  initialState: {
    loading: false,
    productTitle: "",
    productData: [],
    pageTitle: null,
    cart: [],
  },
  reducers: {
    getProductRequest: (state) => {
      state.loading = true;
    },

    getProductSuccess: (state, { payload: response }) => {
      const { products, pageTitle } = response;
      state.loading = false;
      state.productData = products;
      state.pageTitle = pageTitle;
    },

    getProductDetailRequest: (state) => {
      state.loading = true;
    },

    getProductDetailSuccess: (state, { payload: response }) => {
      const { products, pageTitle } = response;
      return update(state, {
        productData: { $set: products },
        pageTitle: { $set: pageTitle },
        loading: { $set: false },
      });
    },

    getProductDetailError: (state, { payload: { message } }) => {
      console.log("error: ", message);
    },

    addToCartRequest: (state) => {
      state.loading = true;
    },

    addToCartSuccess: (
      state,
      {
        payload: {
          response: { message },
        },
      }
    ) => {
      return update(state, {
        loading: { $set: false },
        cartProduct: { $set: message },
      });
    },

    addToCartError: (state, { payload: { message } }) => {
      state.loading = false;
      console.log(message);
    },

    getCartProductRequest: (state) => {
      state.loading = true;
    },

    getCartProductSuccess: (state, { payload: response }) => {
      return update(state, {
        loading: { $set: false },
        cart: { $set: response },
      });
    },

    getCartProductError: (state, { payload: { message } }) => {
      state.loading = false;
      console.log(message);
    },

    deleteCartProductRequest: (state) => {
      state.loading = true;
    },

    deleteCartProductSuccess: (state) => {
      state.loading = false;
    },
    resetReducers: (state) => {
      return update(state, {
        ...state.initialState,
      });
    },
  },
});
