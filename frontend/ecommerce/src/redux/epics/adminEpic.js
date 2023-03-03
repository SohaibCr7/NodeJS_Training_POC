import { combineEpics } from "redux-observable";
import { actions as productsActions } from "../ducks/adminDucks";

const addProductEpic = (action$, store$, { Observable }) => {
  return action$.ofType("adminReducer/addProductRequest").mergeMap((action) => {
    const {
      payload: { formData },
    } = action;
    // const {
    //   adminProductState: { formData },
    // } = store$.getState();

    const url = "http://localhost:8000/admin/add-product";
    return Observable.ajax({
      method: "POST",
      url,
      headers: {
        "Content-Type": "application/json",
      },
      body: { product: formData },
    })
      .mergeMap(({ response: { message } }) => {
        return Observable.of(
          productsActions.addProductSuccess(),
          productsActions.getProductRequest()
        );
      })
      .catch((error) => {
        return Observable.of([]);
      });
  });
};

const getProductEpic = (action$, store, { Observable }) => {
  return action$.ofType("adminReducer/getProductRequest").mergeMap((action) => {
    const url = "http://localhost:8000/admin/products";
    return Observable.ajax({
      method: "GET",
      url,
      headers: {
        "Content-Type": "application/json",
      },
    })
      .mergeMap((AjaxResponse) => {
        const { response } = AjaxResponse;
        return Observable.of(productsActions.getProductSuccess(response));
        // Observable.empty();
      })
      .catch((AjaxError) => {
        const { message } = AjaxError;
        return Observable.of(productsActions.getProductError(message));
      });
  });
};

const getEditProductEpic = (action$, store, { Observable }) => {
  return action$
    .ofType("adminReducer/getEditProductRequest")
    .mergeMap((action) => {
      const { payload: id } = action;
      const url = `http://localhost:8000/admin/edit-product/?${id}`;

      return Observable.ajax({
        method: "GET",
        url,
        headers: {
          "Content-Type": "application/json",
        },
      })
        .mergeMap((AjaxResponse) => {
          const { response } = AjaxResponse;
          return Observable.of(
            productsActions.getEditProductSuccess({ response })
          );
        })
        .catch((AjaxError) => {
          const { message } = AjaxError;
          return Observable.of(productsActions.getProductError({ message }));
        });
    });
};

const updateProductEpic = (action$, store, { Observable }) => {
  return action$
    .ofType("adminReducer/updateProductRequest")
    .mergeMap((action) => {
      const { payload: productData } = action;
      const url = `http://localhost:8000/admin/edit-product`;
      return Observable.ajax({
        method: "PUT",
        url,
        headers: {
          "Content-Type": "application/json",
        },
        body: { productData },
      })
        .mergeMap((AjaxResponse) => {
          const { response } = AjaxResponse;
          return Observable.of(
            productsActions.updateProductSuccess({ response })
            // productsActions.getProductRequest()
          );
        })
        .catch((AjaxError) => {
          const { message } = AjaxError;
          return Observable.of(productsActions.updateProductError({ message }));
        });
    });
};

const deleteProductEpic = (action$, store, { Observable }) => {
  return action$.ofType("adminReducer/deleteProduct").mergeMap((action) => {
    const { payload: id } = action;
    const url = `http://localhost:8000/admin/delete-product`;
    return Observable.ajax({
      method: "POST",
      url,
      headers: {
        "Content-Type": "application/json",
      },
      body: id,
    })
      .mergeMap((AjaxResponse) => {
        const { response } = AjaxResponse;
        return Observable.of(
          productsActions.deleteProductSuccess({ response }),
          productsActions.getProductRequest()
        );
      })
      .catch((AjaxError) => {
        const { message } = AjaxError;
        return Observable.of(productsActions.updateProductError({ message }));
      });
  });
};

export default combineEpics(
  addProductEpic,
  getProductEpic,
  getEditProductEpic,
  updateProductEpic,
  deleteProductEpic
);
