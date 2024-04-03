import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import app from "./firebase";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store.tsx";
//연동되고 있는지 확인
console.log("app", app);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
