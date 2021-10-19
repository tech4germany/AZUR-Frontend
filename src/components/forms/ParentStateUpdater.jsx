import React from "react";
import _ from "lodash";
import { useFormikContext } from "formik";

const ParentStateUpdater = ({ inputData, setInputData }) => {
  const DEBOUNCE_DELAY = 550; // we wait for additional input for 300ms before  updating the input

  const { values, validateForm } = useFormikContext();
  const debouncedSetAzur = React.useCallback(
    _.debounce(async (values, validateForm, inputData, setInputData) => {
      // validate input changes for form
      const errors = await validateForm();

      if (_.isEmpty(errors)) {
        // Update to values and no error exists
        // rename numSeats for equality check
        const { num_of_seats, ...otherInputs } = inputData?.data;
        const inputCopy = { ...otherInputs, numSeats: num_of_seats };

        if (_.isEqual(inputCopy, values)) {
          return null;
        }
        // an actual value change occured ->  update the parent state
        setInputData({
          errors: {},
          data: {
            ...values,
            num_of_seats: values.numSeats,
          },
        });
      } else {
        // There is an error in the form input
        if (_.isEqual(inputData.errors, errors)) {
          return null;
        }
        // an actual error change occured ->  update the parent state
        setInputData({
          errors,
          data: {},
        });
      }
    }, DEBOUNCE_DELAY),
    []
  );

  React.useEffect(() => {
    debouncedSetAzur(values, validateForm, inputData, setInputData);
  }, [values]);
  return null;
};

export default ParentStateUpdater;
