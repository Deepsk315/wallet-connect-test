import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import store from "./store";
import { wagmiConfig, ethereumClient } from "./hooks/wagmi";
import { WagmiConfig } from "wagmi";
import { Web3Modal } from "@web3modal/react";

const projectId = "6bf69837af27b0625c701b85d11345c8";

ReactDOM.render(
  <>
    <WagmiConfig config={wagmiConfig}>
      <Provider store={store}>
        <App />
      </Provider>
    </WagmiConfig>
    ,
    <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
  </>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
reportWebVitals();
