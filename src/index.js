import React from "react";
import ReactDOM from "react-dom";
import App from "App";
import { bundestagTheme } from "./themes.js";
import { ChakraProvider } from "@chakra-ui/react"


ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider theme={bundestagTheme}>
      <App />
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
