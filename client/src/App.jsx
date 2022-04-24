import Product from "./pages/Product";
import Home from "./pages/Home";
import ProductList from "./pages/ProductList";
import Cart from "./pages/Cart";
import Success from "./pages/Success";
import AuthModal from "./pages/Log/AuthModal";
import { CryptoState } from "./CryptoContex";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

const App = () => {
  const { user } = CryptoState();

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home />;
        </Route>
        <Route path="/cart">
          <Cart />;
        </Route>
        <Route path="/products/:category">
          {" "}
          {user ? <Redirect to="/products/" /> : ""}
          <ProductList />;
        </Route>
        <Route exact path="/products/">
          {user ? <Redirect to="/products/" /> : ""}
          <ProductList />;
        </Route>
        <Route path="/product/:id">
          <Product />;
        </Route>

        <Route path="/login">
          {user ? <Redirect to="/" /> : <AuthModal />}
        </Route>
        <Route path="/success">
          <Success />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
