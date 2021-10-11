import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Flex,
  Heading,
  Text,
} from "@chakra-ui/react";
import _ from "lodash";
import PropTypes from "prop-types";
import React from "react";
import OutputTabs from "./OutputTabs";

Output.propTypes = {
  azurInput: PropTypes.object,
  azurResponse: PropTypes.object,
  azurError: PropTypes.object,
  loading: PropTypes.bool,
};

export default function Output({
  azurInput,
  azurResponse,
  azurError,
  loading,
  ...cssprops
}) {
  return (
    <Box {...cssprops}>
      <Heading size="2xl">Verteilung</Heading>
      <Flex flexDirection="column">
        {!_.isEmpty(azurInput.errors) ? (
          <Alert status="error">
            <AlertIcon />
            <AlertTitle mr={2}>Ungültige Eingabe!</AlertTitle>
            <AlertDescription>
              {azurInput.errors.numSeats != null && (
                <>
                  <Text mt={3} fontWeight="bold">
                    Fehler bei der Eingabe der Einheiten
                  </Text>
                  <Text>{azurInput.errors.numSeats}</Text>
                </>
              )}
              {azurInput.errors.partyStrengths != null && (
                <>
                  <Text mt={3} fontWeight="bold">
                    Fehler bei der Eingabe der Fraktionsstärken
                  </Text>
                  {typeof azurInput.errors.partyStrengths === "string" ? ( // Errors that are on FieldArray Level
                    <Text>{azurInput.errors.partyStrengths}</Text>
                  ) : (
                    azurInput.errors.partyStrengths.map((errorEntry, index) => {
                      return errorEntry.strength ? (
                        <Text key={index + "strengthError"}>
                          {errorEntry.strength}
                        </Text>
                      ) : (
                        <Text key={index + "nameError"}>{errorEntry.name}</Text>
                      );
                    })
                  )}
                </>
              )}
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
          <OutputTabs
            azurResponse={azurResponse}
            azurInput={azurInput.data}
            loading={loading}
          />
        )}
      </Flex>
    </Box>
  );
}
