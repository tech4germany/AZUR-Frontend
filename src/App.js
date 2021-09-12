import React from "react";
import AzurInputs from "./components/Input";
import Output from "./components/Output";
import { Container, Row, Col } from "react-bootstrap";


function App() {
  const [data, setData] = React.useState({});
  const [azurInput, setAzurInput] = React.useState({});


  React.useEffect(() => {
    const fetchAzur = async () => {
      // Parse Form Content into a form digestable for the API
      const partyStrengthForApi = {}
      azurInput.partyStrengths.forEach( (entry) => {
          partyStrengthForApi[entry.name] = entry.strength
      })

  
  
      // use effect itself should not be async according to linter so we put a function inside
      console.log(`Fetching...`);
      const azurResp = await fetch("http://127.0.0.1:5000/azur", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          votes: partyStrengthForApi,
          method: azurInput.method,
          num_of_seats: azurInput.num_of_seats,
        }),
      }).then((resp) => resp.json());
      setData(azurResp);
      console.log(azurResp)
    };

    if ('partyStrengths' in  azurInput){
      fetchAzur();
    }
  }, [azurInput]);

  /* Rendering the App */
  return (
    <div className="App">
      <header></header>
      <main>
        <Container fluid>
          <Row>
            <Col xs={4} className="p-2 bg-light">
              <AzurInputs azurInput={azurInput} setAzurInput={setAzurInput} />
            </Col>
            <Col xs={8} className="p-2">
              <Output seatSplit={data.seats} />
            </Col>
          </Row>
        </Container>
      </main>
    </div>
  );
}

export default App;
