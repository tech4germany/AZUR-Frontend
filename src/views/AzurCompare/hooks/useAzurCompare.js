import React from "react";
import _ from "lodash";

export default function useAzur(azurInput) {
  const [data, setData] = React.useState({});
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  //*** FETCHING AZUR OUTPUTS
  const fetchAzurCompare = async (azurInputUpdate) => {
    setLoading(true);

    // Parse Form Input into a form digestable for the API
    const partyStrengthForApi = { distA: {}, distB: {} };
    ["distA", "distB"].forEach((distributionName) => {
      azurInputUpdate?.[distributionName]?.partyStrengths.forEach((entry) => {
        partyStrengthForApi[distributionName][entry.name] = entry.strength;
      });
    });

    setData(partyStrengthForApi);
    setError(null);
    setLoading(false);
    // TODO fetch and handle response once endpoint exists
  };

  React.useEffect(() => {
    if (_.isEmpty(azurInput?.errors)) {
      if (_.has(azurInput, "data.distA.partyStrengths")) {
        // TODO we probably want a check that makes sure that the two input distributions are not the same (an endpoint call would be unncessary in that call)
        fetchAzurCompare(azurInput.data);
      }
    }
  }, [azurInput]);

  return { data, loading, error };
}
