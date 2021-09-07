import React from "react";
import Input from "./components/Input";
import Output from "./components/Output";
import { Container, Row, Col } from "react-bootstrap";

function App() {
  const [data, setData] = React.useState({});
  const [azurInput] = React.useState({
    method: "hare",
    votes: {
      SPD: 1000000,
      CDU: 300000,
      GRUENE: 100000,
      LINKE: 50000,
    },
    num_of_seats: 25,
  });

  /* Fetching the result from API */
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

  /* Rendering the App */
  return (
    <div className="App">
      <header>Hello AZUR!</header>
      <main>
        <Container fluid>
          <Row>
            <Col xs={6}>
              <Input inputData={azurInput} />
            </Col>
            <Col xs={6}>
              <Output seatSplit={data.seats} />
            </Col>
          </Row>
        </Container>
      </main>
    </div>
  );
}

export default App;
