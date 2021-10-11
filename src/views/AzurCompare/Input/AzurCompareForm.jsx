import { Center, Text, Flex, VStack } from "@chakra-ui/react";
import { Form, useFormikContext } from "formik";
import PropTypes from "prop-types";
import React from "react";
import { FieldInput } from "components/forms/FieldArrayInput";
import PartyStrengthsInput from "components/forms/PartyStrengthsInput";
import MethodsInput from "components/forms/MethodsInput";

AzurCompareForm.propTypes = {
  ParentStateUpdater: PropTypes.func,
};

export default function AzurCompareForm({ ParentStateUpdater }) {
  const { values, errors, setFieldValue } = useFormikContext();

  const MAX_FRACTIONS = 15;

  return (
    <Form>
      {/* NUM SEATS */}
      <Center flexDirection="column">
        <FieldInput
          name="numSeats"
          type="number"
          errorMsg={errors?.numSeats}
          fontSize="4xl"
          textAlign="center"
          color="brand.darkBlue"
          width="6ex"
          height="auto"
        />
        <Text fontSize="xl">Einheiten</Text>
      </Center>
      <Flex>
        {["distA", "distB"].map((attributeKeyBase) => (
          <VStack key={attributeKeyBase}>
            <PartyStrengthsInput
              values={values}
              errors={errors}
              setFieldValue={setFieldValue}
              MAX_FRACTIONS={MAX_FRACTIONS}
              attributeKey={`${attributeKeyBase}.partyStrengths`}
            />
            <MethodsInput
              values={values}
              setFieldValue={setFieldValue}
              attributeKey={`${attributeKeyBase}.method`}
            />
          </VStack>
        ))}
      </Flex>

      <ParentStateUpdater />
    </Form>
  );
}
