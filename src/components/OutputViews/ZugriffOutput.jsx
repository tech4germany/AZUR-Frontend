import React from "react";
import PropTypes from "prop-types";

import { getPartyColor } from "../../utils/getPartyColor";
import { Text, Flex } from "@chakra-ui/react";
import { Icon } from "@chakra-ui/icons";

export default function ZugriffOutput({ cell, tableData }) {
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
        <CircleIcon color={partyColor} mr={2} boxSize={12} />
        <Text flex={1} textAlign="center">
          {value}
        </Text>
      </Flex>
    );
  }
}
ZugriffOutput.propTypes = {
  cell: PropTypes.object,
  tableData: PropTypes.array,
};
