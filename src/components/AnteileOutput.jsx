import { React } from "react";
import PropTypes from "prop-types";
import PieChart from './PieChart'
import { Flex, Center, Table, Thead,  Tbody, Tr, Th, Td, } from '@chakra-ui/react'



AnteileOutput.propTypes = {
  seatSplit: PropTypes.object,
};

export default function AnteileOutput({ seatSplit }) {
  return (
    <Flex flexDirection="column">
      <Center my="10">
        <Table>
          <Thead>
            <Tr>
              {Object.keys(seatSplit).map((fractionName) => (
                <Th key={fractionName}>{fractionName} </Th>
              ))}
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              {Object.keys(seatSplit).map((fractionName) => (
                <Td key={fractionName}>{seatSplit[fractionName]}</Td>
              ))}
            </Tr>
          </Tbody>
        </Table>
      </Center>
      <Center>
        <PieChart data={seatSplit} outerRadius={200} innerRadius={100} />
      </Center>
    </Flex>
  );
}
