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
    <Box maxWidth="100%">
      <Table {...getTableProps()} variant="stickyHeader">
        <Thead>
          {headerGroups.map((headerGroup, index) => (
            <Tr
              key={`headerGroup:${index}`}
              {...headerGroup.getHeaderGroupProps()}
            >
              {headerGroup.headers.map((column) => (
                <Th key={column.header} {...column.getHeaderProps()}>
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
              <Tr key={row?.id} {...row.getRowProps(getRowProps(row))}>
                {row.cells.map((cell) => (
                  <Td {...cell.getCellProps()} key={cell?.column?.id + row?.id}>
                    {cell.render("Cell")}
                  </Td>
                ))}
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
  getRowProps: PropTypes.func,
};

export default RawTable;
