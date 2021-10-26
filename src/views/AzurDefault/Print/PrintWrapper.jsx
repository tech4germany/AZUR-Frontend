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

import constants from "utils/constants.json";
import PrintTable from "../Print/PrintTable";

const PrintWrapper = React.forwardRef(function PrintRef(
  { azurResponse, azurInput },
  ref
) {
  const tableData = azurResponse?.table;

  let methodUsed = "";
  if (azurInput?.method != null) {
    const methodTitle = constants.azurMethods.find(
      (method) => method?.apiName == azurInput?.method
    )?.title;
    if (methodTitle != null) methodUsed = methodTitle;
  }

  return (
    <Box p={3} ref={ref}>
      <Heading size="xl">Eingabe</Heading>
      <Box>
        <Heading size="lg">Verteilmasse</Heading>
        <Text>{azurInput?.numSeats}</Text>
        <Heading size="lg">Methode</Heading>
        <Text>{methodUsed} </Text>
        <Heading size="lg">Fraktionsstärken</Heading>
        {azurInput.partyStrengths != null && (
          <Table>
            <Tbody>
              <Tr>
                <Th>Name</Th>
                {azurInput?.partyStrengths.map((row) => (
                  <Td key={`Name_${row.name}`}>{row.name}</Td>
                ))}
              </Tr>
              <Tr>
                <Th>Stärke</Th>
                {azurInput?.partyStrengths.map((row) => (
                  <Td key={`Stärke_${row.strength}`}>{row.strength}</Td>
                ))}
              </Tr>
            </Tbody>
          </Table>
        )}
      </Box>
      <Heading size="xl">Ausgabetabelle</Heading>
      <Box>
        <PrintTable tableData={tableData} />
      </Box>
    </Box>
  );
});

PrintWrapper.propTypes = {
  azurResponse: PropTypes.object,
  azurInput: PropTypes.object,
};

export default PrintWrapper;
