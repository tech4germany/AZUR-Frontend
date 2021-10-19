import React from "react";
import PropTypes from "prop-types";
import { Heading, Grid, GridItem } from "@chakra-ui/react";
import constants from "utils/constants.json";
import PresetButton from "./PresetButton";
import _ from "lodash";

const MethodsInput = ({ values, attributeKey, setFieldValue }) => {
  return (
    <>
      <Heading as="h3" size="xl">
        Mathematische Verfahren
      </Heading>
      <Grid columnGap={3} templateColumns="repeat(auto-fit, minmax(15ex, 1fr))">
        {constants.azurMethods.map((method) => {
          return (
            <GridItem key={method.apiName}>
              <PresetButton
                activeValue={_.get(values, attributeKey, [])}
                presetData={method.apiName}
                attributeName={attributeKey}
                setFieldValue={setFieldValue}
                width="100%"
              >
                {method.title}
              </PresetButton>
            </GridItem>
          );
        })}
      </Grid>
    </>
  );
};

MethodsInput.propTypes = {
  values: PropTypes.object,
  attributeKey: PropTypes.string,
  setFieldValue: PropTypes.func,
};

export default MethodsInput;
