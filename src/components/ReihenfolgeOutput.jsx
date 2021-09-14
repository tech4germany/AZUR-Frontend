import React from "react";
import PropTypes from "prop-types";
import Table from 'react-bootstrap/Table'

ReihenfolgeOutput.propTypes = {
  seatOrder: PropTypes.array,
};

export default function ReihenfolgeOutput({ seatOrder }) {

    if(seatOrder == null){
        return(
            <p>Bei dem Verfahren Hare/Niemeyer ergibt sich keine Zugriffsreihenfolge</p>
        )
    }

    let i = 0
    return (
        <Table>
            <tbody>
                {
                    seatOrder.map((partyThatGetsSeat) => {
                        i++
                        return(
                            <tr key={`${partyThatGetsSeat}${i}`}>
                            <td>{i}.</td>
                            <td>{partyThatGetsSeat}</td>
                        </tr>
                        )
                    })
                }
            </tbody>
        </Table>
    )
}
