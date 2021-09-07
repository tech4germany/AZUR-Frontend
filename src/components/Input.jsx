import { React } from "react";

export default function Input(inputData) {
  return (
    <>
      <h2>Input</h2>
      <p>Vorerst ein hardcoded Beispiel.</p>
      <p>Sitzzahl:</p>
      <p>{inputData.inputData.num_of_seats}</p>
      <p>Methode:</p>
      <p>{inputData.method}</p>

      <table>
        <tbody>
          <tr>
            {Object.keys(inputData.inputData.votes).map((entry) => {
              return(<th key={entry}>{entry}</th>);
            })}
          </tr>
          <tr>
            {Object.values(inputData.inputData.votes).map((entry) => {
              return(<th key={entry}>{entry}</th>);
            })}
          </tr>
        </tbody>
      </table>
    </>
  );
}
