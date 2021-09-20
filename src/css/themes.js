import { extendTheme } from "@chakra-ui/react";

const colors = {
  brand: {
    orange: "#FF7100",
    orangeAlpha: {
      300: "rgba(255,133,0,0.16)",
      400: "rgba(255, 133, 0, 0.24)",
      500: "rgba(255, 133, 0, 0.36)",
      600: "rgba(255, 133, 0, 0.48)",
      700: "rgba(255, 133, 0, 0.64)",
      800: "rgba(255, 133, 0, 0.80)",
    },
    darkBlue: "#31505F",
    red: "#EF4344",
  },
};

const fontSizes = {
  md: "1rem", // 12px normal text
  xl: "1.6rem", // 20px heading 3
  "2xl": "2rem", // 24px heading 2
  "3xl": "2.3rem", // 28px heading 1
};


const Button = {
  baseStyle: {
      margin: '1'
  },
  variants: {
    active: {
      backgroundColor: "brand.orangeAlpha.500",
      border: "1px solid",
      borderColor: "brand.orange"
    } 
  }
}

const Input = {
  baseStyle: {
    field:{
      margin: '1',
      backgroundColor: 'whiteAlpha.700'
    }
  }
}

const Heading = {
  sizes: {
    "xl": {
      color: 'brand.darkBlue',
      fontSize: 'xl',
      mt: '5',
      mb: '3'
    },
    "2xl": {
      fontSize: '2xl',
      mb: '7'
    }
  }
}

export const bundestagTheme = extendTheme({
  components: {
      Button,
      Input,
      Heading
  },
  colors,
  fontSizes,
});
