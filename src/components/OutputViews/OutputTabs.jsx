import React from "react";
import AnteileOutput from "./AnteileOutput";
import ReihenfolgeOutput from "./ReihenfolgeOutput";
import TabellenOutput from "./TabellenOutput";

import {
    Tabs,
    TabList,
    TabPanels,
    Tab,
    TabPanel,
} from "@chakra-ui/react";

import PropTypes from "prop-types";

OutputTabs.propTypes = {
    azurInput: PropTypes.object,
    azurResponse: PropTypes.object,
};

export default function OutputTabs({azurInput, azurResponse}) {
    return(
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
    )
}