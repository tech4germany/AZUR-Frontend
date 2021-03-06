import React, { useEffect } from "react";
import * as d3 from "d3";
import PropTypes from "prop-types";
import { Box } from "@chakra-ui/layout";
import { getPartyColor } from "../utils/getPartyColor";

PieChart.propTypes = {
  data: PropTypes.object,
  outerRadius: PropTypes.number,
  innerRadius: PropTypes.number,
};

function PieChart({ data, outerRadius, innerRadius }) {
  const width = 2 * outerRadius;
  const height = 2 * outerRadius;

  useEffect(() => {
    drawChart();
  }, [data]);

  function drawChart() {
    const parsedData = Object.entries(data).map(([key, value]) => {
      return {
        label: key,
        value: value,
      };
    });

    // Remove the old svg
    // TODO: Do not selecet by ID to make this component reusable (or go for a more complex id)
    d3.select("#pie-container").select("svg").remove(); // Create new svg
    const svg = d3
      .select("#pie-container")
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${width / 2}, ${height / 2})`);

    const arcGenerator = d3
      .arc()
      .innerRadius(innerRadius)
      .outerRadius(outerRadius);
    const pieGenerator = d3
      .pie()
      .padAngle(0)
      .value((d) => d.value);

    const arc = svg.selectAll().data(pieGenerator(parsedData)).enter();

    // Append sectors
    arc
      .append("path")
      .attr("d", arcGenerator)
      .style("fill", (arc, i) => {
        let partyName = arc.data.label;
        return getPartyColor(partyName, i, parsedData.length);
      })
      .append("svg:title")
      .text((arc) => {
        return `${arc.data.label}\n${arc.data.value}`;
      })
      .style("stroke", "#ffffff")
      .style("stroke-width", 0); // Append text labels

    /* arc
      .append("text")
      .attr("text-anchor", "middle")
      .attr("alignment-baseline", "middle")
      .text((d) => d.data.label)
      .style("fill", "#ffffff")
      .attr("transform", (d) => {
        const [x, y] = arcGenerator.centroid(d);
        return `translate(${x}, ${y})`;
      }); */
  }

  return <Box id="pie-container" display="inline-block" width="auto" m={1} />;
}

export default PieChart;
