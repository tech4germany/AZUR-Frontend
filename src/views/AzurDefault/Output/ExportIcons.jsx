import React from "react";

import { HStack, Text, Button } from "@chakra-ui/react";
import { FaPrint } from "react-icons/fa";

const ExportIcons = () => {
  return (
    <HStack spacing="0">
      {/* // export button
      <Button variant="outline">
        <HStack align="center" spacing="0.3rem">
          <FaFileCsv />
          <Text fontWeight="normal" fontSize="sm">
            Exportieren
          </Text>
        </HStack>
      </Button>
      */}
      <Button
        variant="outline"
        onClick={() => {
          // unfortunately "beforeprint" did not realiably execute before the print preview is shown
          // therefore we are manually dispatching it here and waiting for a short time before actually calling the print
          window.dispatchEvent(new Event("beforeprint"));
          window.setTimeout(() => {
            window.print();
          }, 150);
        }}
      >
        <HStack spacing="0.3rem">
          <FaPrint />
          <Text fontWeight="normal" fontSize="sm">
            Drucken
          </Text>
        </HStack>
      </Button>
    </HStack>
  );
};

export default ExportIcons;
