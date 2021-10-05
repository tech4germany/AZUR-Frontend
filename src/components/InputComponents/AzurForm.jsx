import { Center, Flex, Heading, Text } from "@chakra-ui/react";
import { Form, useFormikContext } from "formik";
import PropTypes from "prop-types";
import React from "react";
import bundestagMandatsverteilung from "../../constants/bundestagMandate.json";
import constants from "../../constants/constants.json";
import { PresetButton } from "../Buttons";
import { FieldInput } from "./FieldArrayInput";
import PartyStrengthsFieldArray from "./PartyStrengthsFieldArray";

AzurForm.propTypes = {
  ParentPropProvider: PropTypes.func,
};

export default function AzurForm({ ParentPropProvider }) {
  const { values, errors, setFieldValue } = useFormikContext();

  const MAX_FRACTIONS = 15;

  return (
    <Form>
      {/* NUM SEATS */}
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

      {/* PARTY STRENGHTS PRESET BUTTONS*/}
      <Heading as="h3" size="xl">
        Aufteilen nach
      </Heading>
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
          presetData={bundestagMandatsverteilung.weirdDemo}
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
      <PartyStrengthsFieldArray
        values={values}
        errors={errors}
        MAX_FRACTIONS={MAX_FRACTIONS}
      />

      {/* MATHEMATICAL METHODS */}
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
