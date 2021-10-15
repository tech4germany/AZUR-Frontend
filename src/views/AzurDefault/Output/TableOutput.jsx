import React from "react";
import PropTypes from "prop-types";
import DataTable from "components/tables/DataTable";
import { SeatCountCell } from "components/tables/CellRenders";
TableOutput.propTypes = {
  tableData: PropTypes.array,
  assignmentSequence: PropTypes.array,
};

export default function TableOutput({ tableData, assignmentSequence }) {
  let columns = [];
  let data = [];

  if (tableData != null && Array.isArray(tableData) && tableData.length >= 1) {
    // set up columns
    const partyNames = Object.keys(tableData[0].seats);
    columns = partyNames.map((partyName) => {
      return {
        Header: partyName,
        accessor: "seats." + partyName, // we want to access the seats subitem
        isNumeric: true,
        Cell: SeatCountCell,
      };
    });

    data = tableData.map((tableRow, i) => {
      return { seat_goes_to: assignmentSequence[i].seat_goes_to, ...tableRow };
    });
  }

  return (
    <DataTable
      data={data}
      columns={columns}
      getRowProps={(row) => {
        return {
          layerStyle: row?.original?.is_ambiguous ? "ambigousRowHighlight" : "",
        };
      }}
    />
  );
}
