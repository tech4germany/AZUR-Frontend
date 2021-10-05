import React from "react";
import PropTypes from "prop-types";
import DataTable from "./DataTable";

TabellenOutput.propTypes = {
  tableData: PropTypes.array,
};

export default function TabellenOutput({ tableData }) {
  const data = React.useMemo(() => tableData, []);

  const columns = React.useMemo(() => {
    const startHeaders = [
      {
        Header: "Position",
        id: "index",
        Cell: ({ row }) => row.index + 1,
      },
    ];

    const partyNames = Object.keys(tableData[0].seats);
    const partyStrengthsCols = partyNames.map((partyName) => {
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

    return startHeaders.concat(partyStrengthsCols);
  }, []);

  return <DataTable data={data} columns={columns} />;
}
