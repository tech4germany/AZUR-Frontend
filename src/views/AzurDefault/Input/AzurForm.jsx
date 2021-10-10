import { Center, Text } from "@chakra-ui/react";
import { Form, useFormikContext } from "formik";
import PropTypes from "prop-types";
import React from "react";
import { FieldInput } from "components/forms/FieldArrayInput";
import PartyStrengthsInput from "components/forms/PartyStrengthsInput";
import MethodsInput from "components/forms/MethodsInput";

AzurForm.propTypes = {
  ParentStateUpdater: PropTypes.func,
};

export default function AzurForm({ ParentStateUpdater }) {
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
          fontWeight="bold"
          textAlign="center"
          color="brand.darkBlue"
          width="6ex" /* have to limit for now as otherwise the html-size prop makes this field very wide */
          p="1"
          py="0"
          height="auto"
        />
        <Text fontSize="xl">Einheiten</Text>
      </Center>
      <PartyStrengthsInput
        values={values}
        errors={errors}
        setFieldValue={setFieldValue}
        MAX_FRACTIONS={MAX_FRACTIONS}
        attributeKey="partyStrengths"
      />
      <MethodsInput
        values={values}
        setFieldValue={setFieldValue}
        attributeKey="method"
      />
      <ParentStateUpdater />
    </Form>
  );
}
