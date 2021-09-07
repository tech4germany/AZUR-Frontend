import { React } from "react";
import PropTypes from 'prop-types';

Output.propTypes = {
  seatSplit: PropTypes.object
}


export default function Output({ seatSplit }) {
  return (
    <>
      <h1>Output</h1>
      {seatSplit && (
        <table>
          <tbody>
            {Object.keys(seatSplit).map((fractionName) => {
              return (
                <tr key={fractionName}>
                  <td>{fractionName} </td>
                  <td>{seatSplit[fractionName]}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </>
  );
}

