import React from "react";
import PropTypes from "prop-types";

import DataTable from "./DataTable";

ReihenfolgeOutput.propTypes = {
  assignmentSequence: PropTypes.array,
};

export default function ReihenfolgeOutput({ assignmentSequence }) {
  const columns = React.useMemo(() => {
    if (assignmentSequence == null) return [];
    return [
      {
        Header: "Position",
        id: "index",
        Cell: ({ row }) => row.index + 1,
      },
      {
        Header: "Reihenfolge",
        accessor: "assignmentSequence.seat_goes_to", // accessor is the "key" in the data
        Cell: ({ cell: { value } }) => {
          if (Array.isArray(value)) {
            return "Mehrdeutig! " + value.join(" oder ");
          } else {
            return value;
          }
        },
      },
    ];
  }, []);

  const data = React.useMemo(() => {
    if (assignmentSequence == null) return [];
    return assignmentSequence.map((partyName) => {
      return { assignmentSequence: partyName };
    });
  }, []);

  return <DataTable data={data} columns={columns} />;
}
