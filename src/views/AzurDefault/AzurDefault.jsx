import React from "react";
import AzurInputs from "./Input/Input";
import Output from "./Output/Output";
import useAzur from "./hooks/useAzur";

import { Flex } from "@chakra-ui/react";

export default function AzurDefault() {
  const [azurInput, setAzurInput] = React.useState({ data: {}, errors: {} });
  const { data, loading, error } = useAzur(azurInput);

  return (
    <Flex
      flexDirection={["column", "column", "column", "row"]}
      height={["auto", "auto", "auto", "100vh"]}
      width={["auto", "auto", "auto", "90vw"]}
      margin={["0", "0", "0", "0 auto"]}
    >
      <AzurInputs
        azurInput={azurInput}
        setAzurInput={setAzurInput}
        backgroundColor="brand.backgroundGrey"
        maxHeight="100%"
        overflowY="auto"
        borderRadius="lg"
        m={3}
        width={["100%", "100%", "100%", "35%"]} // Todo proper width layout
        px="10"
        py="5"
      />
      <Output
        azurInput={azurInput}
        azurResponse={data}
        azurError={error}
        loading={loading}
        backgroundColor="brand.backgroundGrey"
        borderRadius="lg"
        m={3}
        maxHeight="100%"
        width={["100%", "100%", "100%", "65%"]}
        p="10"
        overflowY="auto"
      />
    </Flex>
  );
}
