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

export function FieldArrayInput({
  fieldArrayName,
  index,
  fieldKey,
  fieldType,
  errors,
}) {
  return (
    <FieldInput
      name={`${fieldArrayName}.${index}.${fieldKey}`}
      errorMsg={
        errorForFieldExists(errors?.[fieldArrayName], index, fieldKey)
          ? errors[fieldArrayName][index][fieldKey]
          : null
      }
      type={fieldType}
    />
  );
}

FieldInput.propTypes = {
  name: PropTypes.string,
  errorMsg: PropTypes.string,
  type: PropTypes.string,
};

export function FieldInput({ name, errorMsg, type, ...cssprops }) {
  return (
    <Field
      as={Input}
      name={name}
      layerStyle={errorMsg != null ? "errorGlow" : ""}
      title={errorMsg != null ? errorMsg : ""}
      type={type}
      {...cssprops}
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
