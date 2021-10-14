import ParentStateUpdater from "components/forms/ParentStateUpdater";
import { Formik, useFormikContext } from "formik";
import PropTypes from "prop-types";
import React from "react";
import Card from "theme/Card";
import bundestagMandatsverteilung from "utils/bundestagMandate.json";
import {
  methodSchema,
  numSeatsSchema,
  partyStrengthsSchema,
} from "utils/inputValidationSchemes";
import * as Yup from "yup";
import AzurCompareForm from "./AzurCompareForm";

AzurCompareInputs.propTypes = {
  azurCompareInput: PropTypes.object,
  setAzurCompareInput: PropTypes.func,
};

function AzurCompareInputs({
  azurCompareInput,
  setAzurCompareInput,
  ...cssprops
}) {
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
    },
  };
  // Validation Schema
  const schema = Yup.object().shape({
    numSeats: numSeatsSchema,
    distA: Yup.object().shape({
      partyStrengths: partyStrengthsSchema,
      method: methodSchema,
    }),
    distB: Yup.object().shape({
      partyStrengths: partyStrengthsSchema,
      method: methodSchema,
    }),
  });

  // Render
  return (
    <Card {...cssprops}>
      <Formik
        initialValues={initialValues}
        validationSchema={schema}
        validateOnChange={false} // Validate is manually triggered in useEffect
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
    </Card>
  );
}

export default AzurCompareInputs;
