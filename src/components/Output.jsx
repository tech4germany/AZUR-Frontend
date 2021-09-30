import React from "react";
import PropTypes from "prop-types";
import OutputTabs from "./OutputViews/OutputTabs";
import {
  Spinner,
  Heading,
  Box,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";
import _ from "lodash";


Output.propTypes = {
  azurInput: PropTypes.object,
  azurInputError: PropTypes.object,
  azurResponse: PropTypes.object,
  azurError: PropTypes.object,
  loading: PropTypes.bool,
};

export default function Output({
  azurInput,
  azurInputError,
  azurResponse,
  azurError,
  loading,
  ...cssprops
}) {
  return (
    <Box {...cssprops}>
      <Heading size="2xl">Output</Heading>
      {loading ? (
        <Spinner color="brand.orange" />
      ) : azurInputError != null && !_.isEmpty(azurInputError) ? (
        <Alert status="error">
          <AlertIcon />
          <AlertTitle mr={2}>Ungültige Eingabe!</AlertTitle>
          <AlertDescription>
            Es besteht ein Fehler in der Eingabe. Sie müssen die Daten anpassen,
            um eine Berechnung durchführen zu können.
            
            <Heading size="md"></Heading>
          </AlertDescription>
        </Alert>
      ) : azurError != null ? (
        <Alert status="error">
          <AlertIcon />
          <AlertTitle mr={2}>Fehler bei der Berechnung</AlertTitle>
          <AlertDescription>
            Es ist ein Fehler bei der Berechnung aufgetreten:{" "}
            {azurError.message}
          </AlertDescription>
        </Alert>
      ) : (
        // everything went fine and we have results
        <OutputTabs azurResponse={azurResponse} azurInput={azurInput} />
      )}
    </Box>
  );
}
