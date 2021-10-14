import { Box, useStyleConfig } from "@chakra-ui/react";
import React from "react";
import PropTypes from "prop-types";

Card.propTypes = { variant: PropTypes.string };

function Card({ variant, ...rest }) {
  const styles = useStyleConfig("Card", { variant });
  return <Box __css={styles} {...rest} />;
}

export default Card;
