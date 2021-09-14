import React from "react";
import AzurInputs from "./components/Input";
import Output from "./components/Output";
import { Container, Row, Col } from "react-bootstrap";
import { bundestagTheme } from "./css/themes";
import { ThemeProvider } from 'styled-components'

function App() {
  const [data, setData] = React.useState({});
  const [loading, setLoading] = React.useState(true);
  const [azurInput, setAzurInput] = React.useState({});

  React.useEffect(() => {
    const fetchAzur = async () => {
      setLoading(true);
      // Parse Form Content into a form digestable for the API
      const partyStrengthForApi = {};
      azurInput.partyStrengths.forEach((entry) => {
        partyStrengthForApi[entry.name] = entry.strength;
      });
      // use effect itself should not be async according to linter so we put a function inside
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
      // TODO handle errors!

      setData(azurResp);
      console.log(azurResp);
      setLoading(false);
    };

    if ("partyStrengths" in azurInput) {
      fetchAzur();
    }
  }, [azurInput]);

  /* Rendering the App */
  return (
    <ThemeProvider theme={bundestagTheme}>
      <div className="App">
        <header></header>
        <main>
          <Container fluid>
            <Row>
              {/* TODO: Style: 100vh seems quite brutal here*/}
              <Col
                xs={4}
                className="p-2 bg-light overflow-auto"
                style={{ height: "100vh" }}
              >
                <AzurInputs azurInput={azurInput} setAzurInput={setAzurInput} />
              </Col>
              <Col xs={8} className="p-4">
                <Output azurResponse={data} loading={loading} />
              </Col>
            </Row>
          </Container>
        </main>
      </div>
    </ThemeProvider>
  );
}

export default App;
