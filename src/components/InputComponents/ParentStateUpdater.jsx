import React from "react";
import _ from "lodash";
import { useFormikContext } from "formik";

const ParentStateUpdater = ({ azurInput, setAzurInput }) => {
  const DEBOUNCE_DELAY = 300; // we wait for additional input for 300ms before  updating the input

  const { values, validateForm } = useFormikContext();
  const debouncedSetAzur = React.useCallback(
    _.debounce(async (values, validateForm, azurInput, setAzurInput) => {
      // validate input changes for form
      const errors = await validateForm();

      if (_.isEmpty(errors)) {
        // Update to values and no error exists
        // rename numSeats for equality check -> TODO lets completely get rid of this thing by having consistent naming between backend/frontend
        const { num_of_seats, ...otherInputs } = azurInput?.data;
        const inputCopy = { ...otherInputs, numSeats: num_of_seats };

        if (_.isEqual(inputCopy, values)) {
          return null;
        }
        // an actual value change occured ->  update the parent state
        setAzurInput({
          errors: {},
          data: {
            method: values.method,
            num_of_seats: values.numSeats, // backend num seats naming
            partyStrengths: values.partyStrengths,
          },
        });
      } else {
        // There is an error in the form input
        if (_.isEqual(azurInput.errors, errors)) {
          return null;
        }
        // an actual error change occured ->  update the parent state
        setAzurInput({
          errors,
          data: {},
        });
      }
    }, DEBOUNCE_DELAY),
    []
  );

  React.useEffect(() => {
    debouncedSetAzur(values, validateForm, azurInput, setAzurInput);
  }, [values]);
  return null;
};

export default ParentStateUpdater;
