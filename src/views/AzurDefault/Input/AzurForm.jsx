import { Center, Text } from "@chakra-ui/react";
import { Form, useFormikContext } from "formik";
import PropTypes from "prop-types";
import React from "react";
import { FieldInput } from "components/forms/FieldArrayInput";
import DistributionSpecificInputs from "components/forms/DistributionSpecificInputs"

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
          textAlign="center"
          width="6ex"
          height="auto"
        />
        <Text fontSize="xl">Einheiten</Text>
      </Center>
      <DistributionSpecificInputs
        values={values}
        errors={errors}
        setFieldValue={setFieldValue}
        MAX_FRACTIONS={MAX_FRACTIONS}
        attributeKeyBase='' // key base in root in simple case
      />

      <ParentStateUpdater />
    </Form>
  );
}
