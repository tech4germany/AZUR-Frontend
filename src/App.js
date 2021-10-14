import React from "react";
import AzurDefault from "views/AzurDefault/AzurDefault";
import AzurCompare from "views/AzurCompare/AzurCompare";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import { Box, Flex, Button } from "@chakra-ui/react";

function App() {
  return (
    <Box className="App">
      <BrowserRouter>
        {/* NAV */}
        <Flex justifyContent="end" mx="10">
          <Link to="/">
            <Button>Azur Default</Button>
          </Link>
          <Link to="/azur_compare">
            <Button>Azur Compare</Button>
          </Link>
        </Flex>

        {/* APP */}
        <Box>
          <Switch>
            <Route exact={true} path="/">
              <AzurDefault />
            </Route>
            <Route exact={true} path="/azur_compare">
              <AzurCompare />
            </Route>
          </Switch>
        </Box>
      </BrowserRouter>
    </Box>
  );
}

export default App;
