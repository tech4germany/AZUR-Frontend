import React from "react";
import PropTypes from "prop-types";

import { AssignmentCell } from "components/tables/CellRenders";

import DataTable from "components/tables/DataTable";

AssignmentSeq.propTypes = {
  assignmentSequence: PropTypes.array,
  tableData: PropTypes.array,
};

export default function AssignmentSeq({ assignmentSequence, tableData }) {
  const columns = [
    {
      Header: "Zugriff",
      accessor: "seat_goes_to", // accessor is the "key" in the data
      disableFilters: true,
      Cell: ({ cell }) => AssignmentCell({ cell, tableData }),
    },
  ];

  return <DataTable data={assignmentSequence} columns={columns} />;
}
