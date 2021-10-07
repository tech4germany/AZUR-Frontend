import React from "react";
import PropTypes from "prop-types";
import DataTable from "./DataTable";
import ZugriffOutput from './ZugriffOutput'

TabellenOutput.propTypes = {
  tableData: PropTypes.array,
  assignmentSequence: PropTypes.array,
};

export default function TabellenOutput({ tableData, assignmentSequence }) {
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
        Cell: ({ cell: { value } }) => {
          if (Array.isArray(value)) {
            return "Mehrdeutig! " + value.join(" oder ");
          } else {
            return value;
          }
        },
      };
    });

    const assignmentCol = [
      {
        Header: "Zugriff",
        accessor: "seat_goes_to",
        Cell: ({ cell }) => ZugriffOutput({cell, tableData}),
      },
    ];
    columns = assignmentCol.concat(columns);
    // set up data: zip together tableData and assignmentSequence

    data = tableData.map((tableRow, i) => {
      return { seat_goes_to: assignmentSequence[i].seat_goes_to, ...tableRow };
    });
  }

  return <DataTable data={data} columns={columns} />;
}
