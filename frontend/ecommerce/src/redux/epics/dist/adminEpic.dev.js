"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _reduxObservable = require("redux-observable");

var _adminDucks = require("../ducks/adminDucks");

var addProductEpic = function addProductEpic(action$, store$, _ref) {
  var Observable = _ref.Observable;
  return action$.ofType("adminReducer/addProductRequest").mergeMap(function (action) {
    var formData = action.payload.formData; // const {
    //   adminProductState: { formData },
    // } = store$.getState();

    var url = "http://localhost:8000/admin/add-product";
    return Observable.ajax({
      method: "POST",
      url: url,
      headers: {
        "Content-Type": "application/json"
      },
      body: {
        product: formData
      }
    }).mergeMap(function (_ref2) {
      var message = _ref2.response.message;
      return Observable.of(_adminDucks.actions.addProductSuccess(), _adminDucks.actions.getProductRequest());
    })["catch"](function (error) {
      return Observable.of([]);
    });
  });
};

var getProductEpic = function getProductEpic(action$, store, _ref3) {
  var Observable = _ref3.Observable;
  return action$.ofType("adminReducer/getProductRequest").mergeMap(function (action) {
    var url = "http://localhost:8000/admin/products";
    return Observable.ajax({
      method: "GET",
      url: url,
      headers: {
        "Content-Type": "application/json"
      }
    }).mergeMap(function (AjaxResponse) {
      var response = AjaxResponse.response;
      return Observable.of(_adminDucks.actions.getProductSuccess(response)); // Observable.empty();
    })["catch"](function (AjaxError) {
      var message = AjaxError.message;
      return Observable.of(_adminDucks.actions.getProductError(message));
    });
  });
};

var getEditProductEpic = function getEditProductEpic(action$, store, _ref4) {
  var Observable = _ref4.Observable;
  return action$.ofType("adminReducer/getEditProductRequest").mergeMap(function (action) {
    var id = action.payload;
    var url = "http://localhost:8000/admin/edit-product/?".concat(id);
    return Observable.ajax({
      method: "GET",
      url: url,
      headers: {
        "Content-Type": "application/json"
      }
    }).mergeMap(function (AjaxResponse) {
      var response = AjaxResponse.response;
      return Observable.of(_adminDucks.actions.getEditProductSuccess({
        response: response
      }));
    })["catch"](function (AjaxError) {
      var message = AjaxError.message;
      return Observable.of(_adminDucks.actions.getProductError({
        message: message
      }));
    });
  });
};

var updateProductEpic = function updateProductEpic(action$, store, _ref5) {
  var Observable = _ref5.Observable;
  return action$.ofType("adminReducer/updateProductRequest").mergeMap(function (action) {
    var productData = action.payload;
    var url = "http://localhost:8000/admin/edit-product";
    return Observable.ajax({
      method: "PUT",
      url: url,
      headers: {
        "Content-Type": "application/json"
      },
      body: {
        productData: productData
      }
    }).mergeMap(function (AjaxResponse) {
      var response = AjaxResponse.response;
      return Observable.of(_adminDucks.actions.updateProductSuccess({
        response: response
      }) // productsActions.getProductRequest()
      );
    })["catch"](function (AjaxError) {
      var message = AjaxError.message;
      return Observable.of(_adminDucks.actions.updateProductError({
        message: message
      }));
    });
  });
};

var deleteProductEpic = function deleteProductEpic(action$, store, _ref6) {
  var Observable = _ref6.Observable;
  return action$.ofType("adminReducer/deleteProduct").mergeMap(function (action) {
    var id = action.payload;
    var url = "http://localhost:8000/admin/delete-product";
    return Observable.ajax({
      method: "POST",
      url: url,
      headers: {
        "Content-Type": "application/json"
      },
      body: id
    }).mergeMap(function (AjaxResponse) {
      var response = AjaxResponse.response;
      return Observable.of(_adminDucks.actions.deleteProductSuccess({
        response: response
      }), _adminDucks.actions.getProductRequest());
    })["catch"](function (AjaxError) {
      var message = AjaxError.message;
      return Observable.of(_adminDucks.actions.updateProductError({
        message: message
      }));
    });
  });
};

var _default = (0, _reduxObservable.combineEpics)(addProductEpic, getProductEpic, getEditProductEpic, updateProductEpic, deleteProductEpic);

exports["default"] = _default;