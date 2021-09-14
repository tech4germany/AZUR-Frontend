import React from "react";
import PropTypes from "prop-types";
import { Table, Tbody, Tr, Td } from "@chakra-ui/react";

ReihenfolgeOutput.propTypes = {
  seatOrder: PropTypes.array,
};

export default function ReihenfolgeOutput({ seatOrder }) {
  if (seatOrder == null) {
    return (
      <p>
        Bei dem Verfahren Hare/Niemeyer ergibt sich keine Zugriffsreihenfolge
      </p>
    );
  }

  let i = 0;
  return (
    <Table>
      <Tbody>
        {seatOrder.map((partyThatGetsSeat) => {
          i++;
          return (
            <Tr key={`${partyThatGetsSeat}${i}`}>
              <Td>{i}.</Td>
              <Td>{partyThatGetsSeat}</Td>
            </Tr>
          );
        })}
      </Tbody>
    </Table>
  );
}
