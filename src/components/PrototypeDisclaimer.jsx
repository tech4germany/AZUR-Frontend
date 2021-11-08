import React from "react";
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

const PrototypeDisclaimer = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  React.useEffect(() => {
    onOpen();
  }, []);

  return (
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
  );
};

export default PrototypeDisclaimer;
