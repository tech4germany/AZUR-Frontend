import React from "react";

function App() {
  const [data, setData] = React.useState({});
  const azurInput = {
    method: "hare",
    votes: {
      SPD: 1000000,
      CDU: 300000,
      GRÜNE: 100000,
      LINKE: 50000,
    },
    num_of_seats: 25,
  };

  React.useEffect(() => {
    const fetchAzur = async () => {
      // use effect itself should not be async according to linter so we put a function inside
      console.log("Fetching...");
      const azurResp = await fetch("http://127.0.0.1:5000/azur", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          votes: azurInput.votes,
          method: azurInput.method,
          num_of_seats: azurInput.num_of_seats,
        }),
      }).then((resp) => resp.json());
      setData(azurResp);
    };
    fetchAzur();
  }, []);

  const partyHeader = [];
  Object.keys(azurInput.votes).forEach((result) => {
    partyHeader.push(<th>{result}</th>);
  });

  const partyResults = [];
  Object.values(azurInput.votes).forEach((result) => {
    partyResults.push(<td>{result}</td>);
  });

  return (
    <div className="App">
      <header>Hello AZUR!</header>
      <main>
        <br></br>
        <br></br>
        <div>
          <h1>Input</h1>
          Wir testen ein hardcoded Beispiel.
          <br></br>
          Methode: {azurInput.method}
          <br></br>
          Sitzzahl: {azurInput.num_of_seats}
          <br></br>
          <table>
            <tbody>
              <tr>{partyHeader}</tr>
              <tr>{partyResults}</tr>
            </tbody>
          </table>
        </div>

        <br></br>
        <br></br>

        <div>
          <h1>Output</h1>
          {data.seats && (
            <table>
              <tbody>
                {Object.keys(data.seats).map((fractionName) => {
                  return (
                    <tr key={fractionName}>
                      <td>{fractionName} </td>
                      <td>{data.seats[fractionName]}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
