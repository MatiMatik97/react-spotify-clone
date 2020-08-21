import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { StateProvider } from "./state/provider";
import { initialState } from "./state/reducer";
import reducer from "./state/reducer";

ReactDOM.render(
  <React.StrictMode>
    <StateProvider initialState={initialState} reducer={reducer}>
      <App />
    </StateProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
