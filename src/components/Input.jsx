import { React } from "react";
import PropTypes from "prop-types";

Input.propTypes = {
  inputData: PropTypes.object,
};

export default function Input({ inputData }) {
  return (
    <>
      <h2>Input</h2>
      <p>Hardcoded Beispiel:</p>
      <p>Sitzzahl: {inputData.num_of_seats}</p>
      <p>Methode: {inputData.method}</p>

      <table>
        <tbody>
          <tr>
            {Object.keys(inputData.votes).map((entry) => {
              return <th key={entry}>{entry}</th>;
            })}
          </tr>
          <tr>
            {Object.values(inputData.votes).map((entry) => {
              return <th key={entry}>{entry}</th>;
            })}
          </tr>
        </tbody>
      </table>
    </>
  );
}
