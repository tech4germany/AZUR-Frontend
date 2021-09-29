import React from "react";
import PropTypes from "prop-types";
import PieChart from '../PieChart'
import { Flex, Center, Text, Table, Thead,  Tbody, Tr, Th, Td, } from '@chakra-ui/react'

import { useTheme } from "@chakra-ui/react"


AnteileOutput.propTypes = {
  seatSplit: PropTypes.object,
  isAmbiguous: PropTypes.bool
};

export default function AnteileOutput({ isAmbiguous, seatSplit }) {
  const sizes = useTheme().sizes
  const innerWidthPx = convertRemToPixels(sizes[20])
  const outerWidthPx = convertRemToPixels(sizes[56])
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
              {Object.entries(seatSplit).map(([fractionName, fractionStrength]) => (
                <Td key={fractionName}>
                  {Array.isArray(fractionStrength) ? (
                    fractionStrength.join(' oder ')
                  ):(
                    fractionStrength
                  )}
                </Td>
              ))}
            </Tr>
          </Tbody>
        </Table>
      </Center>
      <Center>
        {isAmbiguous ? (
          <Text>
            Achtung, das Ergebnis für diese Verteilung ist mehrdeutig.
            Es kann keine eindeutig Zuteilung mit dem gewählten mathematischen Verfahren berechnet werden.
            Sie können diese Verteilungsgröße vermeiden, ein anderes mathematisches Verfahren wählen, oder eine nicht-mathematische Lösung finden.
          </Text>
        ): (
          <PieChart data={seatSplit} outerRadius={outerWidthPx} innerRadius={innerWidthPx} />
        )}

      </Center>
    </Flex>
  );
}

function convertRemToPixels(rem) {    
  return parseFloat(rem) * parseFloat(getComputedStyle(document.documentElement).fontSize);
}
