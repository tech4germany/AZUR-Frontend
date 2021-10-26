import React from "react";
import PropTypes from "prop-types";
import {
  Box,
  Heading,
  Text,
  Table,
  Tr,
  Th,
  Td,
  Thead,
  Tbody,
} from "@chakra-ui/react";

import PrintTable from "../Print/PrintTable";

const PrintWrapper = React.forwardRef(function PrintRef(
  { azurResponse, azurInput },
  ref
) {
  const tableData = azurResponse?.table;

  return (
    <Box ref={ref}>
      <Heading>Eingabe</Heading>
      <Box>
        <Text>Anzahl Sitze: {azurInput?.numSeats} </Text>
        <Text>Methode:{azurInput?.method} </Text>
        <Text size="md">Fraktionsstärken</Text>
        {azurInput.partyStrengths != null && (
          <Table>
            <Thead>
              <Tr>
                <Th>Name</Th>
                <Th>Sitze</Th>
              </Tr>
            </Thead>
            <Tbody>
              {azurInput?.partyStrengths.map((row) => {
                return (
                  <Tr key={row.name}>
                    <Td>{row.name}</Td>
                    <Td>{row.strength}</Td>
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
        )}
      </Box>
      <Heading>Ausgabetabelle</Heading>
      <Box>
        <PrintTable tableData={tableData} />
      </Box>
    </Box>
  );
});

PrintWrapper.propTypes = {
  azurResponse: PropTypes.array,
  azurInput: PropTypes.object,
};

export default PrintWrapper;
