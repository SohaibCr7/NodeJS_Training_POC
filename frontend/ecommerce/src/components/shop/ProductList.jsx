import React, { Fragment, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Redux helpers
import { useSelector, useDispatch } from "react-redux";
import { actions as productsActions } from "../../redux/ducks/shopDucks";

// Components
import Navigation from "../navigation/Navigation";

import "./styles/product.scss";

function ProductList() {
  const dispatch = useDispatch();
  const nevigate = useNavigate();

  const { getProductRequest, addToCartRequest } = productsActions;

  const onRowClick = (id) => {
    nevigate(`/shop/product-details/${id}`, { id });
  };

  const addToCart = (id) => {
    dispatch(addToCartRequest({productId: id, type: 'ADD'}));
  };
  
  const { productData, pageTitle, loading } = useSelector((state) => {
    const {
      shopReducerState: { productData, pageTitle, loading },
    } = state;

    return { productData, pageTitle, loading };
  });

  useEffect(() => {
    dispatch(getProductRequest());
  }, [dispatch, getProductRequest]);

  return (
    <Fragment>
      <div className="product-list-container">
        <Navigation />
      <h1>{pageTitle}</h1>
      <div className="card-container">
        {loading ? (
          <h1>No Products</h1>
        ) : (
          productData?.map(
            ({ id, title, imageUrl, description, price }, index) => {
              return (
                <div className="card" key={index}>
                  <h1>{title}</h1>
                  <img
                    src={imageUrl}
                    alt="Jacket"
                    width="200px"
                    height="200px"
                  />
                  <p className="price">{description}</p>
                  <p className="price">{`$ ${price}`}</p>
                  <button onClick={() => onRowClick(id)} className="btn">
                    Details
                  </button>
                  <button className="btn" onClick={() => addToCart(id)}>
                    Add to Cart
                  </button>
                </div>
              );
            }
          )
        )}
      </div>
      </div>
    </Fragment>
  );
}

export default ProductList;
