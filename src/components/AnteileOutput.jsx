import { React } from "react";
import PropTypes from "prop-types";
import { Table } from 'react-bootstrap'
import PieChart from './PieChart'
import { Box, Flex, Center } from '@chakra-ui/react'



AnteileOutput.propTypes = {
  seatSplit: PropTypes.object,
};

export default function AnteileOutput({ seatSplit }) {
  return (
    <Flex flexDirection="column">
      <Center p="space.4">
        {/*TODO: Why does table span to 100% width -> fix that cleanly*/}
        <Table className="p-5">
          <thead>
            <tr>
              {Object.keys(seatSplit).map((fractionName) => (
                <th key={fractionName}>{fractionName} </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              {Object.keys(seatSplit).map((fractionName) => (
                <td key={fractionName}>{seatSplit[fractionName]}</td>
              ))}
            </tr>
          </tbody>
        </Table>
      </Center>
      <Center>
        <PieChart data={seatSplit} outerRadius={200} innerRadius={100} />
      </Center>
    </Flex>
  );
}
