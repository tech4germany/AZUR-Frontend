import { Flex } from "@chakra-ui/react";
import React from "react";
import AzurInputs from "./Input/Input";
import Output from "./Output/Output";
import { AzurContextWrapper } from "context/AzurContext";
import { usePrint } from "utils/usePrint";
import PrintWrapper from "./Print/PrintWrapper";
export default function AzurDefault() {
  const { isPrinting } = usePrint();

  return (
    <AzurContextWrapper>
      {isPrinting ? (
        <PrintWrapper />
      ) : (
        <Flex
          flexDirection={["column", "column", "column", "row"]}
          height={["auto", "auto", "auto", "100%"]}
          width={["auto", "auto", "auto", "90vw"]}
          margin={["0", "0", "0", "0 auto"]}
        >
          <AzurInputs
            maxHeight="100%"
            width={["100%", "100%", "100%", "35%"]}
          />
          <Output maxHeight="100%" width={["100%", "100%", "100%", "65%"]} />
        </Flex>
      )}
    </AzurContextWrapper>
  );
}
