import PropTypes from "prop-types";
import React from "react";
import PartyStrengthsInput from "./PartyStrengthsInput";
import MethodsInput from "./MethodsInput";

const DistributionSpecificInputs = ({
  values,
  errors,
  setFieldValue,
  MAX_FRACTIONS,
  attributeKeyBase,
}) => {

  // TODO THE ISSUE FOR NOW IS THAT values[string.with.dot] does not return an actual value

  
  return (
    <>
      {/* INPUT PARTY STRENGTHS */}
      <PartyStrengthsInput
          values={values}
          errors={errors}
          setFieldValue={setFieldValue}
          MAX_FRACTIONS={MAX_FRACTIONS}
          attributeKeyBase={attributeKeyBase}
      />
      <MethodsInput
        values={values}
        setFieldValue={setFieldValue}
        attributeKeyBase={attributeKeyBase}
      />
    </>
  );
};

export default DistributionSpecificInputs;

DistributionSpecificInputs.propTypes = {
  values: PropTypes.object,
  errors: PropTypes.object,
  setFieldValue: PropTypes.func,
  MAX_FRACTIONS: PropTypes.number,
  attributeKeyBase: PropTypes.string,
};
