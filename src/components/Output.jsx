import { React } from "react";
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

Output.propTypes = {
  azurResponse: PropTypes.object,
  loading: PropTypes.bool,
};

export default function Output({ azurResponse, loading }) {
  return (
    <Box px="10" py="5">
      <Heading size="2xl">Output</Heading>
      {loading ? (
        <Spinner color="brand.orange" />
      ) : (
        <Tabs defaultActiveKey="anteile">
          <TabList>
            <Tab>Anteile</Tab>
            <Tab>Zugriffsreihenfolge</Tab>
            <Tab>Tabelle</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <AnteileOutput seatSplit={azurResponse.seats} />
            </TabPanel>
            <TabPanel>
              <ReihenfolgeOutput seatOrder={azurResponse.assignment_sequence} />
            </TabPanel>
            <TabPanel>
              <p>Tabelle goes here</p>
            </TabPanel>
          </TabPanels>
        </Tabs>
      )}
    </Box>
  );
}
