"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.reducer = exports.actions = void 0;

var _toolkit = require("@reduxjs/toolkit");

var _immutabilityHelper = _interopRequireDefault(require("immutability-helper"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/* eslint-disable no-lone-blocks */

/* eslint-disable default-case */
var _createSlice = (0, _toolkit.createSlice)({
  name: "adminReducer",
  initialState: {
    loading: false,
    formData: null,
    pageTitle: null,
    product: []
  },
  reducers: {
    addProductRequest: function addProductRequest(state) {
      state.loading = false;
    },
    addProductSuccess: function addProductSuccess(state) {
      state.loading = false;
    },
    getProductRequest: function getProductRequest(state) {
      state.loading = true;
    },
    getProductSuccess: function getProductSuccess(state, _ref) {
      var response = _ref.payload;
      var products = response.products,
          pageTitle = response.pageTitle,
          editing = response.editing,
          path = response.path;
      return (0, _immutabilityHelper["default"])(state, {
        product: {
          productData: {
            $set: products
          },
          pageTitle: {
            $set: pageTitle
          },
          editing: {
            $set: editing
          },
          path: {
            $set: path
          }
        },
        loading: {
          $set: false
        }
      });
    },
    getEditProductRequest: function getEditProductRequest(state) {
      state.loading = true;
    },
    getEditProductSuccess: function getEditProductSuccess(state, _ref2) {
      var _ref2$payload$respons = _ref2.payload.response,
          products = _ref2$payload$respons.products,
          pageTitle = _ref2$payload$respons.pageTitle,
          editing = _ref2$payload$respons.editing,
          path = _ref2$payload$respons.path;
      return (0, _immutabilityHelper["default"])(state, {
        product: {
          productData: {
            $set: products
          },
          pageTitle: {
            $set: pageTitle
          },
          editing: {
            $set: editing
          },
          path: {
            $set: path
          }
        },
        loading: {
          $set: false
        }
      });
    },
    getProductError: function getProductError(state, _ref3) {
      var message = _ref3.payload;
      console.log("Error in action agaya: ", message);
      state.loading = false;
    },
    updateProductRequest: function updateProductRequest(state) {
      state.loading = true;
    },
    updateProductSuccess: function updateProductSuccess(state, _ref4) {
      var path = _ref4.payload.response.path;
      return (0, _immutabilityHelper["default"])(state, {
        loading: {
          $set: false
        }
      });
    },
    updateProductError: function updateProductError(state, _ref5) {
      var message = _ref5.payload;
      console.log("Error in action agaya: ", message);
      state.loading = false;
    },
    deleteProduct: function deleteProduct(state) {
      state.loading = true;
    },
    deleteProductSuccess: function deleteProductSuccess(state, _ref6) {
      var message = _ref6.payload;
      return (0, _immutabilityHelper["default"])(state, {
        product: {
          message: {
            $set: message
          }
        },
        loading: {
          $set: false
        }
      });
    }
  }
}),
    actions = _createSlice.actions,
    reducer = _createSlice.reducer;

exports.reducer = reducer;
exports.actions = actions;