import React from "react";
import { Button } from "@chakra-ui/react";
import PropTypes from "prop-types";
import _ from "lodash";


PresetButton.propTypes = {
  setFieldValue: PropTypes.func,
  activeValue: PropTypes.any,
  presetData: PropTypes.any,
  attributeName: PropTypes.string,
  children: PropTypes.string,
};

export function PresetButton({ activeValue, presetData, attributeName, setFieldValue,  children, ...cssprops }) {
  return (
    <Button
      variant={`${
        _.isEqual(activeValue, presetData) ? "active" : "outline"
      }`}
      onClick={() => {
        setFieldValue(attributeName, presetData);
      }}
      width="30ex"
      {...cssprops}
    >
      {children}
    </Button>
  );
}
