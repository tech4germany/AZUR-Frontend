import React, { useRef } from "react";
import { Box, HStack, Text, Button } from "@chakra-ui/react";
import { FaPrint } from "react-icons/fa";
import PropTypes from "prop-types";

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
      <Button variant="outline">
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
