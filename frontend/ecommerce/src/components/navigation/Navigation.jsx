import React from "react";
import { Link } from "react-router-dom";

import "./styles/navigation.scss";
// Helpers
import { useLocation, useParams } from "react-router-dom";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { actions as navigationActions } from "../../redux/ducks/navigationDucks";
import { actions as productsActions } from "../../redux/ducks/shopDucks";

// Component
import { CartSidenav } from "../cartSidenav/CartSideNav";

export default function Navigation() {
  const { showCart } = useSelector((state) => {
    const {
      navigationState: { showCart },
    } = state;

    return { showCart };
  });
  const location = useLocation();
  const { id: productId } = useParams();

  const { toggleCart } = navigationActions;
  const { resetReducers } = productsActions;

  const dispatch = useDispatch();

  const onClickToggleCart = () => {
    dispatch(toggleCart(showCart));
  };

  return (
    <div className="main-header">
      <div className="main-header__nav">
        <ul className="main-header__item-list">
          <li className="main-header__item">
            <Link
              onClick={resetReducers()}
              className={`${
                location.pathname === "/" ||
                location.pathname === `/shop/product-details/${productId}`
                  ? "active"
                  : ""
              }`}
              to="/"
            >
              Shop
            </Link>
          </li>
          <li className="main-header__item">
            <Link
              className={`${
                location.pathname === `/admin/edit-product/${productId}`
                  ? "active"
                  : ""
              }`}
              to="/admin/edit-product/:id"
            >
              Add Product
            </Link>
          </li>
          <li className="main-header__item">
            <Link
              className={`${
                location.pathname === "/shop/add-cart" ? "active" : ""
              }`}
              to="/shop/add-cart"
            >
              Cart
            </Link>
          </li>
          <li className="main-header__item">
            <Link
              className={`${
                location.pathname === "/admin/products" ? "active" : ""
              }`}
              to="/admin/products"
            >
              Admin Products
            </Link>
          </li>
          <li className="main-header__item">
            <Link
              className={`${
                location.pathname === "/shop/orders" ? "active" : ""
              }`}
              to="/shop/orders"
            >
              Orders
            </Link>
          </li>
          <li className="main-header__item">
            <Link
              className={`${
                location.pathname === "/shop/checkout" ? "active" : ""
              }`}
              to="/shop/checkout"
            >
              Checkout
            </Link>
          </li>
          <li className="main-header__item">
            <Link
              className={`${
                location.pathname === "/shop/type-script" ? "active" : ""
              }`}
              to="/shop/type-script"
            >
              TypeScript
            </Link>
          </li>
          <li
            className="cart fa fa-cart-arrow-down"
            onClick={() => onClickToggleCart()}
          ></li>
        </ul>
      </div>
      {<CartSidenav />}
    </div>
  );
}
