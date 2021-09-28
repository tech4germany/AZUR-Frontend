import React from "react";
import AzurInputs from "./components/Input";
import Output from "./components/Output";

import { Flex } from "@chakra-ui/react";

function App() {
  const [data, setData] = React.useState({});
  const [loading, setLoading] = React.useState(true);
  const [azurInput, setAzurInput] = React.useState({});



  //*** FETCHING AZUR OUTPUTS
  React.useEffect(() => {
    const fetchAzur = async () => {
      setLoading(true);
      // Parse Form Content into a form digestable for the API
      const partyStrengthForApi = {};
      azurInput.partyStrengths.forEach((entry) => {
        partyStrengthForApi[entry.name] = entry.strength;
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
          return_table: true,
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
    <Flex
      className="App"
      flexDirection={["column", "column", "row", "row"]}
      height="100vh"
    >
        <AzurInputs
          azurInput={azurInput}
          setAzurInput={setAzurInput}
          backgroundColor="gray.50"
          height="100%"
          overflowY="auto"
          px="10"
          py="5"
        />
        <Output
          azurInput={azurInput}
          azurResponse={data}
          loading={loading}

          height="100%"
          px="10"
          py="5"
          flexGrow={1}
          overflowY="auto"
        />
    </Flex>
  );
}

export default App;
