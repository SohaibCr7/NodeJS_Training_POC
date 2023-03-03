import React, { Fragment, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { actions as adminActions } from "../../redux/ducks/adminDucks";

import { useParams } from "react-router-dom";
import Navigation from "../navigation/Navigation";

import { DataGrid } from "@mui/x-data-grid";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import "./styles/Add-Product.scss";

function EditProduct() {
  const dispatch = useDispatch();
  const nevigate = useNavigate();

  const {
    addProductRequest,
    getEditProductRequest,
    getProductRequest,
    updateProductRequest,
  } = adminActions;

  const params = useParams();

  // Redux States
  const { product, loading } = useSelector((state) => {
    const {
      adminProductState: { product, loading },
    } = state;

    return { product, loading };
  });

  const { productData, editing, pageTitle, path } = product;

  // Local States
  const [pageSize, setPageSize] = useState(5);
  const [formData, setFormData] = useState({
    title: "",
    imageUrl: "",
    description: "",
    price: "",
  });

  useEffect(() => {
    const { id } = params;
    if (editing) {
      setFormData({
        ...formData,
        title: productData[0]?.title,
        imageUrl: productData[0]?.imageUrl,
        description: productData[0]?.description,
        price: productData[0]?.price,
      });
    }
    if (id !== ":id") {
      dispatch(getEditProductRequest(id));
    } 
    else {
      dispatch(getProductRequest());
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editing]);

  const addData = (event) => {
    // if (event.target.files) {
    //   setFormData({ ...formData, [event?.target?.name]: event?.target?.files });
    // }
    setFormData({
      ...formData,
      [event?.target?.name]: event?.target?.value,
    });
  };

  const addProduct = () => {
    Object.keys(formData?.title || {})?.length > 0 &&
      dispatch(addProductRequest({ formData }));
    setFormData({
      ...formData,
      title: "",
      imageUrl: "",
      description: "",
      price: "",
    });
  };

  const getProductIndex = () => {
    return productData?.map((product, index) => ({ ...product, key: index }));
  };

  const rows = productData ? getProductIndex() : [];

  const columns = [
    { field: "key", headerName: "No#", width: 200, sortable: false },
    { field: "title", headerName: "Title", width: 220, sortable: false },
    {
      field: "description",
      headerName: "Description",
      width: 400,
      sortable: false,
    },
    { field: "price", headerName: "Price", width: 200, sortable: false },
    {
      field: "imageUrl",
      headerName: "Image URL",
      width: 400,
      sortable: false,
    },
  ];

  const onRowClick = (rowData) => {
    const { row } = rowData;
    setFormData({ ...formData, ...row, row });
  };
console.log(path , "path")
  const editProduct = (id, title, imageUrl, description, price) => {
    const productData = { id, title, imageUrl, description, price };
    dispatch(updateProductRequest(productData));
    nevigate(`${path}`);
  };

  const pageSizeHadler = (value) => {
    setPageSize(value);
  };

  const productTable = () => {
    return loading ? (
      <Box
        sx={{
          display: "flex",
          zIndex: 100,
          position: "relative",
          top: 160,
          left: 700,
        }}
      >
        <CircularProgress color="success" size="3rem" />
      </Box>
    ) : (
      <div style={{ paddingTop: "20px", height: 400, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={pageSize}
          onPageSizeChange={pageSizeHadler}
          rowsPerPageOptions={[5, 10, 15]}
          onRowClick={onRowClick}
        />
      </div>
    );
  };

  const productForm = () => {
    const { title, description, price, imageUrl } = formData;
    return (
      <div className="add-product-container">
        <Navigation />
        <h1>{editing ? pageTitle : "Add Product"}</h1>
        <div className="form">
          <main>
            <div className="form-control">
              <input
                type="hidden"
                name="id"
                value={{} || productData[0]?.id}
                onChange={(id) => addData(id)}
              />
              <label htmlFor="title">Title</label>
              <input
                type="text"
                name="title"
                id="title"
                required
                value={title}
                onChange={(title) => addData(title)}
              />
            </div>
            <div className="form-control">
              <label htmlFor="imageUrl">Image URL</label>
              <input
                type="text"
                name="imageUrl"
                id="imageUrl"
                value={imageUrl}
                onChange={(imageUrl) => addData(imageUrl)}
              />
            </div>
            <div className="form-control">
              <label htmlFor="description">Description</label>
              <textarea
                type="description"
                name="description"
                id="description"
                value={description}
                rows="5"
                onChange={(description) => addData(description)}
              />
            </div>
            <div className="form-control">
              <label htmlFor="price">Price</label>
              <input
                type="number"
                name="price"
                id="price"
                value={price}
                onChange={(price) => addData(price)}
              />
            </div>
            {editing ? (
              <button
                className="btn"
                onClick={() =>
                  editProduct(
                    productData[0]?.id,
                    title,
                    imageUrl,
                    description,
                    price
                  )
                }
              >
                Update Product
              </button>
            ) : (
              <button className="btn" onClick={() => addProduct()}>
                Add Product
              </button>
            )}
          </main>
        </div>
        {productTable()}
      </div>
    );
  };

  return <Fragment>{productForm()}</Fragment>;
}

export default EditProduct;
