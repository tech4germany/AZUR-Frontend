import React from 'react'
import _ from "lodash";
 
 
export default function useAzur(azurInput){
    const [data, setData] = React.useState({});
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState(null)
   
    const DEBOUNCE_DELAY = 700; // we wait for additional input for 700ms before calling AZUR
   
    //*** FETCHING AZUR OUTPUTS
    const fetchAzur = async (azurInputUpdate) => {
      setLoading(true);
      // Parse Form Input into a form digestable for the API
      const partyStrengthForApi = {};
      azurInputUpdate.partyStrengths.forEach((entry) => {
        partyStrengthForApi[entry.name] = entry.strength;
      });
   
      // useEffect itself should not be async according to linter, so we work with an anonymous function
      fetch("http://127.0.0.1:5000/azur", {
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
      }).then((resp) =>
        resp.json()
      ).catch((fetchingError) => {
        // TODO test error handling after errors are returned in json
        console.log(fetchingError)
        setError(fetchingError)
      }).then((azurResponse) => {
        setError(null)
        setData(azurResponse);
      }).finally(()=>{
        setLoading(false);
      });
    };
   
    const debouncedFetchAzur = React.useCallback(
      _.debounce((azurInputUpdate) => {
        fetchAzur(azurInputUpdate);
      }, DEBOUNCE_DELAY),
      []
    );
   
    React.useEffect(() => {
      if ("partyStrengths" in azurInput) {
        debouncedFetchAzur(azurInput);
      }
    }, [azurInput]);

    return {data, loading, error}
}