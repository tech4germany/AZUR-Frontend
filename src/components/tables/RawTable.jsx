/* eslint-disable */

//TODO REMOVE ESLINT DISABLE

import { Box, Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import React from "react";

import PropTypes from "prop-types";

const RawTable = ({
  getTableProps,
  getTableBodyProps,
  headerGroups,
  prepareRow,
  page,
  getRowProps = () => ({}),
}) => {
  return (
    <Box>
      <Table {...getTableProps()} overflow="auto" height="30rem">
        <Thead position="sticky" top="0" backgroundColor="white">
          {headerGroups.map((headerGroup) => (
            <Tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <Th
                  key={column.header}
                  {...column.getHeaderProps()}
                  textAlign="center"
                >
                  {column.render("Header")}
                </Th>
              ))}
            </Tr>
          ))}
        </Thead>
        <Tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);
            return (
              <Tr {...row.getRowProps(getRowProps(row))}>
                {row.cells.map((cell) => {
                  return (
                    <Td
                      {...cell.getCellProps()}
                      fontWeight="normal"
                      textAlign="center"
                    >
                      {cell.render("Cell")}
                    </Td>
                  );
                })}
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </Box>
  );
};

RawTable.propTypes = {
  getTableProps: PropTypes.func,
  getTableBodyProps: PropTypes.func,
  headerGroups: PropTypes.array,
  prepareRow: PropTypes.func,
  page: PropTypes.array,
};

export default RawTable;
