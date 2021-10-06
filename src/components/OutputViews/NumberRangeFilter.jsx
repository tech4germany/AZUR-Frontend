import React from "react";
import PropTypes from "prop-types";
import { Flex, Input } from "@chakra-ui/react";

NumberRangeColumnFilter.propTypes = {
  column: PropTypes.object,
};

export default function NumberRangeColumnFilter({ column }) {
  const { filterValue = [], preFilteredRows, setFilter } = column;
  const [min, max] = React.useMemo(
    () => [1, preFilteredRows.length],
    [preFilteredRows]
  );

  return (
    <Flex align="center">
      <Input
        value={filterValue[0] || ""}
        type="number"
        onChange={(e) => {
          const val = e.target.value;
          setFilter((old = []) => [
            val ? parseInt(val, 10) : undefined,
            old[1],
          ]);
        }}
        placeholder={`Min (${min})`}
        width="15ex"
        mr="1ex"
      />
      bis
      <Input
        value={filterValue[1] || ""}
        type="number"
        onChange={(e) => {
          const val = e.target.value;
          setFilter((old = []) => [
            old[0],
            val ? parseInt(val, 10) : undefined,
          ]);
        }}
        placeholder={`Max (${max})`}
        width="15ex"
        ml="1ex"
      />
    </Flex>
  );
}
