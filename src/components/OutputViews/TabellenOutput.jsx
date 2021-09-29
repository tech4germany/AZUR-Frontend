import React from "react";
import PropTypes from "prop-types";
import DataTable from "../DataTable";
import { Spinner } from "@chakra-ui/react";

TabellenOutput.propTypes = {
  tableData: PropTypes.array,
  partyStrengths: PropTypes.array,
};

export default function TabellenOutput({ tableData, partyStrengths }) {
  const [columns, setColumns] = React.useState();
  const [data, setData] = React.useState();

  React.useEffect(() => {
    /* TODO We should not convert in frontend but already receive this from frontend? */
    if (tableData != undefined) {
      const colLabels = Object.keys(tableData[0].seats)
      console.log(colLabels)
      const columnsObjs = []
      colLabels.map(colLabel => {
        columnsObjs.push(
          {
            Header: colLabel,
            accessor: colLabel,
            isNumeric: true,
          }
        )
      })


      // TODO CAN WE REMOVE PARTY STRENGTHS??

      setColumns(columnsObjs)

      // TODO ignoring ambig for now
      const tableDataParsed = tableData.map((row) => row.seats)


      setData(tableDataParsed);
    }
  }, [tableData, partyStrengths]);

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
