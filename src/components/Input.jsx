import React from "react";
import PropTypes from "prop-types";

import AzurForm from "./InputComponents/AzurForm";
import azurSchema from "./InputComponents/azurSchema"
import { Box } from "@chakra-ui/react";

import { useFormikContext, Formik } from "formik";
import bundestagMandatsverteilung from "../constants/bundestagMandate.json";

import { arraysEqual } from "../utils/equalityChecks";

AzurInputs.propTypes = {
  azurInput: PropTypes.object,
  setAzurInput: PropTypes.func,
  setAzurInputError: PropTypes.func
};

function AzurInputs({ azurInput, setAzurInput, setAzurInputError, ...cssprops }) {
  // Initial Values
  const initialValues = {
    numSeats: 13, //reset to 25
    method: "dhondt", //reset to schepers
    partyStrengths: bundestagMandatsverteilung.btw2021,
  };



  const ParentPropProvider = () => {
    const { values, errors } = useFormikContext();
    React.useEffect(() => {
      console.log(errors)
      setAzurInputError(errors)
      if (
        arraysEqual(azurInput.partyStrengths, values.partyStrengths) &&
        azurInput.method === values.method &&
        azurInput.num_of_seats === values.numSeats
      ) {
        return null;
      }
      setAzurInput({
        method: values.method,
        num_of_seats: values.numSeats,
        partyStrengths: values.partyStrengths,
      });
    }, [values]);
    return null;
  };

  return (
    <Box {...cssprops}>
      <Formik initialValues={initialValues} validationSchema={azurSchema}>
        <AzurForm ParentPropProvider={ParentPropProvider} />
      </Formik>
    </Box>
  );
}

export default AzurInputs;
