/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
// Redux helpers
import { useSelector, useDispatch } from "react-redux";
import { actions as productsActions } from "../../redux/ducks/shopDucks";

// Components
import Navigation from "../navigation/Navigation";

import "./styles/product.scss";

export default function ProductDetails() {
  const dispatch = useDispatch();
  const params = useParams();
  const { getProductDetailRequest, addToCartRequest } = productsActions;

  const { productData, pageTitle } = useSelector((state) => {
    const {
      shopReducerState: { productData, pageTitle },
    } = state;

    return { productData, pageTitle };
  });

  const addToCart = (id, price) => {
    dispatch(addToCartRequest({ id, price }));
  };

  useEffect(() => {
    const { id: productId = 1 } = params;

    dispatch(getProductDetailRequest(productId));
  }, [dispatch, getProductDetailRequest]);

  return (
    <div className="product-details">
      <Navigation />
      <h1>{`${pageTitle}`}</h1>
      <div className="card-container">
        {productData?.map(
          ({ id, title, imageUrl, description, price }, index) => {
            return (
              <div className="card" key={index}>
                <h1>{title}</h1>
                <hr />
                <img src={imageUrl} alt="Jacket" width="200px" height="200px" />
                <p className="price">{description}</p>
                <p className="price">{`$ ${price}`}</p>
                <button
                  className="btn"
                  type="button"
                  onClick={() => addToCart(id, price)}
                >
                  Add to Cart
                </button>
              </div>
            );
          }
        )}
      </div>
    </div>
  );
}
