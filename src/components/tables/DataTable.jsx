/* eslint-disable */

//TODO REMOVE ESLINT DISABLE

import { Circle, Flex, Spinner, Text, VStack } from "@chakra-ui/react";
import PropTypes from "prop-types";
import React from "react";
import { useFilters, usePagination, useTable } from "react-table";
import NumberRangeFilter from "./NumberRangeFilter";
import RawTable from "./RawTable";
import PaginationToolbar from "./PaginationToolbar";
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
          <RawTable
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
