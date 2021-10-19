import React from "react";
import { Global } from "@emotion/react";

export const fonts = {
  heading: "BundesSans",
  body: "Open Sans",
};

export const fontSizes = {
  xs: "0.6rem",
  sm: "0.8rem",
  md: "1rem", // 12px normal text
  lg: "1rem",
  xl: "1.6rem", // 20px heading 3
  "2xl": "2rem", // 24px heading 2
  "3xl": "2.3rem", // 28px heading 1
  "4xl": "3rem", // custom very large
  "5xl": "4rem", // custom very large
};

const FontFaces = () => (
  <Global
    styles={`
      @font-face {
        font-family: 'BundesSans';
        font-weight: 'normal';
        font-style: 'italic';
        src: url('fonts/BundesSansOffice-Italic.ttf');
      }
      @font-face {
        font-family: 'BundesSans';
        font-weight: 'normal';
        src: url('fonts/BundesSansOffice.ttf');
      }
      @font-face {
        font-family: 'BundesSans';
        font-weight: 'bold';
        font-style: 'italic';
        src: url('fonts/BundesSansOffice-BoldItalic.ttf');
      }
      @font-face {
        font-family: 'BundesSans';
        font-weight: 'bold';
        src: url('fonts/BundesSansOffice-Bold.ttf');
      }
    `}
  />
);

export default FontFaces;
