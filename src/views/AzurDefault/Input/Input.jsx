import React from "react";
import PropTypes from "prop-types";

import AzurForm from "./AzurForm";
import azurSchema from "./azurSchema";
import ParentStateUpdater from "../../../components/forms/ParentStateUpdater";
import { Box } from "@chakra-ui/react";

import { useFormikContext, Formik } from "formik";
import bundestagMandatsverteilung from "utils/bundestagMandate.json";

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

  // Validate is manually triggered in useEffect
  return (
    <Box {...cssprops}>
      <Formik
        initialValues={initialValues}
        validationSchema={azurSchema}
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

export default AzurInputs;
