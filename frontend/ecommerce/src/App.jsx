
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Components
import ProductList from "./components/shop/ProductList";
import EditProduct from "./components/admin/EditProduct";
import Products from "./components/admin/Products";
import Cart from "./components/shop/Cart";
import Checkout from "./components/shop/Checkout";
import Orders from "./components/shop/Orders";
import ProductDetails from "./components/shop/ProductDetails";
// import TypeScript from "./components/shop/TypeScriptExample";

function App() {
  return (
    <div className="App">
      <BrowserRouter path={process.env.PUBLIC_URL + "/"}>
        <Routes>
          <Route exact path="/" element={<ProductList />} />
          <Route path="shop/add-cart" element={<Cart />} />
          <Route path="shop/checkout" element={<Checkout />} />
          <Route path="shop/orders" element={<Orders />} />
          <Route path="shop/product-details/:id" element={<ProductDetails />} />
          {/* <Route path="shop/type-script" element={<TypeScript />} /> */}
          <Route path="admin/products" element={<Products />} />
          <Route path="admin/edit-product/:id" element={<EditProduct />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
