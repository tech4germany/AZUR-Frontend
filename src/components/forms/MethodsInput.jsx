import React from 'react'
import PropTypes from 'prop-types'
import { Heading, Wrap } from "@chakra-ui/react";
import constants from "utils/constants.json";
import PresetButton from "./PresetButtons";
import _ from "lodash";


const MethodsInput = ({ values, attributeKey, setFieldValue }) => {

  return (
    <>
      <Heading as="h3" size="xl">
        Mathematische Verfahren
      </Heading>
      <Wrap shouldWrapChildren={true}>
        {constants.azurMethods.map((method) => {
          return (
            <PresetButton
              key={method.apiName}
              activeValue={_.get(values, attributeKey, [])}
              presetData={method.apiName}
              attributeName={attributeKey}
              setFieldValue={setFieldValue}
            >
              {method.title}
            </PresetButton>
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
}


export default MethodsInput