import React from "react";
import PropTypes from "prop-types";

import {
  Flex,
  Box,
  Center,
  Heading,
  Input,
  Button,
  ButtonGroup,
  Spacer,
  Text,
} from "@chakra-ui/react";

import bundestagMandatsverteilung from "../constants/bundestagMandate.json";
import constants from "../constants/constants.json";

import { IoMdRemove } from "react-icons/io";

import { MethodButton, PresetButton } from "./Buttons";

AzurInputs.propTypes = {
  formProps: PropTypes.object,
};

function AzurInputs({ formProps }) {
  // Setting initial values
  React.useEffect(() => {
    formProps.setValue("numSeats", 25);
    formProps.setValue("method", "hare");
    formProps.partyStrengths.replace(bundestagMandatsverteilung.data);
  }, []);

  return (
    <Box
      backgroundColor="gray.50"
      height="100vh"
      overflowY="auto"
      px="10"
      py="5"
    >
      {/* TODO: Height 100vh is too brutal here? */}
      <Heading size="2xl">Input</Heading>
      <form>
        <Center flexDirection="column">
          <Input
            type="number"
            fontSize="5xl"
            height="3.5rem" // Todo we want to use the font size var 5xl here!
            width="6ex"
            textAlign="center"
            name="numSeats"
            {...formProps.register("numSeats", {
              required: true,
              minValue: 0,
            })}
          />
          <Text fontSize="xl">Einheiten</Text>
        </Center>

        {/* PRESETS */}
        <Heading as="h3" size="xl">
          Aufteilen nach
        </Heading>
        <ButtonGroup>
          <PresetButton
            fieldArray={formProps.partyStrengths}
            presetData={bundestagMandatsverteilung.data}
          >
            Aktuelle Bundestagsbesetzung
          </PresetButton>
          <PresetButton
            fieldArray={formProps.partyStrengths}
            presetData={[{ name: "Abc", strength: 59 }]}
          >
            Alt Button
          </PresetButton>
        </ButtonGroup>

        {/* INPUT PARTY STRENGTHS */}
        <Heading as="h3" size="xl">
          Fraktionsstärken
        </Heading>
        <Box>
          {console.log(formProps.partyStrengths.fields)}
          {formProps.partyStrengths.fields.map((field, index) => (
            <Flex key={index} flexDirection="row">
              <Input
                m={"1"}
                type="text"
                // TODO important to include key with field's id // TODO
                {...formProps.register(`partyStrengths.${index}.name`)}
              />
              <Input
                type="number"
                min={1}
                m={"1"}
                {...formProps.register(`partyStrengths.${index}.strength`)}
              />
              <Button
                variant="ghost"
                onClick={() => {
                  formProps.partyStrengths.remove(index);
                }}
              >
                <IoMdRemove />
              </Button>
            </Flex>
          ))}
          <Button
            variant="ghost"
            _hover={{}}
            onClick={() => {
              formProps.partyStrengths.append({
                name: "FraktionXY",
                strength: 0,
              });
            }}
          >
            <Flex flexDirection="row">
              <Input disabled variant="outline" m={"1"} pointerEvents="none" />
              <Input disabled variant="outline" m={"1"} pointerEvents="none" />
              <Spacer />
            </Flex>
          </Button>
        </Box>

        {/* MATHEMATICAL METHOD */}
        <Heading as="h3" size="xl">
          Mathematische Verfahren
        </Heading>
        <Flex flexDirection={["row", "column", "column"]} flexWrap="wrap">
          {constants.azurMethods.map((method) => {
            return (
              <Box key={method.apiName}>
                <MethodButton
                  apiMethodName={method.apiName}
                  activeMethod={formProps.getValues("method")} //TODO currentValues
                  setFieldValue={formProps.setValue}
                >
                  {method.title}
                </MethodButton>
              </Box>
            );
          })}
        </Flex>
      </form>
    </Box>
  );
}

export default AzurInputs;
