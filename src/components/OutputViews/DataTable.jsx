/* eslint-disable */
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@chakra-ui/icons";
import {
  Flex,
  Box,
  Center,
  IconButton,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Select,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tooltip,
  Tr,
  VStack,
  Spinner,
} from "@chakra-ui/react";
import PropTypes from "prop-types";
import React from "react";
import { useFilters, usePagination, useTable } from "react-table";
import NumberRangeFilter from "./NumberRangeFilter";

DataTable.propTypes = {
  data: PropTypes.array,
  columns: PropTypes.array,
};

const IndexFilter = (headerGroups) => {
  // get columns
  const cols = headerGroups?.headerGroups?.[0]?.headers;
  if (cols == null) return null;
  // get index column. return null if we do not find it
  const indexCol = cols.find((elem) => elem.id == "index");
  if (indexCol == null) return null;

  return (
    <Center>
      <Text>Wertebereich anzeigen von</Text>
      <Box>{indexCol.render("Filter")}</Box>
    </Center>
  );
};

export default function DataTable({ data, columns }) {
  const defaultColumn = React.useMemo(
    () => ({
      disableFilters: true,
    }),
    []
  );

  const startHeaders = [
    {
      Header: "Position",
      id: "index",
      accessor: (_row, i) => i + 1,
      disableFilters: false,
      defaultCanFilter: true,
      Filter: NumberRangeFilter,
      filter: "between",
    },
  ];

  const dataMemo = React.useMemo(() => {
    if (data == null) {
      return [];
    }
    return data;
  }, [data]);

  const colsMemo = React.useMemo(() => {
    if (columns == null) {
      return [];
    }
    return startHeaders.concat(columns);
  }, [columns]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page, //  page only has the rows for the active page (used instead of 'rows')
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    { columns: colsMemo, data: dataMemo, defaultColumn },
    useFilters,
    usePagination
  );

  return (
    <>
      {columns == undefined || data == undefined ? (
        <Spinner />
      ) : (
        <VStack>
          <IndexFilter headerGroups={headerGroups} />
          <PureDataTable
            getTableProps={getTableProps}
            getTableBodyProps={getTableBodyProps}
            headerGroups={headerGroups}
            prepareRow={prepareRow}
            page={page}
          />
          <PaginationToolbar
            canPreviousPage={canPreviousPage}
            canNextPage={canNextPage}
            pageOptions={pageOptions}
            pageCount={pageCount}
            gotoPage={gotoPage}
            nextPage={nextPage}
            previousPage={previousPage}
            setPageSize={setPageSize}
            state={{ pageIndex, pageSize }}
          />
        </VStack>
      )}
    </>
  );
}

const PureDataTable = ({
  getTableProps,
  getTableBodyProps,
  headerGroups,
  prepareRow,
  page,
}) => {
  return (
    <Box>
      <Table
        {...getTableProps()}
        display="block"
        overflow="auto"
        height="30rem"
      >
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
              <Tr
                {...row.getRowProps()}
                backgroundColor={
                  row?.original?.is_ambiguous ? "brand.orangeAlpha.300" : ""
                }
              >
                {row.cells.map((cell) => {
                  return (
                    <Td
                      {...cell.getCellProps()}
                      layerStyle={
                        Array.isArray(cell.value)
                          ? "amiguityContainerHighlight"
                          : ""
                      }
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

const PaginationToolbar = ({
  canPreviousPage,
  canNextPage,
  pageOptions,
  pageCount,
  gotoPage,
  nextPage,
  previousPage,
  setPageSize,
  state: { pageIndex, pageSize },
}) => {
  return (
    <Flex justifyContent="space-between" m={4} alignItems="center">
      <Flex>
        <Tooltip label="First Page">
          <IconButton
            onClick={() => gotoPage(0)}
            isDisabled={!canPreviousPage}
            icon={<ArrowLeftIcon h={3} w={3} />}
            mr={4}
          />
        </Tooltip>
        <Tooltip label="Previous Page">
          <IconButton
            onClick={previousPage}
            isDisabled={!canPreviousPage}
            icon={<ChevronLeftIcon h={6} w={6} />}
          />
        </Tooltip>
      </Flex>

      <Flex alignItems="center">
        <Text ml={2} flexShrink="0">
          Seite{" "}
        </Text>{" "}
        <NumberInput
          mx={2}
          w={28}
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
        <Text mr={8}>von {pageOptions.length}</Text>
        <Select
          w={32}
          mr={2}
          value={pageSize}
          onChange={(e) => {
            setPageSize(Number(e.target.value));
          }}
        >
          {[10, 20, 50, 100].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </Select>
      </Flex>

      <Flex>
        <Tooltip label="Next Page">
          <IconButton
            onClick={nextPage}
            isDisabled={!canNextPage}
            icon={<ChevronRightIcon h={6} w={6} />}
          />
        </Tooltip>
        <Tooltip label="Last Page">
          <IconButton
            onClick={() => gotoPage(pageCount - 1)}
            isDisabled={!canNextPage}
            icon={<ArrowRightIcon h={3} w={3} />}
            ml={4}
          />
        </Tooltip>
      </Flex>
    </Flex>
  );
};
