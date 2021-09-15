import React from "react";
import { Button } from '@chakra-ui/react'
import PropTypes from "prop-types";

export function MethodButton({
  apiMethodName,
  activeMethod,
  setFieldValue,
  children,
}) {
  return (
    <Button
      onClick={() => {
        setFieldValue("method", apiMethodName);
      }}
      variant={`${activeMethod == apiMethodName ? "solid" : "outline"}`}
      m={1}
    >
      {children}
    </Button>
  );
}

MethodButton.propTypes = {
  apiMethodName: PropTypes.string,
  activeMethod: PropTypes.string,
  setFieldValue: PropTypes.func,
  children: PropTypes.string,
};


PresetButton.propTypes = {
  currentInput: PropTypes.object,
  presetData: PropTypes.object,
  setValue: PropTypes.func,
  attribute: PropTypes.string,
  children: PropTypes.string
};


export function PresetButton({currentInput, presetData, setValue, attribute, children}) {
  return(
      <Button
      variant={`${
      // TODO Implement more systematic equality check!
        JSON.stringify(currentInput) ==
        JSON.stringify(presetData)
          ? "solid"
          : "outline"
      }`}
      m={1}

      onClick={() => {
        console.log(
          JSON.stringify(currentInput) ==
            JSON.stringify(presetData)
        );
        setValue(
          {attribute},
          presetData
        );
      }}
    >
      {children}
    </Button>
  )

}