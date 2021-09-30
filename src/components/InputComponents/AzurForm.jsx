import React from "react";
import { Field, ErrorMessage, Form, FieldArray, useFormikContext } from "formik";
import bundestagMandatsverteilung from "../../constants/bundestagMandate.json";
import constants from "../../constants/constants.json";

import { IoMdRemove } from "react-icons/io";
import { PresetButton } from "../Buttons";

import PropTypes from "prop-types";

import {
  Flex,
  Box,
  Center,
  Heading,
  Input,
  Button,
  Text,
  Vstack
} from "@chakra-ui/react";

AzurForm.propTypes = {
  ParentPropProvider: PropTypes.func,
};

export default function AzurForm({ ParentPropProvider }) {
  const { values, errors, touched, isValidating, setFieldValue } = useFormikContext();


  React.useEffect(() => {
    console.log(errors)
    console.log(touched)
    console.log(errors.numSeats && touched.numSeats)
  }, [errors, touched])


  if (values == null) {
    return <p>Loading</p>;
  }

  return (
    <Form>
      <Center flexDirection="column">
        <Field
          as={Input}
          name="numSeats"
          type="number"
          fontSize="4xl"
          textAlign="center"
          width="6ex"
          height="auto"
        />
        <ErrorMessage name="numSeats" />
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
      <Flex flexDirection={["column", "column", "column", "row"]}>
        <PresetButton
          activeValue={values.partyStrengths}
          presetData={[
            {
              name: "SPD",
              strength: 1000000,
            },
            {
              name: "CDU",
              strength: 300000,
            },
            {
              name: "GRÜNE",
              strength: 100000,
            },
            {
              name: "LINKE",
              strength: 5000,
            },
          ]}
          attributeName={"partyStrengths"}
          setFieldValue={setFieldValue}
        >
          Demo Preset
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
                  <ErrorMessage name={`partyStrengths.${index}.name`} />
                  <Field
                    as={Input}
                    name={`partyStrengths.${index}.strength`}
                    type="number"
                  />
                  <ErrorMessage name={`partyStrengths.${index}.strength`} />

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
              width={"100%"}
              onClick={() => push({ name: "Fraktion XYZ", strength: 0 })}
            >
              <Flex flexDirection="row" m={0} width={"100%"}>
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
      {typeof errors.partyStrengths === 'string' && <ErrorMessage name="partyStrengths" /> }

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
