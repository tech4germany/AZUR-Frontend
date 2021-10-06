import React from "react";
import PropTypes from "prop-types";
import DataTable from "./DataTable";

TabellenOutput.propTypes = {
  tableData: PropTypes.array,
};

export default function TabellenOutput({ tableData }) {
  let columns = [];
  if (tableData != null && Array.isArray(tableData) && tableData.length >= 1) {
    const partyNames = Object.keys(tableData[0].seats);
    columns = partyNames.map((partyName) => {
      return {
        Header: partyName,
        accessor: "seats." + partyName, // we want to access the seats subitem
        isNumeric: true,
        Cell: ({ cell: { value } }) => {
          if (Array.isArray(value)) {
            return "Mehrdeutig! " + value.join(" oder ");
          } else {
            return value;
          }
        },
      };
    });
  }

  return <DataTable data={tableData} columns={columns} />;
}
