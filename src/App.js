import React from "react";
import AzurInputs from "./components/Input";
import Output from "./components/Output";

import { Flex } from "@chakra-ui/react";
import { useForm, useFieldArray } from "react-hook-form";

function App() {
  const [data, setData] = React.useState({});
  const [loading, setLoading] = React.useState(true);
  const [azurInput, setAzurInput] = React.useState({});

  const formProps = useForm();
  const partyStrengths = useFieldArray({
    control: formProps.control,
    name: "partyStrengths",
    // keyName: "id", default to "id", you can change the key name
  });

  //*** UPDATING INPUTS
  const inputUpdate = formProps.watch();

  React.useEffect(() => {
    if (inputUpdate?.partyStrengths != null) {
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
      setAzurInput({
        method: inputUpdate.method,
        num_of_seats: parseInt(inputUpdate.numSeats),
        partyStrengths: partyStrengthsAsInts,
      });
    }
  }, [inputUpdate]);

  //*** FETCHING AZUR OUTPUTS
  React.useEffect(() => {
    const fetchAzur = async () => {
      setLoading(true);
      // Parse Form Content into a form digestable for the API
      const partyStrengthForApi = {};
      azurInput.partyStrengths.forEach((entry) => {
        partyStrengthForApi[entry.name] = entry.strength;
      });
      console.log("Starting request");

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

  //*** RENDERING THE APP
  return (
    <div className="App">
      <Flex flexDirection={["column", "row", "row"]}>
        <AzurInputs formProps={{ ...formProps, partyStrengths }} />
        <Output azurResponse={data} loading={loading} />
      </Flex>
    </div>
  );
}

export default App;
