import React from "react";
import PropTypes from "prop-types";
import DataTable from "components/tables/DataTable";
import _ from "lodash";

import { SeatCountCell } from "components/tables/CellRenders";
TableOutput.propTypes = {
  tableData: PropTypes.array,
  assignmentSequence: PropTypes.array,
  azurInput: PropTypes.object,
};

export default function TableOutput({
  tableData,
  assignmentSequence,
  azurInput,
}) {
  let columns = [];
  let data = [];

  if (tableData != null && Array.isArray(tableData) && tableData.length >= 1) {
    // set up columns

    // pull partyNames from input so output has same order as input
    const partyNames = azurInput?.partyStrengths.map((entry) => entry.name);
    columns = partyNames.map((partyName) => {
      return {
        Header: partyName,
        accessor: "seats." + partyName, // we want to access the seats subitem
        isNumeric: true,
        Cell: SeatCountCell,
      };
    });

    if (_.isEmpty(assignmentSequence)) {
      data = tableData;
    } else {
      data = tableData.map((tableRow, i) => {
        return {
          seat_goes_to: assignmentSequence[i].seat_goes_to,
          ...tableRow,
        };
      });
    }
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
