import { Icon } from "@chakra-ui/icons";
import { Circle, Flex, Text, Box } from "@chakra-ui/react";
import PropTypes from "prop-types";
import React from "react";
import { getPartyColor } from "utils/getPartyColor";

export const PositionCell = ({ cell }) => {
  return (
    <Flex justifyContent="center">
      <Circle size="3ex" bg="brand.backgroundGrey" color="black">
        <Text fontWeight="bold">{cell.value}</Text>
      </Circle>
    </Flex>
  );
};

PositionCell.propTypes = {
  cell: PropTypes.object,
};

export function AssignmentCell({ cell, tableData }) {
  const value = cell?.value;
  if (Array.isArray(value)) {
    return "Mehrdeutig! " + value.join(" oder ");
  } else {
    const partyNames = Object.keys(tableData[0].seats);
    const totalPartyCount = partyNames.length;
    const index = partyNames.findIndex((elem) => elem == value);
    const partyColor = getPartyColor(value, index, totalPartyCount);

    const CircleIcon = (props) => (
      <Icon viewBox="0 0 200 200" {...props}>
        <path
          fill="currentColor"
          d="M 100, 100 m -75, 0 a 75,75 0 1,0 150,0 a 75,75 0 1,0 -150,0"
        />
      </Icon>
    );

    return (
      <Flex align="center">
        <Text flex={1} textAlign="center">
          {value}
        </Text>
        <CircleIcon color={partyColor} mr={2} boxSize={12} />
      </Flex>
    );
  }
}
AssignmentCell.propTypes = {
  cell: PropTypes.object,
  tableData: PropTypes.array,
};

export const SeatCountCell = ({ cell: { value } }) => {
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
};

SeatCountCell.propTypes = {
  cell: PropTypes.object,
};
