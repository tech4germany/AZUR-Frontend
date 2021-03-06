import { Flex, Heading } from "@chakra-ui/react";
import Card from "theme/Card";
import ParentStateUpdater from "components/forms/ParentStateUpdater";
import { Formik, useFormikContext } from "formik";
import React, { useContext } from "react";
import { AzurContext } from "context/AzurContext";
import bundestagMandatsverteilung from "utils/bundestagMandate.json";
import {
  methodSchema,
  numSeatsSchema,
  partyStrengthsSchema,
} from "utils/inputValidationSchemes";
import * as Yup from "yup";
import AzurForm from "./AzurForm";

function AzurInputs({ ...cssprops }) {
  // Initial Values
  const initialValues = {
    numSeats: 60,
    method: "schepers",
    partyStrengths: bundestagMandatsverteilung[0].data,
  };

  const { azurInput, setAzurInput } = useContext(AzurContext);
  const schema = Yup.object().shape({
    numSeats: numSeatsSchema,
    partyStrengths: partyStrengthsSchema,
    method: methodSchema,
  });

  // Validate is manually triggered in useEffect
  return (
    <Card {...cssprops}>
      <Flex>
        <Heading size="2xl">Filter</Heading>
      </Flex>
      <Formik
        initialValues={initialValues}
        validationSchema={schema}
        validateOnChange={false}
        validateOnBlur={false}
      >
        <AzurForm
          ParentStateUpdater={() => {
            const { values, validateForm } = useFormikContext();
            return (
              <ParentStateUpdater
                values={values}
                validateForm={validateForm}
                inputData={azurInput}
                setInputData={setAzurInput}
              />
            );
          }}
        />
      </Formik>
    </Card>
  );
}

export default AzurInputs;
