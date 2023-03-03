"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _reduxObservable = require("redux-observable");

var _shopDucks = require("../ducks/shopDucks");

var getProductEpic = function getProductEpic(action$, store, _ref) {
  var Observable = _ref.Observable;
  return action$.ofType("shopReducer/getProductRequest").mergeMap(function (action) {
    var url = "http://localhost:8000/shop/products";
    return Observable.ajax({
      method: "GET",
      url: url,
      headers: {
        "Content-Type": "application/json"
      }
    }).mergeMap(function (AjaxResponse) {
      var response = AjaxResponse.response;
      return Observable.of(_shopDucks.actions.getProductSuccess(response)); // Observable.empty();
    })["catch"](function (error) {
      return Observable.of(alert(error));
    });
  });
};

var getProductDetailEpic = function getProductDetailEpic(action$, store, _ref2) {
  var Observable = _ref2.Observable;
  return action$.ofType("shopReducer/getProductDetailRequest").mergeMap(function (action) {
    var productId = action.payload;
    var url = "http://localhost:8000/shop/product-details/".concat(productId);
    return Observable.ajax({
      method: "GET",
      url: url,
      headers: {
        "Content-Type": "application/json"
      }
    }).mergeMap(function (AjaxResponse) {
      var response = AjaxResponse.response;
      return Observable.of(_shopDucks.actions.getProductDetailSuccess(response));
    })["catch"](function (AjaxError) {
      var message = AjaxError.message;
      console.log('catch: ', message);
      return Observable.of(_shopDucks.actions.getProductDetailError({
        message: message
      }));
    });
  });
};

var cartEpic = function cartEpic(action$, store$, _ref3) {
  var Observable = _ref3.Observable;
  return action$.ofType("shopReducer/addToCartRequest", "shopReducer/deleteCartProductRequest").mergeMap(function (action) {
    var _action$payload = action.payload,
        productId = _action$payload.productId,
        type = _action$payload.type; // const {
    //   shopReducerState: { cartProduct },
    // } = store$.getState();
    // const {
    //   productData: { id: exestingCartProductId },
    // } = cartProduct[0];

    var url;

    if (type === "DELETE") {
      url = "http://localhost:8000/shop/cart-delete-item";
    } else {
      url = "http://localhost:8000/shop/add-cart";
    }

    return Observable.ajax({
      method: "POST",
      url: url,
      headers: {
        "Content-Type": "application/json"
      },
      body: {
        productId: productId
      }
    }).mergeMap(function (AjaxResponse) {
      var response = AjaxResponse.response;
      return Observable.of(_shopDucks.actions.getCartProductSuccess(response) // shopActions.getCartProductRequest()
      );
    })["catch"](function (AjaxError) {
      var message = AjaxError.message;
      return Observable.of(_shopDucks.actions.getProductDetailError({
        message: message
      }));
    });
  });
};

var getCartEpic = function getCartEpic(action$, store, _ref4) {
  var Observable = _ref4.Observable;
  return action$.ofType("shopReducer/getCartProductRequest").mergeMap(function (action) {
    var url = "http://localhost:8000/shop/cart";
    return Observable.ajax({
      method: "GET",
      url: url,
      headers: {
        "Content-Type": "application/json"
      }
    }).mergeMap(function (AjaxResponse) {
      var response = AjaxResponse.response;
      return Observable.of(_shopDucks.actions.getCartProductSuccess(response));
    })["catch"](function (AjaxError) {
      var message = AjaxError.message;
      return Observable.of(_shopDucks.actions.getProductDetailError({
        message: message
      }));
    });
  });
};

var _default = (0, _reduxObservable.combineEpics)(getProductEpic, getProductDetailEpic, cartEpic, getCartEpic);

exports["default"] = _default;