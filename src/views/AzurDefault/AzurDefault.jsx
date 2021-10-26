import { Flex } from "@chakra-ui/react";
import React from "react";
import useAzur from "./hooks/useAzur";
import AzurInputs from "./Input/Input";
import Output from "./Output/Output";

export default function AzurDefault() {
  const [azurInput, setAzurInput] = React.useState({ data: {}, errors: {} });
  const { data, loading, error } = useAzur(azurInput);

  return (
    <Flex
      flexDirection={["column", "column", "column", "row"]}
      height={["auto", "auto", "auto", "100%"]}
      width={["auto", "auto", "auto", "90vw"]}
      margin={["0", "0", "0", "0 auto"]}
    >
      <AzurInputs
        azurInput={azurInput}
        setAzurInput={setAzurInput}
        maxHeight="100%"
        width={["100%", "100%", "100%", "35%"]} // Todo proper width layout
      />
      <Output
        azurInput={azurInput}
        azurResponse={data}
        azurError={error}
        loading={loading}
        maxHeight="100%"
        width={["100%", "100%", "100%", "65%"]}
      />
    </Flex>
  );
}
