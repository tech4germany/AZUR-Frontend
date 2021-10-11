import React from "react";
import PropTypes from "prop-types";

import AzurCompareForm from "./AzurCompareForm";
import ParentStateUpdater from "components/forms/ParentStateUpdater";
import { Box } from "@chakra-ui/react";
import {
  methodSchema,
  numSeatsSchema,
  partyStrengthsSchema,
} from "utils/inputValidationSchemes";
import * as Yup from "yup";

import { useFormikContext, Formik } from "formik";
import bundestagMandatsverteilung from "utils/bundestagMandate.json";

AzurCompareInputs.propTypes = {
  azurCompareInput: PropTypes.object,
  setAzurCompareInput: PropTypes.func,
};

function AzurCompareInputs({ azurCompareInput, setAzurCompareInput, ...cssprops }) {
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

  const schema = Yup.object().shape({
    numSeats: numSeatsSchema,
    distA: Yup.object().shape({
      partyStrengths: partyStrengthsSchema,
      method: methodSchema,
    }),
    distB: Yup.object().shape({
      partyStrengths: partyStrengthsSchema,
      method: methodSchema,
    })
  });


  // Validate is manually triggered in useEffect
  return (
    <Box {...cssprops}>
      <Formik
        initialValues={initialValues}
        validationSchema={schema}
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
                inputData={azurCompareInput}
                setInputData={setAzurCompareInput}
              />
            );
          }}
        />
      </Formik>
    </Box>
  );
}

export default AzurCompareInputs;
