import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Flex,
  Heading,
  Text,
} from "@chakra-ui/react";
import _ from "lodash";
import OutputTabs from "./OutputTabs";
import React, { useContext } from "react";
import { AzurContext } from "context/AzurContext";
import Card from "theme/Card";

export default function Output({ ...cssprops }) {
  const { azurResponse, azurInput } = useContext(AzurContext);
  return (
    <Card {...cssprops} variant="organismWrapper">
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
        ) : azurResponse.error != null ? (
          <Alert status="error">
            <AlertIcon />
            <AlertTitle mr={2}>Fehler bei der Berechnung</AlertTitle>
            <AlertDescription>
              Es ist ein Fehler bei der Berechnung aufgetreten:{" "}
              {azurResponse.error.message}
            </AlertDescription>
          </Alert>
        ) : (
          // everything went fine and we have results
          <OutputTabs
            azurResponse={azurResponse.data}
            azurInput={azurInput.data}
            loading={azurResponse.loading}
          />
        )}
      </Flex>
    </Card>
  );
}
