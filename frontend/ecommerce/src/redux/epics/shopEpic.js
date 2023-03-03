import { combineEpics } from "redux-observable";
import { actions as shopActions } from "../ducks/shopDucks";

const getProductEpic = (action$, store, { Observable }) => {
  return action$.ofType("shopReducer/getProductRequest").mergeMap((action) => {
    const url = "http://localhost:8000/shop/products";
    return Observable.ajax({
      method: "GET",
      url,
      headers: {
        "Content-Type": "application/json",
      },
    })
      .mergeMap((AjaxResponse) => {
        const { response } = AjaxResponse;
        return Observable.of(shopActions.getProductSuccess(response));
        // Observable.empty();
      })
      .catch((error) => {
        return Observable.of(alert(error));
      });
  });
};

const getProductDetailEpic = (action$, store, { Observable }) => {
  return action$
    .ofType("shopReducer/getProductDetailRequest")
    .mergeMap((action) => {
      const { payload: productId } = action;

      const url = `http://localhost:8000/shop/product-details/${productId}`;

      return Observable.ajax({
        method: "GET",
        url,
        headers: {
          "Content-Type": "application/json",
        },
      })
        .mergeMap((AjaxResponse) => {
          const { response } = AjaxResponse;
          return Observable.of(shopActions.getProductDetailSuccess(response));
        })
        .catch((AjaxError) => {
          const { message } = AjaxError;
          console.log('catch: ', message)
          return Observable.of(shopActions.getProductDetailError({ message }));
        });
    });
};

const cartEpic = (action$, store$, { Observable }) => {
  return action$
    .ofType(
      "shopReducer/addToCartRequest",
      "shopReducer/deleteCartProductRequest"
    )
    .mergeMap((action) => {
      const {
        payload: { productId, type },
      } = action;

      // const {
      //   shopReducerState: { cartProduct },
      // } = store$.getState();
      // const {
      //   productData: { id: exestingCartProductId },
      // } = cartProduct[0];

      let url;
      if (type === "DELETE") {
        url = `http://localhost:8000/shop/cart-delete-item`;
      } else {
        url = `http://localhost:8000/shop/add-cart`;
      }

      return Observable.ajax({
        method: "POST",
        url,
        headers: {
          "Content-Type": "application/json",
        },
        body: { productId },
      })
        .mergeMap((AjaxResponse) => {
          const { response } = AjaxResponse;
          return Observable.of(
            shopActions.getCartProductSuccess(response)
            // shopActions.getCartProductRequest()
          );
        })
        .catch((AjaxError) => {
          const { message } = AjaxError;
          return Observable.of(shopActions.getProductDetailError({ message }));
        });
    });
};

const getCartEpic = (action$, store, { Observable }) => {
  return action$
    .ofType("shopReducer/getCartProductRequest")
    .mergeMap((action) => {
      const url = `http://localhost:8000/shop/cart`;
      return Observable.ajax({
        method: "GET",
        url,
        headers: {
          "Content-Type": "application/json",
        },
      })
        .mergeMap((AjaxResponse) => {
          const { response } = AjaxResponse;
          return Observable.of(shopActions.getCartProductSuccess(response));
        })
        .catch((AjaxError) => {
          const { message } = AjaxError;
          return Observable.of(shopActions.getProductDetailError({ message }));
        });
    });
};

export default combineEpics(
  getProductEpic,
  getProductDetailEpic,
  cartEpic,
  getCartEpic
);
