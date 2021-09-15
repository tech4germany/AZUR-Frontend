import React from "react";
import AzurInputs from "./components/Input";
import Output from "./components/Output";
import { Container, Row, Col } from "react-bootstrap";
import { bundestagTheme } from "./css/themes";
import { ThemeProvider } from "styled-components";
import { useForm, useFieldArray } from "react-hook-form";

function App() {
  const [data, setData] = React.useState({});
  const [loading, setLoading] = React.useState(true);
  const [azurInput, setAzurInput] = React.useState({});

  const { control, register, watch, getValues, setValue, formState } = useForm({
    nativeValidation: true,
  }); // TODO we will introduce a custom validation
  const partyStrengths = useFieldArray({
    control,
    name: "partyStrengths",
    // keyName: "id", default to "id", you can change the key name
  });


  // UPDATING INPUTS FROM 
  const inputUpdate = watch();

  React.useEffect(() => {
    if (inputUpdate?.partyStrengths != null) {
      console.log(inputUpdate);
      console.log(azurInput.partyStrengths);
      
      /*TODO feels like parsing to int should happen as output of the form already*/
      const partyStrengthsAsInts = inputUpdate.partyStrengths.map((elem) => {
        return { name: elem.name, strength: parseInt(elem.strength) };
      });

      // TODO probably this can be done smoother
      if (
        (azurInput.method == inputUpdate.method &&
          azurInput.num_of_seats == parseInt(inputUpdate.numSeats) &&
          // TODO MAKE THIS ARRAY EQUALITY CHECK MORE SOLID (if we cant avoid it alltogether)
          JSON.stringify(azurInput.partyStrengths) ==
            JSON.stringify(partyStrengthsAsInts)) ||
        azurInput == null
      ) {
        return null;
      }
      console.log("CHANGING INPUT");
      setAzurInput({
        method: inputUpdate.method,
        num_of_seats: parseInt(inputUpdate.numSeats),
        partyStrengths: partyStrengthsAsInts,
      });
    }
   
  }, [inputUpdate]);

  React.useEffect(() => {
    const fetchAzur = async () => {
      setLoading(true);
      // Parse Form Content into a form digestable for the API
      const partyStrengthForApi = {};
      azurInput.partyStrengths.forEach((entry) => {
        partyStrengthForApi[entry.name] = entry.strength;
      });
      console.log("Starting request");
      console.log({
        votes: partyStrengthForApi,
        method: azurInput.method,
        num_of_seats: azurInput.num_of_seats,
      });
      // useEffect itself should not be async according to linter, so we work with an anonymous function
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
                <AzurInputs
                  formProps={{
                    register,
                    watch,
                    getValues,
                    setValue,
                    formState,
                    partyStrengths,
                  }}
                />
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
