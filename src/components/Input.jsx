import React from "react";
import PropTypes from "prop-types";
import { Button, Row, Col } from "react-bootstrap";

import bundestagMandatsverteilung from "../constants/bundestagMandate.json";
import constants from "../constants/constants.json";

import InputSectionHeader from "./InputSectionHeader";
import FakeInput from "./FakeInput";
import RemoveIcon from "./RemoveIcon";
import { MethodButton } from "./Buttons";

import {
  useFormikContext,
  Formik,
  Field,
  Form,
  ErrorMessage,
  FieldArray,
} from "formik";

AzurInputs.propTypes = {
  azurInput: PropTypes.object,
  setAzurInput: PropTypes.func,
};

function AzurInputs({ azurInput, setAzurInput }) {

  // TODO: Whats the smarter way to pass the state to the parent?
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
          JSON.stringify(values.parlGroups)
      ) {
        return null;
      }
      setAzurInput({
        method: values.method,
        num_of_seats: values.numSeats,
        partyStrengths: values.parlGroups,
      });
    }, [values]);
    return null;
  };


  return (
    <>
      <h2 className="mb-4">Input</h2>
      <Formik
        initialValues={{
          parlGroups: bundestagMandatsverteilung.data,
          numSeats: 25,
          method: "hare",
        }}
      >
        {({ values, setFieldValue }) => (
          <Form>
            <Row className="d-flex justify-content-center">
              <Field
                name="numSeats"
                type="number"
                style={{ fontSize: "3rem", width: "4.5ex" }}
              />
              <p className="text-center mb-0" style={{ fontSize: "1.5rem" }}>
                Einheiten
              </p>
            </Row>

            <Row>
              <InputSectionHeader>Aufteilen nach:</InputSectionHeader>
              <Col md="6" className="mb-2 mb-md-0">
                <Button
                  // TODO Implement more systematic equality check!
                  variant={`${
                    JSON.stringify(values.parlGroups) ==
                    JSON.stringify(bundestagMandatsverteilung.data)
                      ? "success"
                      : "primary"
                  }`}
                  className="w-100 h-100"
                  onClick={() => {
                    console.log(
                      JSON.stringify(values.parlGroups) ==
                        JSON.stringify(bundestagMandatsverteilung.data)
                    );
                    setFieldValue(
                      "parlGroups",
                      bundestagMandatsverteilung.data
                    );
                  }}
                >
                  Aktuelle Bundestagsbesetzung
                </Button>
              </Col>
              <Col md="6">
                <Button
                  className="w-100 h-100"
                  onClick={() => {
                    alert("TODO!");
                  }}
                >
                  Wahlprognose Bundestag
                </Button>
              </Col>
            </Row>
            <Row>
              <InputSectionHeader>Fraktionsstärken</InputSectionHeader>
              <Col>Name</Col>
              <Col>Stimmen</Col>
            </Row>
            <FieldArray name="parlGroups">
              {({ remove, push }) => (
                <div>
                  {values.parlGroups.length > 0 &&
                    values.parlGroups.map((_, index) => (
                      <Row key={index} className="my-1">
                        <Col>
                          <Field
                            className="p-2"
                            name={`parlGroups.${index}.name`}
                            type="text"
                          />
                          <ErrorMessage
                            name={`parlGroups.${index}.name`}
                            component="div"
                            className="field-error"
                          />
                        </Col>
                        <Col>
                          <Field
                            className="p-2"
                            name={`parlGroups.${index}.strength`}
                            type="number"
                          />
                          <ErrorMessage
                            name={`parlGroups.${index}.name`}
                            component="div"
                            className="field-error"
                          />
                        </Col>
                        <Col className="d-flex justify-content-center align-items-center">
                            <RemoveIcon onClick={() => remove(index)} />
                        </Col>
                      </Row>
                    ))}
                  <Row
                    id="addFractionButton"
                    style={{ cursor: "pointer" }}
                    onClick={() => push({ name: "Fraktion XYZ", strength: 0 })}
                  >
                    <Col>
                      <FakeInput />
                    </Col>
                    <Col>
                      <FakeInput />
                    </Col>
                    <Col>{/*TODO Small + symbol goes here*/}</Col>
                  </Row>
                </div>
              )}
            </FieldArray>

            <Row>
              <InputSectionHeader>Mathematische Verfahren</InputSectionHeader>
              {constants.azurMethods.map((method)=> {
                return(
                  <Col key={method.apiName}>
                    <MethodButton
                      apiMethodName={method.apiName}
                      activeMethod={values.method}
                      setFieldValue={setFieldValue}
                    >
                      {method.title}
                    </MethodButton>
                </Col>
                )
              })}
            </Row>

            <ParentPropProvider />
          </Form>
        )}
      </Formik>
    </>
  );
}

export default AzurInputs;
