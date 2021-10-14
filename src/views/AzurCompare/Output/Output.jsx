import React from "react";
import Card from "theme/Card";
import {
  Heading,
  Spinner,
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
} from "@chakra-ui/react";
import PropTypes from "prop-types";
import ComparisonTable from "./ComparisonTable";
import _ from "lodash";

const Output = ({ data, error, loading, ...cssprops }) => {
  return (
    <Card {...cssprops}>
      <Heading size="2xl">Ergebniss</Heading>
      {loading ? (
        <Spinner color="brand.orange" />
      ) : (
        <Box bg="white">
          {_.isEmpty(error) ? (
            <ComparisonTable
              tableData={data?.table}
              assignmentSequence={data?.assignment_sequence}
            />
          ) : (
            <Alert status="error">
              <AlertIcon />
              <AlertTitle mr={2}>Ungültige Eingabe!</AlertTitle>
              <AlertDescription>{error.message}</AlertDescription>
            </Alert>
          )}
        </Box>
      )}
    </Card>
  );
};

Output.propTypes = {
  data: PropTypes.object, // TODO check these prop types
  error: PropTypes.object, // TODO check these prop types
  loading: PropTypes.bool,
};

export default Output;
