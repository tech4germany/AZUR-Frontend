import React from "react";
import { FieldArray } from "formik";

import { IoMdRemove } from "react-icons/io";
import { FieldArrayInput } from "./FieldArrayInput";
import PropTypes from "prop-types";

import { Flex, Stack, Input, Button, Text } from "@chakra-ui/react";


const PartyStrengthsFieldArray = ({ values, errors, MAX_FRACTIONS }) => {
  return (
    <FieldArray name="partyStrengths">
      {({ remove, push }) => (
        <Stack
          p={2}
          layerStyle={
            errors?.partyStrengths != null &&
            typeof errors.partyStrengths === "string"
              ? "errorGlow"
              : ""
          }
          title={
            errors?.partyStrengths != null &&
            typeof errors.partyStrengths === "string"
              ? errors.partyStrengths
              : "Fraktionsstärken"
          }
        >
          {values.partyStrengths.length > 0 &&
            values.partyStrengths.map((_, index) => (
              <Flex key={index} flexDirection="row">
                <FieldArrayInput
                  fieldKey="name"
                  fieldArrayName="partyStrengths"
                  index={index}
                  fieldType="text"
                  errors={errors}
                />
                <FieldArrayInput
                  fieldKey="strength"
                  fieldArrayName="partyStrengths"
                  index={index}
                  fieldType="number"
                  errors={errors}
                />
                <Button
                  variant="ghost"
                  isDisabled={values.partyStrengths.length <= 1}
                  title={
                    values.partyStrengths.length > 1
                      ? "Fraktion entfernen"
                      : "Fraktion kann nicht entfernt werden, da es mindestens eine Fraktion geben muss."
                  }
                  onClick={() => remove(index)}
                >
                  <IoMdRemove />
                </Button>
              </Flex>
            ))}

          {/*ADD FRACTION*/}
          <Button
            variant="ghost"
            _hover={{
              backgroundColor: "brand.darkBlueAlpha.300",
            }}
            px={0}
            m={0}
            mt={1}
            width={"100%"}
            isDisabled={values.partyStrengths.length >= MAX_FRACTIONS}
            title={
              values.partyStrengths.length < MAX_FRACTIONS
                ? "Fraktion hinzufügen"
                : `Es können keine weiteren Fraktion hinzugefügt werden. Dieser Rechner unterstützt maximal ${MAX_FRACTIONS} Einträge für Fraktionen.`
            }
            onClick={() => push({ name: "Fraktion XYZ", strength: 0 })}
          >
            <Flex flexDirection="row" m={0} width={"100%"}>
              <Input disabled variant="fakeInput" />
              <Input disabled variant="fakeInput" />
              <Button as="span" variant="ghost" pointerEvents="none">
                <Text color="blackAlpha.400">+</Text>
              </Button>
            </Flex>
          </Button>
        </Stack>
      )}
    </FieldArray>
  );
};

PartyStrengthsFieldArray.propTypes = {
    values: PropTypes.object,
    errors: PropTypes.object,
    MAX_FRACTIONS: PropTypes.number,
  };
  

export default PartyStrengthsFieldArray