import { React } from "react";
import PropTypes from "prop-types";
import { Spinner} from 'react-bootstrap'
import AnteileOutput from './AnteileOutput'

Output.propTypes = {
  seatSplit: PropTypes.object,
  loading: PropTypes.bool
};

export default function Output({ seatSplit, loading }) {
  return (
    <>
      <h2>Output</h2>
      {loading ? (
          <Spinner animation="border"/>
      ) : (
        <AnteileOutput seatSplit={seatSplit} />
      )}

    </>
  );
}
