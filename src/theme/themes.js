import { extendTheme } from "@chakra-ui/react";
import { fontSizes, fonts } from "./fonts";
import Table from "./Table";

const colors = {
  brand: {
    primary: "#4A5568",
    orange: "#FF7100",
    orangeAlpha: {
      50: "rgba(255, 133, 0, 0.02)",
      100: "rgba(255, 133, 0, 0.04)",
      200: "rgba(255, 133, 0, 0.08)",
      300: "rgba(255, 133, 0, 0.16)",
      400: "rgba(255, 133, 0, 0.24)",
      500: "rgba(255, 133, 0, 0.36)",
      600: "rgba(255, 133, 0, 0.48)",
      700: "rgba(255, 133, 0, 0.64)",
      800: "rgba(255, 133, 0, 0.80)",
    },
    darkBlue: "#3396B6",
    darkBlueAlpha: {
      50: "rgba(51, 150, 182, 0.02)",
      100: "rgba(51, 150, 182, 0.04)",
      200: "rgba(51, 150, 182, 0.08)",
      300: "rgba(51, 150, 182, 0.16)",
      400: "rgba(51, 150, 182, 0.24)",
      500: "rgba(51, 150, 182, 0.36)",
      600: "rgba(51, 150, 182, 0.48)",
      700: "rgba(51, 150, 182, 0.64)",
      800: "rgba(51, 150, 182, 0.80)",
    },
    backgroundGrey: "#EDF2F7", // "#F6F6FA",
  },
};

const Button = {
  baseStyle: {
    margin: "1",
    padding: "1.5em",
    whiteSpace: "normal", // necessary to allow for line breaks
    wordWrap: "break-word",
    borderRadius: "none",
    fontWeight: "normal",
  },
  variants: {
    active: {
      backgroundColor: "brand.orangeAlpha.600",
      border: "1px solid",
      borderColor: "brand.orange",
      fontWeight: "bold",
    },
  },
};

const Card = {
  baseStyle: {
    backgroundColor: "brand.backgroundGrey",
    borderRadius: "lg",
    m: 3,
    p: "10",
    py: "2",
    overflowY: "auto",
  },
  variants: {
    ghost: {
      backgroundColor: "transparent",
    },
  },
};

const Tabs = {
  parts: ["tabpanel", "tab"],
  baseStyle: {
    tabpanel: {
      bg: "white",
      my: 0,
      border: "1px solid",
      borderColor: "brand.darkBlue",
    },
    tab: {
      bg: "white",
      p: 3,
    },
  },
  variants: {},
};

const Input = {
  parts: ["field"],
  baseStyle: {
    field: {
      margin: "1",
      my: 0,
      py: "1",
      px: "4",
      backgroundColor: "white",
      outline: "1px solid",
      outlineColor: "brand.darkBlueAlpha.200",
      border: "none",
    },
  },
  variants: {
    fakeInput: {
      field: {
        pointerEvents: "none",
      },
    },
  },
  defaultProps: {
    size: "",
    variant: "",
  },
};

const Heading = {
  baseStyle: {
    color: "brand.primary",
    fontWeight: "regular",
  },
  sizes: {
    lg: {
      fontSize: "lg",
      mt: "5",
      mb: "3",
    },
    xl: {
      fontSize: "xl",
      mt: "7",
      mb: "3",
      color: "brand.darkBlue",
    },
    "2xl": {
      fontSize: "2xl",
      mt: "7",
      mb: "3",
      color: "brand.darkBlue",
    },
  },
};

export const bundestagTheme = extendTheme({
  components: {
    Button,
    Input,
    Heading,
    Tabs,
    Card,
    Table,
  },
  colors,
  fonts,
  fontSizes,
  layerStyles: {
    errorGlow: {
      outline: "1px solid #E53E3E",
      boxShadow: "0 0 10px #E53E3E",
    },
    ambiguityContainerHighlight: {
      /*       outline: "1px solid #FF7100",
      boxShadow: "0 0 10px #FF7100", */
    },
    changedRowHighlight: {
      /*       outline: "1px solid #FF7100",
      boxShadow: "0 0 10px #FF7100", */
      backgroundColor: "brand.orangeAlpha.300",
    },
    ambigousRowHighlight: {
      backgroundColor: "brand.orangeAlpha.300",
    },
  },
});
