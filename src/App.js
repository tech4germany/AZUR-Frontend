import React from "react";
import AzurInputs from "./components/Input";
import Output from "./components/Output";
import _ from "lodash";
import { Flex } from "@chakra-ui/react";

function App() {
  const [data, setData] = React.useState({});
  const [loading, setLoading] = React.useState(true);
  const [azurInput, setAzurInput] = React.useState({});

  const DEBOUNCE_DELAY = 700; // we wait for additional input for 700ms before calling AZUR

  //*** FETCHING AZUR OUTPUTS
  const fetchAzur = async (azurInputUpdate) => {
    setLoading(true);
    // Parse Form Input into a form digestable for the API
    const partyStrengthForApi = {};
    azurInputUpdate.partyStrengths.forEach((entry) => {
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
        method: azurInputUpdate.method,
        num_of_seats: azurInputUpdate.num_of_seats,
        return_table: true,
      }),
    }).then((resp) => resp.json()
    ).catch((err) => {
      // TODO handle errors!  
      console.log(err)
    });
    setData(azurResp);
    setLoading(false);
  };

  const debouncedFetchAzur = React.useCallback(
    _.debounce((azurInputUpdate) => {
      fetchAzur(azurInputUpdate);
    }, DEBOUNCE_DELAY),
    []
  );

  React.useEffect(() => {
    if ("partyStrengths" in azurInput) {
      debouncedFetchAzur(azurInput);
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
