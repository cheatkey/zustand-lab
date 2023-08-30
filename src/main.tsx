import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { NextUIProvider } from "@nextui-org/react";
import App from "./App";
import { RecoilRoot } from "recoil";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <NextUIProvider>
    <RecoilRoot>
      <App />
    </RecoilRoot>
  </NextUIProvider>
);
