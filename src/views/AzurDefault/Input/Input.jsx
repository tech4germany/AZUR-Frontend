import { Box, Flex, Heading } from "@chakra-ui/react";
import ParentStateUpdater from "components/forms/ParentStateUpdater";
import { Formik, useFormikContext } from "formik";
import PropTypes from "prop-types";
import React from "react";
import bundestagMandatsverteilung from "utils/bundestagMandate.json";
import {
  methodSchema,
  numSeatsSchema,
  partyStrengthsSchema,
} from "utils/inputValidationSchemes";
import * as Yup from "yup";
import AzurForm from "./AzurForm";

AzurInputs.propTypes = {
  azurInput: PropTypes.object,
  setAzurInput: PropTypes.func,
};

function AzurInputs({ azurInput, setAzurInput, ...cssprops }) {
  // Initial Values
  const initialValues = {
    numSeats: 13,
    method: "schepers",
    partyStrengths: bundestagMandatsverteilung[0].data,
  };

  const schema = Yup.object().shape({
    numSeats: numSeatsSchema,
    partyStrengths: partyStrengthsSchema,
    method: methodSchema,
  });

  // Validate is manually triggered in useEffect
  return (
    <Box {...cssprops}>
      <Flex>
        <Heading size="2xl">Filter</Heading>
      </Flex>
      <Formik
        initialValues={initialValues}
        validationSchema={schema}
        validateOnChange={false}
        validateOnBlur={false}
      >
        <AzurForm
          ParentStateUpdater={() => {
            const { values, validateForm } = useFormikContext();
            return (
              <ParentStateUpdater
                values={values}
                validateForm={validateForm}
                inputData={azurInput}
                setInputData={setAzurInput}
              />
            );
          }}
        />
      </Formik>
    </Box>
  );
}

export default AzurInputs;
