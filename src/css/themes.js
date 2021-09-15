import { extendTheme } from "@chakra-ui/react";

const colors = {
  brand: {
    orange: "#FF7100",
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
      Heading
  },
  colors,
  fontSizes,
});
