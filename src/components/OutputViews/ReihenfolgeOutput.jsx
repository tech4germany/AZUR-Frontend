import React from "react";
import PropTypes from "prop-types";

import ZugriffOutput from './ZugriffOutput'

import DataTable from "./DataTable";

ReihenfolgeOutput.propTypes = {
  assignmentSequence: PropTypes.array,
  tableData: PropTypes.array,
};


export default function ReihenfolgeOutput({ assignmentSequence, tableData}) {
  const columns = [
    {
      Header: "Reihenfolge",
      accessor: "seat_goes_to", // accessor is the "key" in the data
      disableFilters: true, // TODO move to defaultColumn
      Cell: ({ cell }) => ZugriffOutput({cell, tableData}),
    },
  ];

  return <DataTable data={assignmentSequence} columns={columns} />;
}
