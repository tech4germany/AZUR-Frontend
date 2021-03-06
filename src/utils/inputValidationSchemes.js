import * as Yup from "yup";


export const numSeatsSchema = Yup.number()
  .typeError("Dieses Feld darf lediglich Zahlen enthalten")
  .integer("Dieses Feld darf lediglich ganze Zahlen enthalten")
  .required("Dieses Feld muss ausgefüllt sein")
  .min(1, "Die Anzahl der Einheiten muss größer als 1 sein.")
  .max(
    100_000,
    "Berechnungen von mehr als 100 000 Einheiten wird nicht unterstützt"
  );

export const partyStrengthsSchema = Yup.array()
  .of(
    Yup.object().shape({
      name: Yup.string()
        .min(1, "Mindestens ein Buchstabe als Name ist notwendig")
        .required("Dieses Feld muss ausgefüllt sein"),
      strength: Yup.number().integer("Dieses Feld darf lediglich Zahlen enthalten")
        .typeError("Dieses Feld darf lediglich ganze Zahlen enthalten")
        .required("Dieses Feld muss ausgefüllt sein")
        .min(0, "Das Stärkeverhältnis muss größer als 0 sein.")
        .max(1_000_000_000, "Jeder Fraktion dürfen maximal 1 000 000 000 Stimmen zukommen")
    })
  )
  .required("Es wird ein Input für die Fraktionsstärken benötigt")
  .min(1, "Es wird mindestens eine Fraktion benötigt.")
  .test('test_for_duplicates', 'Es werden zwei Fraktionen mit dem selben Namen aufgeführt.', (partyStrengths) => {
    const namesList = partyStrengths.map(({name}) => name)
    return (new Set(namesList).size === namesList.length) // returns true if no duplicates exist
  })

export const methodSchema = Yup.string().required("Dieses Feld wird benötigt.")