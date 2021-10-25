import React from "react";
import DistributionOutput from "./DistributionOutput";
import AssignmentSeq from "./AssignmentSeq";
import TableOutput from "./TableOutput";
import ExportIcons from "./ExportIcons";

import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Spinner,
  Center,
  Flex,
} from "@chakra-ui/react";

import PropTypes from "prop-types";

OutputTabs.propTypes = {
  azurInput: PropTypes.object,
  azurResponse: PropTypes.object,
  loading: PropTypes.bool,
};

export default function OutputTabs({ azurInput, azurResponse, loading }) {
  React.useEffect(() => {
    if (azurInput.method === "hare") {
      setTabIndex(0);
    }
  }, [azurInput]);

  const [tabIndex, setTabIndex] = React.useState(0);

  const handleTabsChange = (index) => {
    setTabIndex(index);
  };

  return (
    <Tabs mt="10" align="left" index={tabIndex} onChange={handleTabsChange}>
      <Flex justifyContent="space-between" alignItems="end">
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
            Liste
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
        <ExportIcons />
      </Flex>

      {loading ? (
        <Center minHeight="40em">
          <Spinner size="xl" color="brand.orange" />
        </Center>
      ) : (
        <TabPanels>
          <TabPanel>
            <DistributionOutput
              isAmbiguous={azurResponse.distribution.is_ambiguous}
              seatSplit={azurResponse.distribution.seats}
              azurInput={azurInput}
            />
          </TabPanel>
          <TabPanel>
            <AssignmentSeq
              tableData={azurResponse.table}
              assignmentSequence={azurResponse.assignment_sequence}
            />
          </TabPanel>
          <TabPanel>
            <TableOutput
              tableData={azurResponse.table}
              assignmentSequence={azurResponse.assignment_sequence}
              azurInput={azurInput}
            />
          </TabPanel>
        </TabPanels>
      )}
    </Tabs>
  );
}
