import React from "react";
import PropTypes from "prop-types";
import DataTable from "./DataTable";
import { getPartyColor } from "../../utils/getPartyColor";
import { Text, Flex } from "@chakra-ui/react";
import { Icon } from "@chakra-ui/icons"


TabellenOutput.propTypes = {
  tableData: PropTypes.array,
  assignmentSequence: PropTypes.array,
};

export default function TabellenOutput({ tableData, assignmentSequence }) {
  let columns = [];
  let data = [];

  function ZugriffOutput({ cell }) {
    console.log(cell);
    const value = cell?.value;
    if (Array.isArray(value)) {
      return "Mehrdeutig! " + value.join(" oder ");
    } else {
      const partyNames = Object.keys(tableData[0].seats);
      const totalPartyCount = partyNames.length;
      const index = partyNames.findIndex((elem) => elem == value)
      const partyColor = getPartyColor(value, index, totalPartyCount)

      const CircleIcon = (props) => (
        <Icon viewBox="0 0 200 200" {...props}>
          <path
            fill="currentColor"
            d="M 100, 100 m -75, 0 a 75,75 0 1,0 150,0 a 75,75 0 1,0 -150,0"
          />
        </Icon>
      )

      return(
        <Flex align='center'>
          <CircleIcon color={partyColor} mr={2} boxSize={12}/>
          <Text flex={1} textAlign='center'>{value}</Text>
        </Flex>
      ) 
    }
  }
  ZugriffOutput.propTypes = {
    cell: PropTypes.object,
  };
  if (tableData != null && Array.isArray(tableData) && tableData.length >= 1) {
    // set up columns
    const partyNames = Object.keys(tableData[0].seats);
    columns = partyNames.map((partyName) => {
      return {
        Header: partyName,
        accessor: "seats." + partyName, // we want to access the seats subitem
        isNumeric: true,
        Cell: ({ cell: { value } }) => {
          if (Array.isArray(value)) {
            return "Mehrdeutig! " + value.join(" oder ");
          } else {
            return value;
          }
        },
      };
    });

    const assignmentCol = [
      {
        Header: "Zugriff",
        accessor: "seat_goes_to",
        Cell: ZugriffOutput,
      },
    ];
    columns = assignmentCol.concat(columns);
    // set up data: zip together tableData and assignmentSequence

    data = tableData.map((tableRow, i) => {
      return { seat_goes_to: assignmentSequence[i].seat_goes_to, ...tableRow };
    });
  }

  return <DataTable data={data} columns={columns} />;
}
