import { Center, Wrap, Heading, Text } from "@chakra-ui/react";
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
      <Wrap shouldWrapChildren={true}>
        {bundestagMandatsverteilung.map((mandatePreset) => 
          <PresetButton
            key={mandatePreset.key}
            activeValue={values.partyStrengths}
            presetData={mandatePreset.data}
            attributeName={"partyStrengths"}
            setFieldValue={setFieldValue}
          >
            {mandatePreset.title}
          </PresetButton>
        )}
      </Wrap>

      {/* INPUT PARTY STRENGTHS */}
      <Heading as="h3" size="xl">
        Fraktionsstärken
      </Heading>
      <PartyStrengthsFieldArray
        fieldArrayName="partyStrengths"
        values={values}
        errors={errors}
        MAX_FRACTIONS={MAX_FRACTIONS}
      />

      {/* MATHEMATICAL METHODS */}
      <Heading as="h3" size="xl">
        Mathematische Verfahren
      </Heading>
      <Wrap shouldWrapChildren={true} >
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
      </Wrap>
      <ParentPropProvider />
    </Form>
  );
}
