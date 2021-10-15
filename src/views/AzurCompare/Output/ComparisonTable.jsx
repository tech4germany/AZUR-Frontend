import React from "react";
import PropTypes from "prop-types";
import DataTable from "components/tables/DataTable";
import { ComparisonCell } from "components/tables/CellRenders";
ComparisonTable.propTypes = {
  tableData: PropTypes.array,
};

export default function ComparisonTable({ tableData }) {
  let columns = [];
  let data = [];

  if (tableData != null && Array.isArray(tableData) && tableData.length >= 1) {
    // set up columns
    const partyNames = [
      ...new Set([
        ...Object.keys(tableData[0].dist_A.seats),
        ...Object.keys(tableData[0]?.dist_B?.seats || {}), // TODO: Issue - First row of distB could be empty but rows could pop up later
      ]),
    ];

    columns = partyNames.map((partyName) => {
      return {
        Header: partyName,
        partyName: partyName,
        accessor: "dist_A.seats." + partyName, // we want to access the seats subitem
        isNumeric: true,
        Cell: ComparisonCell,
      };
    });

    data = tableData;
  }

  return (
    <DataTable
      data={data}
      columns={columns}
      getRowProps={(row) => {
        if (row?.original?.is_identical) {
          return {};
        } else {
          return { layerStyle: "changedRowHighlight" };
        }
      }}
    />
  );
}
