import React from "react";
import PropTypes from "prop-types";

import AzurForm from "./InputComponents/AzurForm";
import azurSchema from "./InputComponents/azurSchema";
import { Box } from "@chakra-ui/react";

import { useFormikContext, Formik } from "formik";
import bundestagMandatsverteilung from "../constants/bundestagMandate.json";
import { arraysEqual, objectsEqual } from "../utils/equalityChecks";

AzurInputs.propTypes = {
  azurInput: PropTypes.object,
  setAzurInput: PropTypes.func,
};

function AzurInputs({ azurInput, setAzurInput, ...cssprops }) {
  // Initial Values
  const initialValues = {
    numSeats: 13, //TODO reset to 25
    method: "schepers",
    partyStrengths: bundestagMandatsverteilung.btw2021,
  };

  const ParentPropProvider = () => {
    const { values, errors } = useFormikContext();

    React.useEffect(() => {
      if (objectsEqual(azurInput.errors, errors)) {
        return null;
      } else {
        setAzurInput({
          ...azurInput,
          errors: errors,
        });
      }
    }, [errors]);

    React.useEffect(() => {
      if (
        arraysEqual(azurInput.data.partyStrengths, values.partyStrengths) &&
        azurInput.data.method === values.method &&
        azurInput.data.num_of_seats === values.numSeats
      ) {
        return null;
      }
      setAzurInput({
        ...azurInput,
        data: {
          method: values.method,
          num_of_seats: values.numSeats,
          partyStrengths: values.partyStrengths,
        },
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
