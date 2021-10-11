import React from "react";
import PropTypes from "prop-types";
import { Heading, Wrap, WrapItem } from "@chakra-ui/react";
import constants from "utils/constants.json";
import PresetButton from "./PresetButton";
import _ from "lodash";

const MethodsInput = ({ values, attributeKey, setFieldValue }) => {
  return (
    <>
      <Heading as="h3" size="xl">
        Mathematische Verfahren
      </Heading>
      <Wrap>
        {constants.azurMethods.map((method) => {
          return (
            <WrapItem flexGrow="1" key={method.apiName}>
              <PresetButton
                activeValue={_.get(values, attributeKey, [])}
                presetData={method.apiName}
                attributeName={attributeKey}
                setFieldValue={setFieldValue}
                flexGrow="1"
              >
                {method.title}
              </PresetButton>
            </WrapItem>
          );
        })}
      </Wrap>
    </>
  );
};

MethodsInput.propTypes = {
  values: PropTypes.object,
  attributeKey: PropTypes.string,
  setFieldValue: PropTypes.func,
};

export default MethodsInput;
