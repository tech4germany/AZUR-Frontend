import React from "react";
import PropTypes from "prop-types";
import { Spinner } from "@chakra-ui/react";

import DataTable from "./DataTable";

ReihenfolgeOutput.propTypes = {
  assignmentSequence: PropTypes.array,
};

export default function ReihenfolgeOutput({ assignmentSequence }) {
  // TODO
  // transform to use Memo?
  const [data, setData] = React.useState();


  const columns = React.useMemo(
    () => [
      {
        Header: 'Position',
        id: 'index',
        Cell: ({ row, flatRows }) => {
          return flatRows.indexOf(row) + 1;
        },
      },
      {
        Header: 'Reihenfolge',
        accessor: 'assignmentSequence.seat_goes_to', // accessor is the "key" in the data
        Cell: ({ cell: { value } }) => {
          if (Array.isArray(value)){
            return ('Mehrdeutig! ' + value.join(' oder '))
          } else {
            return value
          }
        }
      },

    ],
    []
  )

  React.useEffect(() => {
    if (assignmentSequence != undefined) {
      const assignmentSequenceParsed = assignmentSequence.map((partyName) => { return {'assignmentSequence': partyName}})
      console.log(assignmentSequenceParsed)
      setData(assignmentSequenceParsed);
    }
  }, [assignmentSequence]);

  return (
    <>
      {columns == undefined || data == undefined ? (
        <Spinner />
      ) : (
        <DataTable data={data} columns={columns} />
      )}
    </>
  );
}
