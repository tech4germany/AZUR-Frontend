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
  if (data?.table != undefined) {
    changedRowCount = data.table.filter((row) => !row.is_identical).length;
  }

  return (
    <Card {...cssprops}>
      <Heading size="2xl">Ergebnis</Heading>
      {loading ? (
        <Spinner color="brand.orange" />
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
                  {data?.table.length || "unbekant"}
                </Text>{" "}
                Zeilen haben sich geändert,{" "}
                <Text d="inline" fontWeight="bold">
                  {data?.table.length - changedRowCount || "unbekant"}
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
  data: PropTypes.object, // TODO check these prop types
  error: PropTypes.object, // TODO check these prop types
  loading: PropTypes.bool,
};

export default Output;
