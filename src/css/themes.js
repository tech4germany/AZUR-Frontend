import { extendTheme } from "@chakra-ui/react";

const colors = {
  brand: {
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
    darkBlue: "#31505F",
    darkBlueAlpha: {
      50: "rgba(49, 80, 95, 0.02)",
      100: "rgba(49, 80, 95, 0.04)",
      200: "rgba(49, 80, 95, 0.08)",
      300: "rgba(49, 80, 95, 0.16)",
      400: "rgba(49, 80, 95, 0.24)",
      500: "rgba(49, 80, 95, 0.36)",
      600: "rgba(49, 80, 95, 0.48)",
      700: "rgba(49, 80, 95, 0.64)",
      800: "rgba(49, 80, 95, 0.80)",
    },
  },
};

const fontSizes = {
  md: "1rem", // 12px normal text
  xl: "1.6rem", // 20px heading 3
  "2xl": "2rem", // 24px heading 2
  "3xl": "2.3rem", // 28px heading 1
  "4xl": "3rem", // custom very large
};

const Button = {
  baseStyle: {
    margin: "1",
    whiteSpace: "normal", // necessary to allow for line breaks
    wordWrap: "break-word",
  },
  variants: {
    active: {
      backgroundColor: "brand.orangeAlpha.500",
      border: "1px solid",
      borderColor: "brand.orange",
    },
  },
};

const Stack = {
  variants: {
    glowing: {
      outlineColor: "red.500",
      boxShadow: "0 0 10px #E53E3E", // same as red.500 // TODO how to avoid this manual assignment of the color?
    },
  },
};

const Input = {
  baseStyle: {
    field: {
      margin: "1",
      backgroundColor: "whiteAlpha.700",
      outline: "1px solid",
      outlineColor: "brand.darkBlueAlpha.200",
      border: "none",
    },
  },
  variants: {
    azurBrand: {},
    fakeInput: {
      field: {
        pointerEvents: "none",
      },
    },
    glowing: {
      field: {
        outlineColor: "red.500",
        boxShadow: "0 0 10px #E53E3E", // same as red.500 // TODO how to avoid this manual assignment of the color?
      },
    },
  },
  defaultProps: {
    variant: "azurBrand",
  },
};

const Heading = {
  sizes: {
    xl: {
      color: "brand.darkBlue",
      fontSize: "xl",
      mt: "7",
      mb: "3",
    },
    "2xl": {
      fontSize: "2xl",
      mb: "7",
    },
  },
};

export const bundestagTheme = extendTheme({
  components: {
    Button,
    Input,
    Heading,
    Stack,
  },
  colors,
  fontSizes,
  layerStyles: {
    errorGlow: {
      outline: "1px solid #E53E3E",
      boxShadow: "0 0 10px #E53E3E"
    }
  }
});