import React from "react";
import PropTypes from "prop-types";
import { Table, Tbody, Tr, Td } from "@chakra-ui/react";

ReihenfolgeOutput.propTypes = {
  assignmentSequence: PropTypes.array,
};

export default function ReihenfolgeOutput({ assignmentSequence }) {
  if (assignmentSequence == null) {
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
        {assignmentSequence.map((sequenceEntry) => {
          i++;
          return (
            <Tr key={`${JSON.stringify(sequenceEntry.seat_goes_to)}${i}`}>
              <Td>{i}.</Td>
              <Td>
                {sequenceEntry.is_ambiguous ? (
                    `Mehrdeutig zwischen ${sequenceEntry.seat_goes_to.join(' und ')}!` 
                  ) : (
                    sequenceEntry.seat_goes_to
                  )
                }
              </Td>
            </Tr>
          );
        })}
      </Tbody>
    </Table>
  );
}
