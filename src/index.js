import React from "react";
import ReactDOM from "react-dom";
import App from "App";
import "@fontsource/open-sans/700.css";
import FontFaces from "./theme/fonts";
import { bundestagTheme } from "./theme/themes.js";
import { ChakraProvider } from "@chakra-ui/react";

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider theme={bundestagTheme}>
      <FontFaces />
      <App />
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
