import React from "react";
import { Button } from "@chakra-ui/react";
import PropTypes from "prop-types";
import { objectsEqual, arraysEqual } from '../utils/equalityChecks'



PresetButton.propTypes = {
  setFieldValue: PropTypes.func,
  activeValue: PropTypes.any,
  presetData: PropTypes.any,
  attributeName: PropTypes.string,
  children: PropTypes.string,
};

export function PresetButton({ activeValue, presetData, attributeName, setFieldValue,  children }) {
  return (
    <Button
      variant={`${
        matchesPreset(activeValue, presetData) ? "active" : "outline"
      }`}
      onClick={() => {
        setFieldValue(attributeName, presetData);
      }}
      flexGrow='1'
      p={2}
      py={6}
    >
      {children}
    </Button>
  );
}

// CHECK FOR EQUALITY OF OBJECTS https://stackoverflow.com/questions/27030/comparing-arrays-of-objects-in-javascript

const matchesPreset = (input, preset) => {
  if (input === null) return false;
  else if (Array.isArray(input)) return arraysEqual(input, preset);
  else if (typeof yourVariable === 'object') return objectsEqual(input, preset)
  else return input === preset

};

