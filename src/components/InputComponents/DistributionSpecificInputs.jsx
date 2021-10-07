import { Heading, Wrap } from "@chakra-ui/react";
import PropTypes from "prop-types";
import React from "react";
import bundestagMandatsverteilung from "../../constants/bundestagMandate.json";
import constants from "../../constants/constants.json";
import { PresetButton } from "../Buttons";
import PartyStrengthsFieldArray from "./PartyStrengthsFieldArray";
import _ from "lodash";

const DistributionSpecificInputs = ({
  values,
  errors,
  setFieldValue,
  MAX_FRACTIONS,
  attributeKeyBase,
}) => {
  let partyStrengthsKey = "";
  let methodsKey = "";
  if (attributeKeyBase != "") {
    partyStrengthsKey = `${attributeKeyBase}.partyStrengths`;
    methodsKey = `${attributeKeyBase}.method`;
  } else {
    partyStrengthsKey = `partyStrengths`;
    methodsKey = `method`;
  }


  // TODO THE ISSUE FOR NOW IS THAT values[string.with.dot] does not return an actual value

  
  return (
    <>
      {/* PARTY STRENGHTS PRESET BUTTONS*/}
      <Heading as="h3" size="xl">
        Aufteilen nach
      </Heading>
      <Wrap shouldWrapChildren={true}>
        {bundestagMandatsverteilung.map((mandatePreset) => (
          <PresetButton
            key={mandatePreset.key}
            activeValue={_.get(values, partyStrengthsKey, [])}
            presetData={mandatePreset.data}
            attributeName={partyStrengthsKey}
            setFieldValue={setFieldValue}
          >
            {mandatePreset.title}
          </PresetButton>
        ))}
      </Wrap>

      {/* INPUT PARTY STRENGTHS */}
      <Heading as="h3" size="xl">
        Fraktionsstärken
      </Heading>
      <PartyStrengthsFieldArray
        fieldArrayName={partyStrengthsKey}
        values={values}
        errors={errors}
        MAX_FRACTIONS={MAX_FRACTIONS}
      />

      {/* MATHEMATICAL METHODS */}
      <Heading as="h3" size="xl">
        Mathematische Verfahren
      </Heading>
      <Wrap shouldWrapChildren={true}>
        {constants.azurMethods.map((method) => {
          return (
            <PresetButton
              key={method.apiName}
              activeValue={ _.get(values, methodsKey, [])}
              presetData={method.apiName}
              attributeName={methodsKey}
              setFieldValue={setFieldValue}
            >
              {method.title}
            </PresetButton>
          );
        })}
      </Wrap>
    </>
  );
};

export default DistributionSpecificInputs;

DistributionSpecificInputs.propTypes = {
  values: PropTypes.object,
  errors: PropTypes.object,
  setFieldValue: PropTypes.func,
  MAX_FRACTIONS: PropTypes.number,
  attributeKeyBase: PropTypes.string,
};
