import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Flex,
  Heading,
} from "@chakra-ui/react";
import _ from "lodash";
import OutputTabs from "./OutputTabs";
import React, { useContext } from "react";
import { AzurContext } from "context/AzurContext";
import Card from "theme/Card";
import InputErrorFeedback from "./InputErrorFeedback";

export default function Output({ ...cssprops }) {
  const { azurResponse, azurInput } = useContext(AzurContext);
  return (
    <Card {...cssprops} variant="organismWrapper">
      <Heading size="2xl">Verteilung</Heading>
      <Flex flexDirection="column">
        {!_.isEmpty(azurInput.errors) ? (
          <InputErrorFeedback inputErrors={azurInput.errors} />
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
