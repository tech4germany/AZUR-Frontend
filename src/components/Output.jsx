import React from "react";
import PropTypes from "prop-types";
import {
  Spinner,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Heading,
  Box,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";
import AnteileOutput from "./OutputViews/AnteileOutput";
import ReihenfolgeOutput from "./OutputViews/ReihenfolgeOutput";
import TabellenOutput from "./OutputViews/TabellenOutput";
import _ from "lodash";

Output.propTypes = {
  azurInput: PropTypes.object,
  azurInputError: PropTypes.object,
  azurResponse: PropTypes.object,
  azurError: PropTypes.object,
  loading: PropTypes.bool,
};

export default function Output({
  azurInput,
  azurInputError,
  azurResponse,
  azurError,
  loading,
  ...cssprops
}) {
  return (
    <Box {...cssprops}>
      <Heading size="2xl">Output</Heading>
      {loading ? (
        <Spinner color="brand.orange" />
      ) : azurInputError != null && !(_.isEmpty(azurInputError)) ? (
        <Alert status="error">
          <AlertIcon />
          <AlertTitle mr={2}>Ungültige Eingabe!</AlertTitle>
          <AlertDescription>
            Es besteht ein Fehler in der Eingabe. Sie müssen die Daten anpassen, um eine Berechnung durchführen zu können.
          </AlertDescription>
        </Alert>
      ) : azurError != null ? (
        <Alert status="error">
          <AlertIcon />
          <AlertTitle mr={2}>Fehler bei der Berechnung Berechnung</AlertTitle>
          <AlertDescription>
            Es ist ein Fehler bei der Berechnung aufgetreten: {azurError.message}
          </AlertDescription>
        </Alert>
      ) : (
        <Tabs defaultActiveKey="anteile">
          <TabList>
            <Tab>Anteile</Tab>
            <Tab
              title={
                azurInput.method === "hare"
                  ? `Bei der mathematischen Berechnungsmethode Hare/Niemeyer entsteht keine Zugriffsreihenfolge. Probieren Sie eine andere Methode.`
                  : `Reihenfolge in der die einzelnen Einheiten an die Fraktionen vergeben werden.`
              }
              isDisabled={azurInput.method === "hare"}
            >
              Zugriffsreihenfolge
            </Tab>
            <Tab
              isDisabled={azurInput.method === "hare"}
              title={
                azurInput.method === "hare"
                  ? `Bei der mathematischen Berechnungsmethode Hare/Niemeyer entsteht keine tabellarische Übersicht. Probieren Sie eine andere Methode.`
                  : `Tabellarische Übersicht für die Verteilmassen von 1 bis ${azurInput.numSeats}`
              }
            >
              Tabelle
            </Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <AnteileOutput
                isAmbiguous={azurResponse.distribution.is_ambiguous}
                seatSplit={azurResponse.distribution.seats}
              />
            </TabPanel>
            <TabPanel>
              <ReihenfolgeOutput
                assignmentSequence={azurResponse.assignment_sequence}
              />
            </TabPanel>
            <TabPanel>
              <TabellenOutput tableData={azurResponse.table} />
            </TabPanel>
          </TabPanels>
        </Tabs>
      )}
    </Box>
  );
}
