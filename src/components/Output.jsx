import { React } from "react";
import PropTypes from "prop-types";
import { Spinner, Tabs, Tab } from 'react-bootstrap'
import AnteileOutput from './AnteileOutput'
import ReihenfolgeOutput from './ReihenfolgeOutput'

Output.propTypes = {
  azurResponse: PropTypes.object,
  loading: PropTypes.bool
};

export default function Output({ azurResponse, loading }) {
  return (
    <>
      <h1>Output</h1>
      {loading ? (
          <Spinner animation="border"/>
      ) : (
        <Tabs defaultActiveKey="anteile">
          <Tab eventKey="anteile" title="Anteile">
            <AnteileOutput seatSplit={azurResponse.seats} />
          </Tab>
          <Tab eventKey="zugriffsreihenfolge" title="Zugriffsreihenfolge">
            <ReihenfolgeOutput seatOrder={azurResponse.assignment_sequence}/>
            {console.log()}
          </Tab>
          <Tab eventKey="azurTable" title="Tabelle">
            <p>Tabelle goes here</p>
          </Tab>
        </Tabs>
      )}

    </>
  );
}
