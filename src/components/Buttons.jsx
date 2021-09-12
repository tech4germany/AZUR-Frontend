import React from "react";
import Button from "react-bootstrap/Button";
import PropTypes from "prop-types";

export function MethodButton({
  apiMethodName,
  activeMethod,
  setFieldValue,
  children,
}) {
  return (
    <Button
      className="w-100 h-100"
      onClick={() => {
        setFieldValue("method", apiMethodName);
      }}
      variant={`${activeMethod == apiMethodName ? "success" : "primary"}`}
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
