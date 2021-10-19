import React from "react";
import PropTypes from "prop-types";
import DataTable from "../../../components/tables/DataTable";
import { Text, Box } from "@chakra-ui/react";
TableOutput.propTypes = {
  tableData: PropTypes.array,
  assignmentSequence: PropTypes.array,
};

export default function TableOutput({ tableData, assignmentSequence }) {
  let columns = [];
  let data = [];

  if (tableData != null && Array.isArray(tableData) && tableData.length >= 1) {
    // set up columns
    const partyNames = Object.keys(tableData[0].seats);
    columns = partyNames.map((partyName) => {
      return {
        Header: partyName,
        accessor: "seats." + partyName, // we want to access the seats subitem
        isNumeric: true,
        Cell: CellOutput,
      };
    });

    data = tableData.map((tableRow, i) => {
      return { seat_goes_to: assignmentSequence[i].seat_goes_to, ...tableRow };
    });
  }

  return (
    <DataTable
      data={data}
      columns={columns}
      getRowProps={(row) => {
        return {
          layerStyle: row?.original?.is_ambiguous ? "ambigousRowHighlight" : "",
        };
      }}
    />
  );
}

function CellOutput({ cell: { value } }) {
  if (Array.isArray(value)) {
    return (
      <Box p={4} layerStyle="ambiguityContainerHighlight">
        <Text color="brand.orange">Mehrdeutig!</Text>
        <Text>{value.join(" oder ")}</Text>
      </Box>
    );
  } else {
    return value;
  }
}

CellOutput.propTypes = {
  cell: PropTypes.object,
};
