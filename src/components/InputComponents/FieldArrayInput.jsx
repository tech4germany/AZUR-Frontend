import { Field } from "formik";
import { Input } from "@chakra-ui/react";
import PropTypes from "prop-types";
import React from "react";

FieldArrayInput.propTypes = {
  fieldArrayName: PropTypes.string,
  index: PropTypes.number,
  fieldKey: PropTypes.string,
  fieldType: PropTypes.string,
  errors: PropTypes.object,
};

export default function FieldArrayInput({
  fieldArrayName,
  index,
  fieldKey,
  fieldType,
  errors,
}) {
  return (
    <Field
      as={Input}
      name={`${fieldArrayName}.${index}.${fieldKey}`}
      variant={
        errorForFieldExists(errors?.[fieldArrayName], index, fieldKey) ? "glowing" : ""
      }
      title={
        errorForFieldExists(errors?.[fieldArrayName], index, fieldKey)
          ? errors[fieldArrayName][index][fieldKey]
          : ""
      }
      type={fieldType}
    />
  );
}

const errorForFieldExists = (arrayErrors, index, fieldKey) => {
  if (
    arrayErrors != null &&
    Array.isArray(arrayErrors) &&
    Object.prototype.hasOwnProperty.call(arrayErrors, index) &&
    arrayErrors[index][fieldKey] != null
  ) {
    return true;
  } else {
    return false;
  }
};
