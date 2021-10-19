import {
  Flex,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Select,
  Text,
} from "@chakra-ui/react";
import PropTypes from "prop-types";
import React from "react";

export const PageSelect = ({
  pageOptions,
  gotoPage,
  state: { pageIndex },
  ...cssprops
}) => {
  return (
    <Flex alignItems="center" {...cssprops}>
      <Text ml={2} flexShrink="0">
        Seite
      </Text>
      <NumberInput
        w="10.5ex"
        p={0}
        mx={2}
        min={1}
        max={pageOptions.length}
        onChange={(value) => {
          const page = value ? value - 1 : 0;
          gotoPage(page);
        }}
        defaultValue={pageIndex + 1}
      >
        <NumberInputField />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>
      <Text mr={2}>von {pageOptions.length}</Text>
    </Flex>
  );
};

PageSelect.propTypes = {
  pageOptions: PropTypes.array,
  gotoPage: PropTypes.func,
  state: PropTypes.object,
};

export const SelectPageLength = ({ pageSize, setPageSize }) => {
  return (
    <Flex>
      <Select
        w={40}
        mr={2}
        value={pageSize}
        onChange={(e) => {
          setPageSize(Number(e.target.value));
        }}
      >
        {[8, 10, 20, 50, 100].map((pageSize) => (
          <option key={pageSize} value={pageSize}>
            {pageSize} pro Seite
          </option>
        ))}
      </Select>
    </Flex>
  );
};

SelectPageLength.propTypes = {
  pageSize: PropTypes.number,
  setPageSize: PropTypes.func,
};
