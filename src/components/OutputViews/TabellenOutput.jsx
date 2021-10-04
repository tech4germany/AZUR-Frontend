import React from "react";
import PropTypes from "prop-types";
import DataTable from "./DataTable";
import { Spinner } from "@chakra-ui/react";

TabellenOutput.propTypes = {
  tableData: PropTypes.array
};

export default function TabellenOutput({ tableData }) {
  const [columns, setColumns] = React.useState();
  const [data, setData] = React.useState();



  // TODO MEMOIZE COLUMNS AND DATA! 

  React.useEffect(() => {

    if (tableData != undefined) {
      const colLabels = Object.keys(tableData[0].seats)
      const columnsObjs = colLabels.map(colLabel => {
        return(
          {
            Header: colLabel,
            accessor: 'seats.' + colLabel, // we want to access the seats subitem
            isNumeric: true,
            Cell: ({ cell: { value } }) => {
              if (Array.isArray(value)){
                return ('Mehrdeutig! ' + value.join(' oder '))
              } else {
                return value
              }
            }
          }
        )
      })

      setColumns(columnsObjs)

      // TODO ignoring ambig for now
      // const tableDataParsed = tableData.map((row) => row.seats)


      setData(tableData);
    }
  }, [tableData]);

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
