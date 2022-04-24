import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Provider } from "react-redux";
import store from "./redux/store";
import CryptoContext from "./CryptoContex";

ReactDOM.render(
  <Provider store={store}>
    <CryptoContext>
      <App />
    </CryptoContext>
  </Provider>,
  document.getElementById("root")
);
