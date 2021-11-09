import {
  Center,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Text,
  Box,
} from "@chakra-ui/react";
import React from "react";

import PropTypes from "prop-types";

import { parseSeatCountOutput } from "components/tables/CellRenders";

const PrintTable = ({ tableData }) => {
  let tableOutput = null;
  // only take first 400 rows for printing
  if (tableData != null) {
    tableOutput = tableData.slice(0, 400);
  }

  return tableOutput != null ? (
    <Center flexDirection="column" maxWidth="100%">
      <Table>
        <Thead>
          <Tr>
            <Th>Position</Th>
            {Object.keys(tableOutput[0].seats).map((partyName) => (
              <Th key={partyName}>{partyName}</Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {tableOutput.map((row, rowIndex) => {
            return (
              <Tr key={`tablePrintRow${rowIndex}`}>
                <Td>{rowIndex + 1}</Td>
                {Object.values(row.seats).map((entry, colIndex) => {
                  return (
                    <Td key={`tablePrintRow${rowIndex}_${colIndex}`}>
                      {Array.isArray(entry) ? (
                        <Box layerStyle="ambiguityContainerHighlight">
                          <Text color="brand.orange">Mehrdeutig!</Text>
                          <Text>{parseSeatCountOutput(entry)}</Text>
                        </Box>
                      ) : (
                        <Box>{entry}</Box>
                      )}
                    </Td>
                  );
                })}
              </Tr>
            );
          })}
        </Tbody>
      </Table>
      {tableData.length >= 400 && (
        <Text>
          Es kann nur eine begrenzte Anzahl an Zeilen gedruckt werden.
        </Text>
      )}
    </Center>
  ) : (
    "Loading"
  );
};

PrintTable.propTypes = {
  tableData: PropTypes.array,
};

export default PrintTable;
