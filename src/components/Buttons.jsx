import React from "react";
import { Button } from "@chakra-ui/react";
import PropTypes from "prop-types";


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
        setFieldValue(attributeName, presetData); // TODO ADJUST TO FORMIK
      }}
      flexGrow='1'
      p={2}
      py={6}
    >
      {children}
    </Button>
  );
}

// CHECK FOR EQULITY OF OBJECTS https://stackoverflow.com/questions/27030/comparing-arrays-of-objects-in-javascript
// TODO VERIFY RESULTS

const matchesPreset = (input, preset) => {
  if (input === null) return false;
  else if (Array.isArray(input)) return arraysEqual(input, preset);
  else if (typeof yourVariable === 'object') return objectsEqual(input, preset)
  else return input === preset

};

const objectsEqual = (o1, o2) =>
  typeof o1 === "object" && Object.keys(o1).length > 0
    ? Object.keys(o1).length === Object.keys(o2).length &&
      Object.keys(o1).every((p) => objectsEqual(o1[p], o2[p]))
    : o1 === o2;

const arraysEqual = (a1, a2) => {
  if(a1.length != a2.length) return false
  else {
    return a1.length === a2.length && a1.every((o, idx) => objectsEqual(o, a2[idx]));
  }
}
  
