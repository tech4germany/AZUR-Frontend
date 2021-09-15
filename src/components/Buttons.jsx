import React from "react";
import { Button } from "@chakra-ui/react";
import PropTypes from "prop-types";

MethodButton.propTypes = {
  apiMethodName: PropTypes.string,
  activeMethod: PropTypes.string,
  setFieldValue: PropTypes.func,
  children: PropTypes.string,
};

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
      variant={`${activeMethod == apiMethodName ? "aaaa" : "outline"}`}
      m={1}
    >
      {children}
    </Button>
  );
}

PresetButton.propTypes = {
  fieldArray: PropTypes.object,
  presetData: PropTypes.array,
  children: PropTypes.string,
};

export function PresetButton({ fieldArray, presetData, children }) {
  return (
    <Button
      variant={`${
        matchesPreset(fieldArray.fields, presetData) ? "solid" : "outline"
      }`}
      m={1}
      onClick={() => {
        fieldArray.replace(presetData);
        console.log(fieldArray.fields);
      }}
    >
      {children}
    </Button>
  );
}

// CHECK FOR EQULITY OF OBJECTS https://stackoverflow.com/questions/27030/comparing-arrays-of-objects-in-javascript
// TODO VERIFY RESULTS

const matchesPreset = (input, preset) => {
  if (input === null || input.length === 0) return false;

  const inputSelect = input.map((obj) => {
    return (({ name, strength }) => ({ name, strength }))(obj);
  });

  return arraysEqual(inputSelect, preset);
};

const objectsEqual = (o1, o2) =>
  typeof o1 === "object" && Object.keys(o1).length > 0
    ? Object.keys(o1).length === Object.keys(o2).length &&
      Object.keys(o1).every((p) => objectsEqual(o1[p], o2[p]))
    : o1 === o2;

const arraysEqual = (a1, a2) =>
  a1.length === a2.length && a1.every((o, idx) => objectsEqual(o, a2[idx]));
