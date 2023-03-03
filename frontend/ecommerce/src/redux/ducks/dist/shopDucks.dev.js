"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.reducer = exports.actions = void 0;

var _toolkit = require("@reduxjs/toolkit");

var _immutabilityHelper = _interopRequireDefault(require("immutability-helper"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _createSlice = (0, _toolkit.createSlice)({
  name: "shopReducer",
  initialState: {
    loading: false,
    productTitle: "",
    productData: [],
    pageTitle: null,
    cart: []
  },
  reducers: {
    getProductRequest: function getProductRequest(state) {
      state.loading = true;
    },
    getProductSuccess: function getProductSuccess(state, _ref) {
      var response = _ref.payload;
      var products = response.products,
          pageTitle = response.pageTitle;
      state.loading = false;
      state.productData = products;
      state.pageTitle = pageTitle;
    },
    getProductDetailRequest: function getProductDetailRequest(state) {
      state.loading = true;
    },
    getProductDetailSuccess: function getProductDetailSuccess(state, _ref2) {
      var response = _ref2.payload;
      var products = response.products,
          pageTitle = response.pageTitle;
      return (0, _immutabilityHelper["default"])(state, {
        productData: {
          $set: products
        },
        pageTitle: {
          $set: pageTitle
        },
        loading: {
          $set: false
        }
      });
    },
    getProductDetailError: function getProductDetailError(state, _ref3) {
      var message = _ref3.payload.message;
      console.log("error: ", message);
    },
    addToCartRequest: function addToCartRequest(state) {
      state.loading = true;
    },
    addToCartSuccess: function addToCartSuccess(state, _ref4) {
      var message = _ref4.payload.response.message;
      return (0, _immutabilityHelper["default"])(state, {
        loading: {
          $set: false
        },
        cartProduct: {
          $set: message
        }
      });
    },
    addToCartError: function addToCartError(state, _ref5) {
      var message = _ref5.payload.message;
      state.loading = false;
      console.log(message);
    },
    getCartProductRequest: function getCartProductRequest(state) {
      state.loading = true;
    },
    getCartProductSuccess: function getCartProductSuccess(state, _ref6) {
      var response = _ref6.payload;
      return (0, _immutabilityHelper["default"])(state, {
        loading: {
          $set: false
        },
        cart: {
          $set: response
        }
      });
    },
    getCartProductError: function getCartProductError(state, _ref7) {
      var message = _ref7.payload.message;
      state.loading = false;
      console.log(message);
    },
    deleteCartProductRequest: function deleteCartProductRequest(state) {
      state.loading = true;
    },
    deleteCartProductSuccess: function deleteCartProductSuccess(state) {
      state.loading = false;
    },
    resetReducers: function resetReducers(state) {
      return (0, _immutabilityHelper["default"])(state, _objectSpread({}, state.initialState));
    }
  }
}),
    actions = _createSlice.actions,
    reducer = _createSlice.reducer;

exports.reducer = reducer;
exports.actions = actions;