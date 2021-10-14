import React from "react";
import PropTypes from "prop-types";
import DataTable from "components/tables/DataTable";

ComparisonTable.propTypes = {
  tableData: PropTypes.array,
  assignmentSequence: PropTypes.array,
};

export default function ComparisonTable({ tableData, assignmentSequence }) {
  let columns = [];
  let data = [];

  if (tableData != null && Array.isArray(tableData) && tableData.length >= 1) {
    console.log(tableData);
    // set up columns
    const partyNames = [
      ...new Set([...Object.keys(tableData?.[0]?.dist_A.seats)]),

      // TODO merge with partynames from dist_B if they exist
    ];

    // TODO WHAT HAPPENS IF party did not exist in first table? (also: what happens if a dist_A party no longer exists in dist_B?)
    columns = partyNames.map((partyName) => {
      return {
        Header: partyName,
        accessor: "dist_A.seats." + partyName, // we want to access the seats subitem
        isNumeric: true,
        Cell: ({ cell, row }) => {
          console.log(row.original.is_identical);
          if (row.original.is_identical) {
            const value = cell.value;
            if (Array.isArray(value)) {
              return "Mehrdeutig! " + value.join(" oder ");
            } else {
              return value;
            }
          } else {
            const valueA = row.original.dist_A.seats?.[partyName];
            const valueB = row.original.dist_B.seats?.[partyName];

            if (valueA != valueB) {
              return `${valueA}/${valueB}`;
            } else {
              return valueA;
            }
          }
        },
      };
    });

    // TODO add asignment sequence
    data = tableData;
  }

  return <DataTable data={data} columns={columns} />;
}
