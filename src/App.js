import React from "react";
import AzurDefault from "views/AzurDefault/AzurDefault";
import AzurCompare from "views/AzurCompare/AzurCompare";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Box } from "@chakra-ui/react";

function App() {
  return (
    <Box className="App">
      <BrowserRouter>
        {/* NAV */}
        {/*         <Flex justifyContent="end" mx="10" height="5vh">
          <Link to="/">
            <Button>Azur Default</Button>
          </Link>
          <Link to="/compare">
            <Button>Azur Compare</Button>
          </Link>
        </Flex> */}

        {/* APP */}
        <Box height="100vh">
          <Switch>
            <Route exact={true} path="/">
              <AzurDefault />
            </Route>
            <Route exact={true} path="/compare">
              <AzurCompare />
            </Route>
          </Switch>
        </Box>
      </BrowserRouter>
    </Box>
  );
}

export default App;
