import React from "react";
import Card from "theme/Card";
import {
  Heading,
  Spinner,
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Text,
  Box,
  Center,
} from "@chakra-ui/react";
import PropTypes from "prop-types";
import ComparisonTable from "./ComparisonTable";
import _ from "lodash";

const Output = ({ data, error, loading, ...cssprops }) => {
  let changedRowCount = "unbekannt";
  let tableLength = "unbekannt";
  let unchangedRowsCount = "unbekannt";
  if (data?.table != undefined) {
    changedRowCount = data.table.filter((row) => !row.is_identical).length;
    tableLength = data?.table.length;
    unchangedRowsCount = tableLength - changedRowCount;
  }

  return (
    <Card {...cssprops}>
      <Heading size="2xl">Ergebnis</Heading>
      {loading ? (
        <Center minHeight="40em">
          <Spinner size="xl" color="brand.orange" />
        </Center>
      ) : (
        <Box bg="white">
          {_.isEmpty(error) ? (
            <Center flexDirection="column">
              <Box textAlign="center" p="3" px="20" fontSize="xl">
                <Text d="inline" fontWeight="bold">
                  {changedRowCount}
                </Text>{" "}
                von{" "}
                <Text d="inline" fontWeight="bold">
                  {tableLength}
                </Text>{" "}
                Zeilen haben sich geändert,{" "}
                <Text d="inline" fontWeight="bold">
                  {unchangedRowsCount}
                </Text>{" "}
                sind gleich geblieben.
              </Box>
              <ComparisonTable
                tableData={data?.table}
                assignmentSequence={data?.assignment_sequence}
              />
            </Center>
          ) : (
            <Alert status="error">
              <AlertIcon />
              <AlertTitle mr={2}>Ungültige Eingabe!</AlertTitle>
              <AlertDescription>{error.message}</AlertDescription>
            </Alert>
          )}
        </Box>
      )}
    </Card>
  );
};

Output.propTypes = {
  data: PropTypes.object,
  error: PropTypes.object,
  loading: PropTypes.bool,
};

export default Output;
