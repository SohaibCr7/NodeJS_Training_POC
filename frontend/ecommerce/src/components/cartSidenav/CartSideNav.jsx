import React from "react";
import "./cart.scss";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { actions as navigationActions } from "../../redux/ducks/navigationDucks";

export const CartSidenav = (props) => {
  const dispatch = useDispatch();
  const { toggleCart } = navigationActions;

  const { showCart, cart, loading } = useSelector((state) => {
    const {
      navigationState: { showCart },
      shopReducerState: { cart, loading },
    } = state;

    return { showCart, cart, loading };
  });

  const { cartProducts, pageTitle, totalPrice } = cart;

  const onClickToggleCart = () => {
    dispatch(toggleCart(showCart));
  };

  const myStyle = {
    width: showCart ? "500px" : "0px",
  };

  return (
    <div className="cart-container">
      <div id="nav" className="sidenav" style={myStyle}>
        <span className="closebtn" onClick={() => onClickToggleCart()}>
          &times;
        </span>
        {cartProducts &&
          cartProducts.map(
            ({ id, title, imageUrl, description, price, qty }, index) => {
              return (
                <div className="cart-sub-container" key={index}>
                  <li>
                    <img className="image-li"
                      src={imageUrl}
                      alt="Jacket"
                      width="50px"
                      height="50px"
                    />
                  </li>
                  <li className="heading-list">{title}</li>
                  <li className="heading-list-btn"><button>+</button></li>
                  <li className="heading-list">{qty}</li>
                  <li className="heading-list-btn"><button>-</button></li>
                  <li className="heading-list">{price}</li>
                  <li className="heading-list cross"> &times;</li>
                </div>
              );
            }
          )}
      </div>
    </div>
  );
};
