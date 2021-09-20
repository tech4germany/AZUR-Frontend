import React from "react";
import PropTypes from "prop-types";

import {
  Flex,
  Box,
  Center,
  Heading,
  Input,
  Button,
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

function AzurInputs({ formProps, ...cssprops }) {
  // Setting initial values
  React.useEffect(() => {
    formProps.setValue("numSeats", 25);
    formProps.setValue("method", "schepers");
    formProps.partyStrengths.replace(bundestagMandatsverteilung.data);
  }, []);

  return (
    <Box {...cssprops}>
      <Heading size="2xl">Input</Heading>
      <form>
        <Center flexDirection="column">
          <Input
            variant="azur-input"
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
          <Text fontSize="xl" padding={2}>
            Einheiten
          </Text>
        </Center>

        {/* PRESETS */}
        <Heading as="h3" size="xl">
          Aufteilen nach
        </Heading>
        <Flex flexDirection={['column', 'column', 'column', 'row']}>
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
            Mandatsprognose (INSA)
          </PresetButton>
        </Flex>

        {/* INPUT PARTY STRENGTHS */}
        <Heading as="h3" size="xl">
          Fraktionsstärken
        </Heading>
        <Box>
          {formProps.partyStrengths.fields.map((field, index) => (
            <Flex key={index} flexDirection="row">
              <Input
                type="text"
                variant="azur-input"
                // TODO important to include key with field's id // TODO
                {...formProps.register(`partyStrengths.${index}.name`)}
              />
              <Input
                type="number"
                min={1}
                variant="azur-input"
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
            _hover={{
              backgroundColor: 'brand.darkBlueAlpha.300'
            }}
            px={0}
            m={0}
            mt={1}
            onClick={() => {
              formProps.partyStrengths.append({
                name: "FraktionXY",
                strength: 0,
              });
            }}
          >
            <Flex flexDirection="row" m={0}>
              <Input disabled variant="fakeInput" />
              <Input disabled variant="fakeInput" />
              <Button
                variant="ghost"
                pointerEvents="none"
              >
                <Text color='blackAlpha.400'>+</Text>
              </Button>
              <Spacer />
            </Flex>
          </Button>
        </Box>

        {/* MATHEMATICAL METHOD */}
        <Heading as="h3" size="xl">
          Mathematische Verfahren
        </Heading>
        <Flex flexDirection={['column', 'column', 'column', 'row']}>
          {constants.azurMethods.map((method) => {
            return (
              <MethodButton
                key={method.apiName}
                apiMethodName={method.apiName}
                activeMethod={formProps.getValues("method")} //TODO currentValues
                setFieldValue={formProps.setValue}
              >
                {method.title}
              </MethodButton>
            );
          })}
        </Flex>
      </form>
    </Box>
  );
}

export default AzurInputs;
