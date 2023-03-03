/* eslint-disable no-lone-blocks */
/* eslint-disable default-case */

import { createSlice } from "@reduxjs/toolkit";
import update from "immutability-helper";

export const { actions, reducer } = createSlice({
  name: "adminReducer",
  initialState: {
    loading: false,
    formData: null,
    pageTitle: null,
    product: [],
  },
  reducers: {
    addProductRequest: (state) => {
      state.loading = false;
    },
    addProductSuccess: (state) => {
      state.loading = false;
    },
    getProductRequest: (state) => {
      state.loading = true;
    },
    getProductSuccess: (state, { payload: response }) => {
      const { products, pageTitle, editing, path } = response;
      return update(state, {
        product: {
          productData: { $set: products },
          pageTitle: { $set: pageTitle },
          editing: { $set: editing },
          path: { $set: path },
        },
        loading: { $set: false },
      });
    },
    getEditProductRequest: (state) => {
      state.loading = true;
    },
    getEditProductSuccess: (
      state,
      {
        payload: {
          response: { products, pageTitle, editing, path },
        },
      }
    ) => {
      return update(state, {
        product: {
          productData: { $set: products },
          pageTitle: { $set: pageTitle },
          editing: { $set: editing },
          path: { $set: path },
        },
        loading: { $set: false },
      });
    },
    getProductError: (state, { payload: message }) => {
      console.log("Error in action agaya: ", message);
      state.loading = false;
    },
    updateProductRequest: (state) => {
      state.loading = true;
    },
    updateProductSuccess: (
      state,
      {
        payload: {
          response: { path },
        },
      }
    ) => {
      return update(state, {
        loading: { $set: false },
      });
    },
    updateProductError: (state, { payload: message }) => {
      console.log("Error in action agaya: ", message);
      state.loading = false;
    },
    deleteProduct: (state) => {
      state.loading = true;
    },
    deleteProductSuccess: (state, { payload: message }) => {
      return update(state, {
        product: {
          message: { $set: message },
        },
        loading: { $set: false },
      });
    },
  },
});
