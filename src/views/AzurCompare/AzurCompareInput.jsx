import React from "react";
import PropTypes from "prop-types";

import AzurCompareForm from "./AzurCompareForm";
import azurSchema from "../AzurDefault/Input/azurSchema";
import ParentStateUpdater from "components/forms/ParentStateUpdater";
import { Box } from "@chakra-ui/react";

import { useFormikContext, Formik } from "formik";
import bundestagMandatsverteilung from "utils/bundestagMandate.json";

AzurCompareInputs.propTypes = {
  azurInput: PropTypes.object,
  setAzurInput: PropTypes.func,
};

function AzurCompareInputs({ azurInput, setAzurInput, ...cssprops }) {
  // Initial Values
  const initialValues = {
    numSeats: 13,
    distA: {
        method: "schepers",
        partyStrengths: bundestagMandatsverteilung[0].data,
    },
    distB: {
        method: "hare",
        partyStrengths: bundestagMandatsverteilung[1].data,
    }

  };

  // Validate is manually triggered in useEffect
  return (
    <Box {...cssprops}>
      <Formik
        initialValues={initialValues}
        // validationSchema={azurSchema} TODO ADAPT VALIDATION SCHEME TO BE WORKING WITH BOTH
        validateOnChange={false}
        validateOnBlur={false}
      >
        <AzurCompareForm
          ParentStateUpdater={() => {
            const { values, validateForm } = useFormikContext();
            return (
              <ParentStateUpdater
                values={values}
                validateForm={validateForm}
                azurInput={azurInput}
                setAzurInput={setAzurInput}
              />
            );
          }}
        />
      </Formik>
    </Box>
  );
}

export default AzurCompareInputs;
