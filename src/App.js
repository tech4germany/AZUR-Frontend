import React from "react";
import AzurInputs from "./components/Input";
import Output from "./components/Output";
import useAzur from "./hooks/useAzur";

import { Flex } from "@chakra-ui/react";

function App() {
  const [azurInput, setAzurInput] = React.useState({});
  const [azurInputError, setAzurInputError] = React.useState({});
  const { data, loading, error } = useAzur(azurInput);

  return (
    <Flex
      className="App"
      flexDirection={["column", "column", "column", "row"]}
      height="100vh"
    >
      <AzurInputs
        azurInput={azurInput}
        setAzurInput={setAzurInput}
        setAzurInputError={setAzurInputError}
        backgroundColor="gray.50"
        height="100%"
        overflowY="auto"
        px="10"
        py="5"
      />
      <Output
        azurInput={azurInput}
        azurInputError={azurInputError}
        azurResponse={data}
        azurError={error}
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
