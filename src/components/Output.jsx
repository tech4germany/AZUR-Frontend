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
} from "@chakra-ui/react";
import AnteileOutput from "./OutputViews/AnteileOutput";
import ReihenfolgeOutput from "./OutputViews/ReihenfolgeOutput";
import TabellenOutput from "./OutputViews/TabellenOutput";

Output.propTypes = {
  azurInput: PropTypes.object,
  azurResponse: PropTypes.object,
  loading: PropTypes.bool,
};

export default function Output({
  azurInput,
  azurResponse,
  loading,
  ...cssprops
}) {
  return (
    <Box {...cssprops}>
      <Heading size="2xl">Output</Heading>
      {loading ? (
        <Spinner color="brand.orange" />
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
              <AnteileOutput seatSplit={azurResponse.seats} />
            </TabPanel>
            <TabPanel>
              <ReihenfolgeOutput seatOrder={azurResponse.assignment_sequence} />
            </TabPanel>
            <TabPanel>
              <TabellenOutput
                rawTableData={azurResponse.table}
                partyStrengths={azurInput.partyStrengths}
              />
            </TabPanel>
          </TabPanels>
        </Tabs>
      )}
    </Box>
  );
}
