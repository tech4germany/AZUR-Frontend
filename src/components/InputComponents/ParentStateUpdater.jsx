import React from "react";
import { arraysEqual } from "../../utils/equalityChecks";
import _ from "lodash";
import { useFormikContext } from "formik";

const ParentStateUpdater = ({ azurInput, setAzurInput }) => {
  const DEBOUNCE_DELAY = 300; // we wait for additional input for 300ms before  updating the input

  const { values, validateForm } = useFormikContext();
  const debouncedSetAzur = React.useCallback(
    _.debounce(async (values, validateForm, azurInput, setAzurInput) => {
      // cancel update if nothing has changed
      if (
        arraysEqual(azurInput.data.partyStrengths, values.partyStrengths) &&
        azurInput.data.method === values.method &&
        azurInput.data.num_of_seats === values.numSeats
      ) {
        return null;
      }
      // otherwise trigger a debounced update
      updateAzurInput(values, validateForm, azurInput, setAzurInput);
    }, DEBOUNCE_DELAY),
    []
  );

  const updateAzurInput = async (
    values,
    validateForm,
    azurInput,
    setAzurInput
  ) => {
    // validate input changes for form
    const errors = await validateForm();

    // update the parent state //TODO reset data to null if there is an error and add additional logic to prevent infinite loops
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

  React.useEffect(() => {
    debouncedSetAzur(values, validateForm, azurInput, setAzurInput);
  }, [values]);
  return null;
};

export default ParentStateUpdater;
