import React from "react";

import { Box, Center, Text } from "@chakra-ui/react";

const IndexFilter = (headerGroups) => {
  // get columns
  const cols = headerGroups?.headerGroups?.[0]?.headers;
  if (cols == null) return null;
  // get index column. return null if we do not find it
  const indexCol = cols.find((elem) => elem.id == "index");
  if (indexCol == null) return null;

  return (
    <Center>
      <Text>Wertebereich anzeigen von</Text>
      <Box>{indexCol.render("Filter")}</Box>
    </Center>
  );
};

export default IndexFilter;
