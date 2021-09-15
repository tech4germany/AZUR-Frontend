import React from "react";
import PropTypes from "prop-types";

import { Flex, Box, Center, Heading, Input, Button } from "@chakra-ui/react";

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
    console.log();
  }, []);

  return (
    <Box backgroundColor="gray.50" height='100vh' overflowY='auto'>
      <form>
        <Center flexDirection="column">
          <Input
            type="number"
            fontSize="3xl"
            name='numSeats'
            {...formProps.register("numSeats",{
                required: true,
                minValue: 0
              })
            }
          />
          <p>Einheiten</p>
        </Center>

        {/* PRESETS */ }
        <Heading as="h3" size="xl">Aufteilen nach</Heading>
        <Flex flexDirection={["column", "column", "row"]} flexWrap='wrap'>
          <PresetButton
            currentInput={formProps.partyStrengths}
            presetData={bundestagMandatsverteilung.data}
            setValue={formProps.setValue}
            attribute='partyStrengths'
          >
            Aktuelle Bundestagsbesetzung
          </PresetButton>
          <PresetButton
            currentInput={formProps.partyStrengths}
            presetData={bundestagMandatsverteilung.data}
            setValue={formProps.setValue}
            attribute='partyStrengths'
          >
            Alt Button
          </PresetButton>
        </Flex>
        
        {/* INPUT PARTY STRENGTHS */ }
        <Heading as="h3" size="xl">Fraktionsstärken</Heading>
        <Box>
          {formProps.partyStrengths.fields.map((field, index) => (
            <Flex key={index} flexDirection="row">
              <Input
                m={'1'}
                type="text"
                // TODO important to include key with field's id // TODO
                {...formProps.register(`partyStrengths.${index}.name`)}
              />
              <Input
                type="number"
                min={1}
                m={'1'}
                // important to include key with field's id // TODO
                {...formProps.register(`partyStrengths.${index}.strength`)}
              />
              <Button variant='ghost' onClick={() => {alert(`TODO Remove row for partyStrenghts.${index}`)}}>
                <IoMdRemove />
              </Button>
            </Flex>
          ))}
          <Button variant='ghost' _hover={{}} onClick={()=>{
            console.log("Hello")
          }}>
            <Flex flexDirection="row">
              <Input disabled variant="outline" m={'1'} pointerEvents='none' />
              <Input disabled variant="outline" m={'1'} pointerEvents='none' />
              <Button variant='ghost' pointerEvents='none'>+</Button>
            </Flex>
          </Button>

        </Box>
        
        {/* MATHEMATICAL METHOD */ }
        <Heading as="h3" size="xl">Mathematische Verfahren</Heading>
        <Flex flexDirection={['row', 'column', 'column']} flexWrap='wrap'>
            {constants.azurMethods.map((method) => {
              return (
                <Box key={method.apiName}>
                  <MethodButton
                    apiMethodName={method.apiName}
                    activeMethod={formProps.getValues('method')} //TODO currentValues
                    setFieldValue={formProps.setValue}
                  >
                    {method.title}
                  </MethodButton>
                </Box>
              );
            })}
        </Flex>

        <Box>
          <input fontSize="5xl" {...formProps.register("method")} />
        </Box>

      </form>
    </Box>
  );
}

export default AzurInputs;
