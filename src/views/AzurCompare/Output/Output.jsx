import React from "react";
import Card from "theme/Card";
import { Heading } from "@chakra-ui/react";
import PropTypes from "prop-types";

const Output = ({ data, error, loading, ...cssprops }) => {
  return (
    <Card {...cssprops}>
      <Heading size="2xl">Ergebniss</Heading>
      <Heading size="xl">Data</Heading>
      {JSON.stringify(data)}
      <Heading size="xl">Errors</Heading>
      {JSON.stringify(error)}
      <Heading size="xl">Loading</Heading>
      {JSON.stringify(loading)}
    </Card>
  );
};

Output.propTypes = {
  data: PropTypes.object, // TODO check these prop types
  error: PropTypes.object, // TODO check these prop types
  loading: PropTypes.bool,
};

export default Output;
