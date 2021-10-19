import { Heading, Grid, GridItem } from "@chakra-ui/react";
import PartyStrengthsFieldArray from "components/forms/PartyStrengthsFieldArray";
import _ from "lodash";
import React from "react";
import bundestagMandatsverteilung from "utils/bundestagMandate.json";
import PresetButton from "./PresetButton";
import PropTypes from "prop-types";

const PartyStrengthsInput = ({
  values,
  errors,
  setFieldValue,
  MAX_FRACTIONS,
  attributeKey,
}) => {
  return (
    <>
      <Heading as="h3" size="xl">
        Fraktionsstärken
      </Heading>
      <PartyStrengthsPresetButtons
        values={values}
        setFieldValue={setFieldValue}
        partyStrengthsKey={attributeKey}
      />

      <PartyStrengthsFieldArray
        fieldArrayName={attributeKey}
        values={values}
        errors={errors}
        MAX_FRACTIONS={MAX_FRACTIONS}
      />
    </>
  );
};

PartyStrengthsInput.propTypes = {
  values: PropTypes.object,
  errors: PropTypes.object,
  setFieldValue: PropTypes.func,
  MAX_FRACTIONS: PropTypes.number,
  attributeKey: PropTypes.string,
};

export default PartyStrengthsInput;

const PartyStrengthsPresetButtons = ({
  values,
  setFieldValue,
  partyStrengthsKey,
}) => {
  return (
    <Grid columnGap={3} templateColumns="repeat(auto-fill, minmax(15ex, 1fr))">
      {bundestagMandatsverteilung.map((mandatePreset) => (
        <GridItem key={mandatePreset.key}>
          <PresetButton
            activeValue={_.get(values, partyStrengthsKey, [])}
            presetData={mandatePreset.data}
            attributeName={partyStrengthsKey}
            setFieldValue={setFieldValue}
            width="100%"
          >
            {mandatePreset.title}
          </PresetButton>
        </GridItem>
      ))}
    </Grid>
  );
};

PartyStrengthsPresetButtons.propTypes = {
  values: PropTypes.object,
  setFieldValue: PropTypes.func,
  partyStrengthsKey: PropTypes.string,
};
