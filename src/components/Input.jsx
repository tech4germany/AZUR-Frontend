import React from "react";
import PropTypes from "prop-types";

import AzurForm from "./AzurForm";
import { Box } from "@chakra-ui/react";

import { useFormikContext, Formik } from "formik";
import bundestagMandatsverteilung from "../constants/bundestagMandate.json";
import * as Yup from "yup";

AzurInputs.propTypes = {
  azurInput: PropTypes.object,
  setAzurInput: PropTypes.func,
};

function AzurInputs({ azurInput, setAzurInput, ...cssprops }) {
  // Initial Values
  const initialValues = {
    numSeats: 22,
    method: "schepers",
    partyStrengths: bundestagMandatsverteilung.data,
  };

  // Validation Scheme
  const azurSchema = Yup.object().shape({
    numSeats: Yup.number()
      .required("Dieses Feld wird benötigt.")
      .min(1, "Die Anzahl der Einheiten muss größer als 1 sein.")
      .max(
        10_000_000,
        "Berechnungen von mehr als 10 000 000 Einheiten sind nicht erlaubt"
      ),
    method: Yup.string().required("Dieses Feld wird benötigt."),
  });

  const ParentPropProvider = () => {
    const { values } = useFormikContext();
    React.useEffect(() => {
      // I dont exactly know why I have to do this check/ Why does dep-array not do that check?
      // TODO WE WANT SOME DEBOUNCING SOLUTION!
      if (
        azurInput.method == values.method &&
        azurInput.num_of_seats == values.numSeats &&
        // TODO MAKE THIS ARRAY EQUALITY CHECK MORE SOLID (if we cant avoid it alltogether)
        JSON.stringify(azurInput.partyStrengths) ==
          JSON.stringify(values.partyStrengths)
      ) {
        return null;
      }
      setAzurInput({
        method: values.method,
        num_of_seats: values.numSeats,
        partyStrengths: values.partyStrengths,
      });
    }, [values]);
    return null;
  };

  return (
    <Box {...cssprops}>
      <Formik initialValues={initialValues} validationSchema={azurSchema}>
        <AzurForm ParentPropProvider={ParentPropProvider} />
      </Formik>
    </Box>
  );
}

export default AzurInputs;
