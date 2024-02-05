import { Route, Routes } from "react-router";
import "./App.css";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Homepage from "./Pages/Homepage";
import AccountVerification from "./Pages/AccountVerification";
import Layout from "./Components/templatess/Layout";
import ProductList from "./Pages/ProductList";
import ProductListCategories from "./Pages/ProductListCategories";
import ProductDetails from "./Pages/ProductDetails";
import ShoppingCart from "./Pages/ShoppingCart";
import Contact from "./Pages/Contact";
import EnterAddress from "./Pages/EnterAddress";
import PaymentSuccess from "./Pages/PaymentSuccess";
import PaymentFailure from "./Pages/PaymentFailure";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Homepage />} />
          <Route path="/proizvodi/:gender/:type" element={<ProductList />} />
          <Route path="/kategorije/:type" element={<ProductListCategories />} />
          <Route path="/kosarica" element={<ShoppingCart />} />
          <Route path="/proizvodi/:id" element={<ProductDetails />} />
          <Route path="/kontakt" element={<Contact />} />
          <Route path="/unesi-adresu" element={<EnterAddress />} />
          <Route path="/success" element={<PaymentSuccess />} />
          <Route path="/cancel" element={<PaymentFailure />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/user/activation/" element={<AccountVerification />} />
      </Routes>
    </>
  );
}

export default App;
