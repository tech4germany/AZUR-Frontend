import React from "react";
import PropTypes from "prop-types";

import AzurForm from "./InputComponents/AzurForm";
import azurSchema from "./InputComponents/azurSchema";
import { Box } from "@chakra-ui/react";

import _ from "lodash";

import { useFormikContext, Formik } from "formik";
import bundestagMandatsverteilung from "../constants/bundestagMandate.json";
import { arraysEqual } from "../utils/equalityChecks";

AzurInputs.propTypes = {
  azurInput: PropTypes.object,
  setAzurInput: PropTypes.func,
};

function AzurInputs({ azurInput, setAzurInput, ...cssprops }) {
  // Initial Values
  const initialValues = {
    numSeats: 13,
    method: "schepers",
    partyStrengths: bundestagMandatsverteilung.btw2021,
  };
  const DEBOUNCE_DELAY = 300; // we wait for additional input for 700ms before  updating the input

  const debouncedSetAzur = React.useCallback(
    _.debounce(async (values, azurInput, validateForm) => {
      // cancel update if nothing has changed
      if (
        arraysEqual(azurInput.data.partyStrengths, values.partyStrengths) &&
        azurInput.data.method === values.method &&
        azurInput.data.num_of_seats === values.numSeats
      ) {
        return null;
      }
      // otherwise trigger a debounced update
      updateAzurInput(values, validateForm);
    }, DEBOUNCE_DELAY),
    []
  );

  const updateAzurInput = async (values, validateForm) => {
    // validate input changes for form
    const errors = await validateForm();

    // update the parent state
    setAzurInput({
      ...azurInput,
      errors,
      data: {
        method: values.method,
        num_of_seats: values.numSeats,
        partyStrengths: values.partyStrengths,
      },
    });
  };

  const ParentPropProvider = () => {
    const { values, validateForm } = useFormikContext();

    React.useEffect(() => {
      debouncedSetAzur(values, azurInput, validateForm);
    }, [values]);
    return null;
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
        <AzurForm ParentPropProvider={ParentPropProvider} />
      </Formik>
    </Box>
  );
}

export default AzurInputs;
