import React from "react";

import { Flex } from "@chakra-ui/react";
import AzurCompareInput from "./AzurCompareInput"

export default function AzurDefault() {
  // const [azurCompareInput, setAzurCompareInput] = React.useState({ data: {}, errors: {} });

  return (
    <Flex
      flexDirection={["column", "column", "column", "row"]}
      height="100vh"
    >
      <AzurCompareInput />
  </Flex>
  );
}
