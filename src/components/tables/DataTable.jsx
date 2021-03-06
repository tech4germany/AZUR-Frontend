import { HStack, Spinner, VStack } from "@chakra-ui/react";
import PropTypes from "prop-types";
import React from "react";
import { useFilters, usePagination, useTable } from "react-table";
import { PositionCell } from "./CellRenders";
import NumberRangeFilter from "./NumberRangeFilter";
import { PageSelect, SelectPageLength } from "./Pagination";
import RawTable from "./RawTable";

DataTable.propTypes = {
  data: PropTypes.array,
  columns: PropTypes.array,
  getRowProps: PropTypes.func,
};

const DEFAULT_PAGE_SIZE = 20;

export default function DataTable({ data, columns, getRowProps = () => ({}) }) {
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
      Cell: PositionCell,
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
    pageOptions,
    gotoPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    { columns: colsMemo, data: dataMemo, defaultColumn },
    useFilters,
    usePagination
  );

  React.useEffect(() => {
    // sets the default page size for the table
    setPageSize(DEFAULT_PAGE_SIZE);
  }, []);
  return (
    <>
      {columns == undefined || data == undefined ? (
        <Spinner />
      ) : (
        <VStack maxWidth="100%">
          {/*<HStack> // filter rows with this filter
            <Text mr="2ex">Anzeigen von</Text>
            <IndexFilter headerGroups={headerGroups} />
          </HStack> */}
          <HStack maxWidth="100%">
            <RawTable
              getTableProps={getTableProps}
              getTableBodyProps={getTableBodyProps}
              headerGroups={headerGroups}
              prepareRow={prepareRow}
              page={page}
              getRowProps={getRowProps}
            />
          </HStack>

          <HStack alignItems="center" spacing="3ex">
            <PageSelect
              pageOptions={pageOptions}
              gotoPage={gotoPage}
              state={{ pageIndex, pageSize }}
            />
            <SelectPageLength pageSize={pageSize} setPageSize={setPageSize} />
          </HStack>
        </VStack>
      )}
    </>
  );
}
