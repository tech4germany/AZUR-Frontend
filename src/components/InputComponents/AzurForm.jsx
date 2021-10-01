import React from "react";
import { Form, FieldArray, useFormikContext } from "formik";
import bundestagMandatsverteilung from "../../constants/bundestagMandate.json";
import constants from "../../constants/constants.json";

import { IoMdRemove } from "react-icons/io";
import { PresetButton } from "../Buttons";
import { FieldArrayInput, FieldInput } from "./FieldArrayInput";
import PropTypes from "prop-types";

import {
  Flex,
  Stack,
  Center,
  Heading,
  Input,
  Button,
  Text,
} from "@chakra-ui/react";

AzurForm.propTypes = {
  ParentPropProvider: PropTypes.func,
};

export default function AzurForm({ ParentPropProvider }) {
  const { values, errors, setFieldValue } = useFormikContext();

  const MAX_FRACTIONS = 15;

  if (values == null) {
    return <p>Loading</p>;
  }

  return (
    <Form>
      <Center flexDirection="column">
        <FieldInput
          name="numSeats"
          type="number"
          errorMsg={errors?.numSeats}
          fontSize="4xl"
          textAlign="center"
          width="6ex"
          height="auto"
        />
        <Text fontSize="xl">Einheiten</Text>
      </Center>

      <Heading as="h3" size="xl">
        Aufteilen nach
      </Heading>
      {/* PRESET BUTTONS*/}
      <Flex flexDirection={["column", "column", "column", "row"]}>
        <PresetButton
          activeValue={values.partyStrengths}
          presetData={bundestagMandatsverteilung.btw2021}
          attributeName={"partyStrengths"}
          setFieldValue={setFieldValue}
        >
          Bundestagswahl 2021
        </PresetButton>
        <PresetButton
          activeValue={values.partyStrengths}
          presetData={bundestagMandatsverteilung.btw2017}
          attributeName={"partyStrengths"}
          setFieldValue={setFieldValue}
        >
          Bundestagswahl 2017
        </PresetButton>
      </Flex>
      <Flex flexDirection={["column", "column", "column", "row"]}>
        <PresetButton
          activeValue={values.partyStrengths}
          presetData={[
            {
              name: "SPD",
              strength: 1000000,
            },
            {
              name: "CDU",
              strength: 300000,
            },
            {
              name: "GRÜNE",
              strength: 100000,
            },
            {
              name: "LINKE",
              strength: 5000,
            },
          ]}
          attributeName={"partyStrengths"}
          setFieldValue={setFieldValue}
        >
          Demo Preset
        </PresetButton>
      </Flex>

      {/* INPUT PARTY STRENGTHS */}
      <Heading as="h3" size="xl">
        Fraktionsstärken
      </Heading>
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

      {/* MATHEMATICAL METHOD */}
      <Heading as="h3" size="xl">
        Mathematische Verfahren
      </Heading>
      <Flex flexDirection={["column", "column", "column", "row"]}>
        {constants.azurMethods.map((method) => {
          return (
            <PresetButton
              key={method.apiName}
              activeValue={values.method}
              presetData={method.apiName}
              attributeName={"method"}
              setFieldValue={setFieldValue}
            >
              {method.title}
            </PresetButton>
          );
        })}
      </Flex>
      <ParentPropProvider />
    </Form>
  );
}
