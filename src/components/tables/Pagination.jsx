import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import {
  Flex,
  IconButton,
  NumberInput,
  NumberInputField,
  Select,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import PropTypes from "prop-types";
import React from "react";

export const PageSelect = ({
  canPreviousPage,
  canNextPage,
  pageOptions,
  gotoPage,
  nextPage,
  previousPage,
  state: { pageIndex },
  ...cssprops
}) => {
  return (
    <Flex alignItems="center" {...cssprops}>
      <Tooltip label="Previous Page">
        <IconButton
          onClick={previousPage}
          isDisabled={!canPreviousPage}
          icon={<ChevronLeftIcon h={6} w={6} />}
        />
      </Tooltip>
      <Text ml={2} flexShrink="0">
        Seite
      </Text>
      <NumberInput
        w="8ex"
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
      </NumberInput>
      <Text mr={2}>von {pageOptions.length}</Text>
      <Tooltip label="Next Page">
        <IconButton
          onClick={nextPage}
          isDisabled={!canNextPage}
          icon={<ChevronRightIcon h={6} w={6} />}
        />
      </Tooltip>
    </Flex>
  );
};

PageSelect.propTypes = {
  canPreviousPage: PropTypes.bool,
  canNextPage: PropTypes.bool,
  pageOptions: PropTypes.array,
  gotoPage: PropTypes.func,
  nextPage: PropTypes.func,
  previousPage: PropTypes.func,
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
        {[6, 10, 20, 50, 100].map((pageSize) => (
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
