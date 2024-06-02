import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import GlobalStyles from "styles/GlobalStyle";
import { RecoilRoot } from "recoil";

const basename = process.env.PUBLIC_URL;

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <RecoilRoot>
    <GlobalStyles />
    <App />
  </RecoilRoot>
);
