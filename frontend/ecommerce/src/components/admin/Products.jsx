import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { actions as productsActions } from "../../redux/ducks/adminDucks";

import Navigation from "../navigation/Navigation";
import qs from "qs";

import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

export default function Products() {
  const dispatch = useDispatch();
  const nevigate = useNavigate();
  const { getProductRequest, deleteProduct } = productsActions;

  const deleteProducts = (id) => {
    dispatch(deleteProduct({ id }));
  };

  useEffect(() => {
    dispatch(getProductRequest());
  }, [dispatch, getProductRequest]);

  // Redux Statess
  const { product, loading } = useSelector((state) => {
    const {
      adminProductState: { product, loading },
    } = state;

    return { product, loading };
  });
  const { productData, pageTitle } = product;

  const editProduct = (id) => {
    const query = qs.stringify({ id });
    nevigate(`/admin/edit-product/${query}?edit=true`);
  };

  return (
    <div>
      <Navigation />
      <h1>{pageTitle}</h1>
      <div className="card-container">
        {loading ? (
          <Box
            sx={{
              display: "flex",
              zIndex: 100,
              position: "relative",
              top: 260,
            }}
          >
            <CircularProgress color="success" size="4rem" />
          </Box>
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

                  <p className="price"> {description}</p>
                  <p className="price">{`$ ${price}`}</p>

                  <button className="btn" onClick={() => editProduct(id)}>
                    Edit
                  </button>

                  <button
                    className="btn"
                    onClick={() => deleteProducts(id)}
                  >
                    Delete
                  </button>
                </div>
              );
            }
          )
        )}
      </div>
    </div>
  );
}
