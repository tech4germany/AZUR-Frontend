import React from "react";
import Card from "theme/Card";
import { Heading } from "@chakra-ui/react";
import PropTypes from "prop-types";

const Output = ({ data, errors, loading, ...cssprops }) => {
  return (
    <Card {...cssprops}>
      <Heading size="2xl">Ergebniss</Heading>
      {JSON.stringify(data)}
      {JSON.stringify(errors)}
      {JSON.stringify(loading)}
    </Card>
  );
};

Output.propTypes = {
  data: PropTypes.object, // TODO check these prop types
  errors: PropTypes.object, // TODO check these prop types
  loading: PropTypes.bool,
};

export default Output;
