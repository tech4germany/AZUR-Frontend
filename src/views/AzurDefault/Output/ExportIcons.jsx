import React, { useRef } from "react";

import { useReactToPrint } from "react-to-print";
import { HStack, Text, Button, Box } from "@chakra-ui/react";
import { FaPrint } from "react-icons/fa";
import PrintWrapper from "../Print/PrintWrapper";

import PropTypes from "prop-types";

const ExportIcons = ({ azurResponse, azurInput }) => {
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  // TODO only render PrintWrapper to dom if we are printing (onClick)
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
      <Button variant="outline" onClick={handlePrint}>
        <HStack spacing="0.3rem">
          <FaPrint />
          <Text fontWeight="normal" fontSize="sm">
            Drucken
          </Text>
        </HStack>
      </Button>
      <Box display="none">
        <PrintWrapper
          azurResponse={azurResponse}
          azurInput={azurInput}
          ref={componentRef}
        />
      </Box>
    </HStack>
  );
};

ExportIcons.propTypes = {
  azurResponse: PropTypes.object,
  azurInput: PropTypes.object,
};

export default ExportIcons;
