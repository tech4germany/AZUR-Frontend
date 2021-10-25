import { Heading, Grid, GridItem, Box } from "@chakra-ui/react";
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
    <Box>
      <Heading as="h4" size="lg">
        Voreinstellungen
      </Heading>
      <PartyStrengthsPresetButtons
        values={values}
        setFieldValue={setFieldValue}
        partyStrengthsKey={attributeKey}
      />
      <Heading as="h4" size="lg">
        Manuelle Eingabe
      </Heading>
      <PartyStrengthsFieldArray
        fieldArrayName={attributeKey}
        values={values}
        errors={errors}
        MAX_FRACTIONS={MAX_FRACTIONS}
      />
    </Box>
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
    <Grid
      columnGap={3}
      rowGap={3}
      templateColumns="repeat(auto-fit, minmax(30ex, 1fr))" // TODO back to minmax( 15ex or have them always take full width)
    >
      {bundestagMandatsverteilung.map((mandatePreset) => (
        <GridItem key={mandatePreset.key}>
          <PresetButton
            activeValue={_.get(values, partyStrengthsKey, [])}
            presetData={mandatePreset.data}
            attributeName={partyStrengthsKey}
            setFieldValue={setFieldValue}
            width="100%"
            m={0}
            title={
              mandatePreset?.label != null
                ? mandatePreset.label
                : "Voreinstellung für Fraktionsstärken - Klicken um zu aktivieren"
            }
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
