import React from "react";
import PropTypes from "prop-types";
import DataTable from "../DataTable";
import { Spinner } from "@chakra-ui/react";

TabellenOutput.propTypes = {
  rawTableData: PropTypes.array,
  partyStrengths: PropTypes.array,
};

export default function TabellenOutput({ rawTableData, partyStrengths }) {
  const [columns, setColumns] = React.useState();
  const [data, setData] = React.useState();

  React.useEffect(() => {
    /* TODO We should not convert in frontend but already receive this from frontend? */
    if (rawTableData != undefined) {
      const colLabels = partyStrengths.map(({ name }) => name); // TODO at least use the table headers here
      const columnsObjs = []
      columnsObjs.push(
        {
          Header: 'Index',
          accessor: 'index',
          isNumeric: true,
        }
      )
      colLabels.map(colLabel => {
        columnsObjs.push(
          {
            Header: colLabel,
            accessor: colLabel,
            isNumeric: true,
          }
        )
      })

      setColumns(columnsObjs)
      let tableDataParsed = [];
      let j = 1;
      tableDataParsed = rawTableData.map((row) => {
        let outputRow = {};
        outputRow.index = j;
        j++;
        for (let i = 0; i < row.length; i++) {
          outputRow[colLabels[i]] = row[i]; // TODO at least use the table headers here
        }
        return outputRow;
      });
      setData(tableDataParsed);
    }
  }, [rawTableData, partyStrengths]);

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
