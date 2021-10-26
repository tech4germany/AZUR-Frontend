import React from "react";
import _ from "lodash";

export default function useAzur(azurInput) {
  const [data, setData] = React.useState({});
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  //*** FETCHING AZUR OUTPUTS
  const fetchAzur = async (azurInputUpdate) => {
    setLoading(true);
    // Parse Form Input into a form digestable for the API
    const partyStrengthForApi = {};
    azurInputUpdate.partyStrengths.forEach((entry) => {
      partyStrengthForApi[entry.name] = entry.strength;
    });

    // useEffect itself should not be async according to linter, so we work with an anonymous function
    fetch("https://azur-api.herokuapp.com/azur", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        votes: partyStrengthForApi,
        method: azurInputUpdate.method,
        num_of_seats: azurInputUpdate.num_of_seats,
        return_table: true,
      }),
    })
      .then(async (resp) => {
        if (resp.ok) return resp.json();
        else {
          // error handling
          const error = await resp.json();
          let errorMessage = error?.message;
          if (errorMessage == null) {
            errorMessage = "An unexpected error occured";
          }
          throw new Error(errorMessage);
        }
      })
      .then((azurResponse) => { // TODO should not set states if requests props are no longer valid/ have been overwritten
        setError(null);
        setData(azurResponse);
      })
      .catch((fetchingError) => {
        setData(null);
        console.log(fetchingError);
        setError(fetchingError);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  React.useEffect(() => {
    if (_.isEmpty(azurInput?.errors)) {
      if ("partyStrengths" in azurInput?.data) {
        fetchAzur(azurInput.data);
      }
    }
  }, [azurInput]);

  return { data, loading, error };
}
