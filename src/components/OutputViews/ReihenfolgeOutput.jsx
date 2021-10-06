import React from "react";
import PropTypes from "prop-types";

import DataTable from "./DataTable";

ReihenfolgeOutput.propTypes = {
  assignmentSequence: PropTypes.array,
};


export default function ReihenfolgeOutput({ assignmentSequence }) {
  const columns = [
    {
      Header: "Reihenfolge",
      accessor: "assignmentSequence.seat_goes_to", // accessor is the "key" in the data
      disableFilters: true, // TODO move to defaultColumn
      Cell: ({ cell: { value } }) => {
        if (Array.isArray(value)) {
          return "Mehrdeutig! " + value.join(" oder ");
        } else {
          return value;
        }
      },
    },
  ];

  const data = assignmentSequence.map((partyName) => {
    return { assignmentSequence: partyName };
  });

  return <DataTable data={data} columns={columns} />;
}
