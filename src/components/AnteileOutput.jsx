import { React } from "react";
import PropTypes from "prop-types";
import { Row, Table, Container } from 'react-bootstrap'
import PieChart from './PieChart'


AnteileOutput.propTypes = {
    seatSplit: PropTypes.object,
  };

export default function AnteileOutput({ seatSplit }) {
  return (
    <Container className="mt-5">
      <Row className="text-align-center">
        {/*TODO: Why does table span to 100% width -> fix that cleanly*/}
        <Table className="p-5">
          <thead>
            <tr>
              {Object.keys(seatSplit).map((fractionName) => (
                <th key={fractionName}>{fractionName} </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              {Object.keys(seatSplit).map((fractionName) => (
                <td key={fractionName}>{seatSplit[fractionName]}</td>
              ))}
            </tr>
          </tbody>
        </Table>
      </Row>
      <Row className="d-flex justify-content-center">
        <PieChart data={seatSplit} outerRadius={200} innerRadius={100} />
      </Row>
    </Container>
  );
}
