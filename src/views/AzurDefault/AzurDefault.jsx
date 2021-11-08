import { Flex } from "@chakra-ui/react";
import React from "react";
import AzurInputs from "./Input/Input";
import Output from "./Output/Output";
import { AzurContextWrapper } from "context/AzurContext";

export default function AzurDefault() {
  return (
    <AzurContextWrapper>
      <Flex
        flexDirection={["column", "column", "column", "row"]}
        height={["auto", "auto", "auto", "100%"]}
        width={["auto", "auto", "auto", "90vw"]}
        margin={["0", "0", "0", "0 auto"]}
      >
        <AzurInputs
          maxHeight="100%"
          width={["100%", "100%", "100%", "35%"]} // Todo proper width layout
        />
        <Output
          maxHeight="100%"
          width={["100%", "100%", "100%", "65%"]}
        />
      </Flex>
    </AzurContextWrapper>
  );
}
