import React from "react";
import AzurDefault from "views/AzurDefault/AzurDefault";
import AzurCompare from "views/AzurCompare/AzurCompare";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Box } from "@chakra-ui/react";
import {
  Link,
  Button,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";

function App() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  React.useEffect(() => {
    onOpen();
  }, []);

  return (
    <Box className="App">
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Diese Seite ist ein Prototyp.</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            Diese Seite ist ein Prototyp des Tech4Germany Fellowship Jahrgangs
            2021. Die Seite wird nicht mehr aktiv gepflegt, und für die
            Richtigkeit der Informationen übernehmen wir keine Gewähr.
          </ModalBody>

          <ModalFooter>
            <Button mr={3} variant="ghost">
              <Link href="https://tech.4germany.org/project/anteilsberechner-bundestag/">
                Mehr Informationen
              </Link>
            </Button>
            <Button colorScheme="blue" onClick={onClose}>
              Verstanden
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Box height="100vh">
        <AzurDefault />
      </Box>
      {/* <BrowserRouter>  */}
      {/* NAV */}
      {/*
      <Flex justifyContent="end" mx="10" height="5vh">
          <Link to="/">
            <Button>Azur Default</Button>
          </Link>
          <Link to="/compare">
            <Button>Azur Compare</Button>
          </Link>
        </Flex> */}

      {/* APP */}
      {/*       <Box height="100vh">
        <Switch>
            <Route exact={true} path="/">
        <AzurDefault />
        </Route>
            <Route exact={true} path="/compare">
              <AzurCompare />
            </Route>
          </Switch>
      </Box>
    </BrowserRouter> */}
    </Box>
  );
}

export default App;
