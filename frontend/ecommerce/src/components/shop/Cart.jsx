import React, { useEffect } from "react";
import Navigation from "../navigation/Navigation";

// Redux helpers
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { actions as productsActions } from "../../redux/ducks/shopDucks";

export default function Cart(props) {
  const dispatch = useDispatch();
  const { getCartProductRequest, deleteCartProductRequest } = productsActions;

  const { cart, loading } = useSelector((state) => {
    const {
      shopReducerState: { cart, loading },
    } = state;

    return { cart, loading };
  }, shallowEqual);
  const { cartProducts, pageTitle, totalPrice } = cart;

  useEffect(() => {
    dispatch(getCartProductRequest());
  }, [dispatch, getCartProductRequest]);

  const deleteCartProduct = (id) => {
    dispatch(deleteCartProductRequest({ productId: id, type: "DELETE" }));
  };

  return (
    <div className="cart-container">
      <Navigation />

      <h1>{pageTitle}</h1>
      <div className="card-container">
        {cartProducts?.map(
          ({ id, title, imageUrl, description, price, qty }, index) => {
            return (
              <div className="card" key={index}>
                <h1>{title}</h1>
                <img src={imageUrl} alt="Jacket" width="200px" height="200px" />
                <p className="price">{description}</p>
                <p className="price">{`$ ${price}`}</p>
                <p className="price">{`Quantity: $ ${qty}`}</p>
                <button className="btn" onClick={() => deleteCartProduct(id)}>
                  Delete
                </button>
              </div>
            );
          }
        )}
      </div>
      <p className="price">{`Items Items: ${cartProducts?.length}`}</p>
      <p className="price">{`Total Price: $ ${totalPrice}`}</p>
    </div>
  );
}
