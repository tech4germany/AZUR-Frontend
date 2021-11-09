import React, { useContext } from "react";
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
    /* TODO: Party names should be pulled directly from azurInput (it already works this way for AzurDefault)
     *  among other things this will also provide proper sorting for the party names
     */
    const partyNames = [
      ...new Set([
        ...Object.keys(tableData[0].dist_A.seats),
        ...Object.keys(tableData[0]?.dist_B?.seats || {}),
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
