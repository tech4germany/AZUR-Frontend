import React from "react";
import { Field, Form, FieldArray, useFormikContext } from "formik";
import bundestagMandatsverteilung from "../constants/bundestagMandate.json";
import constants from "../constants/constants.json";

import { IoMdRemove } from "react-icons/io";
import { PresetButton } from "./Buttons";

import PropTypes from "prop-types";

import {
  Flex,
  Box,
  Center,
  Heading,
  Input,
  Button,
  Text
} from "@chakra-ui/react";

AzurForm.propTypes = {
  ParentPropProvider: PropTypes.func,
};

export default function AzurForm({ParentPropProvider}) {
  
  const { values, setFieldValue } = useFormikContext()

  if (values == null) {
    return <p>Loading</p>
  }

  return (
    <Form>
      <Center flexDirection="column">
        <Input as={Field}
          name="numSeats"
          type="number"
          fontSize="4xl"
          textAlign='center'
          width='6ex'
          height='auto'
        />
        <Text fontSize="xl">Einheiten</Text>
      </Center>

      <Heading as="h3" size="xl">
        Aufteilen nach
      </Heading>
      <Flex flexDirection={["column", "column", "column", "row"]}>
        <PresetButton
          activeValue={values.partyStrengths}
          presetData={bundestagMandatsverteilung.btw2021}
          attributeName={"partyStrengths"}
          setFieldValue={setFieldValue}
        >
          Bundestagswahl 2021
        </PresetButton>
        <PresetButton
          activeValue={values.partyStrengths}
          presetData={bundestagMandatsverteilung.btw2017}
          attributeName={"partyStrengths"}
          setFieldValue={setFieldValue}
        >
          Bundestagswahl 2017
        </PresetButton>
      </Flex>

      {/* INPUT PARTY STRENGTHS */}
      <Heading as="h3" size="xl">
        Fraktionsstärken
      </Heading>
      <FieldArray name="partyStrengths">
        {({ remove, push }) => (
          <Box>
            {values.partyStrengths.length > 0 &&
              values.partyStrengths.map((_, index) => (
                <Flex key={index} flexDirection="row">
                  <Field
                    as={Input}
                    name={`partyStrengths.${index}.name`}
                    type="text"
                  />
                  <Field
                    as={Input}
                    name={`partyStrengths.${index}.strength`}
                    type="number"
                  />
                  <Button variant="ghost" onClick={() => remove(index)}>
                    <IoMdRemove />
                  </Button>
                </Flex>
              ))}
            {/*ADD FRACTION FAKE INPUT*/}
            <Button
              variant="ghost"
              _hover={{
                backgroundColor: "brand.darkBlueAlpha.300",
              }}
              px={0}
              m={0}
              mt={1}
              width={'100%'}
              onClick={() => push({ name: "Fraktion XYZ", strength: 0 })}
            >
              <Flex flexDirection="row" m={0} width={'100%'}>
                <Input disabled variant="fakeInput" />
                <Input disabled variant="fakeInput" />
                <Button as="span" variant="ghost" pointerEvents="none">
                  <Text color="blackAlpha.400">+</Text>
                </Button>
              </Flex>
            </Button>
          </Box>
        )}
      </FieldArray>

      {/* MATHEMATICAL METHOD */}
      <Heading as="h3" size="xl">
        Mathematische Verfahren
      </Heading>
      <Flex flexDirection={["column", "column", "column", "row"]}>
        {constants.azurMethods.map((method) => {
          return (
            <PresetButton
              key={method.apiName}
              activeValue={values.method}
              presetData={method.apiName}
              attributeName={"method"}
              setFieldValue={setFieldValue}
            >
              {method.title}
            </PresetButton>
          );
        })}
      </Flex>
      <ParentPropProvider />
    </Form>
  );
}
