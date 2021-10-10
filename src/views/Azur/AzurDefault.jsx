import React from "react";
import AzurInputs from "./Input";
import Output from "./Output";
import useAzur from "../AzurDefault/hooks/useAzur";

import { Flex } from "@chakra-ui/react";

export default function AzurDefault() {
  const [azurInput, setAzurInput] = React.useState({ data: {}, errors: {} });
  const { data, loading, error } = useAzur(azurInput);

  return (
    <Flex
      flexDirection={["column", "column", "column", "row"]}
      height="100vh"
    >
      <AzurInputs
        azurInput={azurInput}
        setAzurInput={setAzurInput}
        backgroundColor="gray.50"
        height="100%"
        overflowY="auto"
        width="80ex" // Todo proper width layout
        px="10"
        py="5"
      />
      <Output
        azurInput={azurInput}
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
