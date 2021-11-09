import React from "react";
import PropTypes from "prop-types";
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Text,
} from "@chakra-ui/react";

export const InputErrorFeedback = ({ inputErrors }) => {
  return (
    <Alert status="error">
      <AlertIcon />
      <AlertTitle mr={2}>Ungültige Eingabe!</AlertTitle>
      <AlertDescription>
        {inputErrors.numSeats != null && (
          <>
            <Text mt={3} fontWeight="bold">
              Fehler bei der Eingabe der Einheiten
            </Text>
            <Text>{inputErrors.numSeats}</Text>
          </>
        )}
        {inputErrors.partyStrengths != null && (
          <>
            <Text mt={3} fontWeight="bold">
              Fehler bei der Eingabe der Fraktionsstärken
            </Text>
            {typeof inputErrors.partyStrengths === "string" ? ( // Errors that are on FieldArray Level
              <Text>{inputErrors.partyStrengths}</Text>
            ) : (
              inputErrors.partyStrengths.map((errorEntry, index) => {
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
  );
};

InputErrorFeedback.propTypes = {
  inputErrors: PropTypes.object,
};

export default InputErrorFeedback;
