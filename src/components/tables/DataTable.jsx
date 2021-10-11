/* eslint-disable */

//TODO REMOVE ESLINT DISABLE

import {
  Circle,
  Flex,
  Center,
  Spinner,
  Text,
  VStack,
  HStack,
} from "@chakra-ui/react";
import PropTypes from "prop-types";
import React from "react";
import { useFilters, usePagination, useTable } from "react-table";
import NumberRangeFilter from "./NumberRangeFilter";
import RawTable from "./RawTable";
import { PageSelect, SelectPageLength } from "./Pagination";
import IndexFilter from "./IndexFilter";

DataTable.propTypes = {
  data: PropTypes.array,
  columns: PropTypes.array,
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
      Header: "",
      id: "index",
      accessor: (_row, i) => i + 1,
      Cell: ({ cell }) => {
        return (
          <Flex justifyContent="center">
            <Circle size="3ex" bg="brand.backgroundGrey" color="black">
              <Text fontWeight="bold">{cell.value}</Text>
            </Circle>
          </Flex>
        );
      },
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
          <Center>
            <Flex alignItems="center" mr="2ex">
              Anzeigen von
            </Flex>
            <IndexFilter headerGroups={headerGroups} />
          </Center>
          <HStack>
            <RawTable
              getTableProps={getTableProps}
              getTableBodyProps={getTableBodyProps}
              headerGroups={headerGroups}
              prepareRow={prepareRow}
              page={page}
            />
          </HStack>

          <HStack alignItems="center" spacing="3ex">
            <PageSelect
              canPreviousPage={canPreviousPage}
              canNextPage={canNextPage}
              pageOptions={pageOptions}
              gotoPage={gotoPage}
              nextPage={nextPage}
              previousPage={previousPage}
              state={{ pageIndex, pageSize }}
            />
            <SelectPageLength pageSize={pageSize} setPageSize={setPageSize} />
          </HStack>
        </VStack>
      )}
    </>
  );
}
