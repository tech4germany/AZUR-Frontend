import React, { useContext } from "react";
import { Box, Heading, Text, Table, Tr, Th, Td, Tbody } from "@chakra-ui/react";
import { AzurContext } from "context/AzurContext";
import constants from "utils/constants.json";
import PrintTable from "../Print/PrintTable";

const PrintWrapper = () => {
  const { azurResponse, azurInput } = useContext(AzurContext);

  const azurInputData = azurInput?.data;

  const tableData = azurResponse?.data?.table;

  let methodUsed = "";
  if (azurInputData?.method != null) {
    const methodTitle = constants.azurMethods.find(
      (method) => method?.apiName == azurInputData?.method
    )?.title;
    if (methodTitle != null) methodUsed = methodTitle;
  }

  return (
    <Box p={3}>
      <Heading size="xl">Eingabe</Heading>
      <Box>
        <Heading size="lg">Verteilmasse</Heading>
        <Text>{azurInputData?.numSeats}</Text>
        <Heading size="lg">Methode</Heading>
        <Text>{methodUsed} </Text>
        <Heading size="lg">Fraktionsstärken</Heading>
        {azurInputData.partyStrengths != null && (
          <Table>
            <Tbody>
              <Tr>
                <Th>Name</Th>
                {azurInputData?.partyStrengths.map((row) => (
                  <Td key={`Name_${row.name}`}>{row.name}</Td>
                ))}
              </Tr>
              <Tr>
                <Th>Stärke</Th>
                {azurInputData?.partyStrengths.map((row) => (
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
};

export default PrintWrapper;
