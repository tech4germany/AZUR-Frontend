import React from "react";
import _ from "lodash";

export default function useAzurCompare(azurInput) {
  const [data, setData] = React.useState({});
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  //*** FETCHING AZUR OUTPUTS
  const fetchAzurCompare = async (azurInputUpdate) => {
    setLoading(true);
    // Parse Form Input into a form digestable for the API
    const inputForApi = {
      num_of_seats: azurInputUpdate.num_of_seats,
      dist_A: { votes: {}, method: azurInputUpdate?.dist_A?.method },
      dist_B: { votes: {}, method: azurInputUpdate?.dist_B?.method },
    };
    ["dist_A", "dist_B"].forEach((distributionName) => {
      azurInputUpdate?.[distributionName]?.partyStrengths.forEach((entry) => {
        inputForApi[distributionName]["votes"][entry.name] = entry.strength;
      });
    });

    fetch("http://127.0.0.1:5000/azur_compare", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(inputForApi),
    })
      .then(async (resp) => {
        if (resp.ok) return resp.json();
        else {
          // error handling
          let errorMessage = "";
          try {
            const error = await resp.json();
            if (error?.message != null) {
              errorMessage = error.message;
            } else {
              errorMessage =
                "Unexpected error: Error notification was returned from the server but contained no message.";
            }
            errorMessage = error?.message;
          } catch {
            errorMessage =
              "An unexpected error occured and no proper respone from the server was returned.";
          }
          throw new Error(errorMessage);
        }
      })
      .then((azurResponse) => {
        setError(null);
        setData(azurResponse);
      })
      .catch((fetchingError) => {
        console.log(fetchingError);
        setData({});
        setError({ message: fetchingError?.message });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  React.useEffect(() => {
    if (_.isEmpty(azurInput?.errors)) {
      if (_.has(azurInput, "data.dist_A.partyStrengths")) {
        fetchAzurCompare(azurInput.data);
      }
    }
  }, [azurInput]);

  return { data, loading, error };
}
