import React from "react";
import PropTypes from "prop-types";
import useAzur from "views/AzurDefault/hooks/useAzur";

export const AzurContext = React.createContext();

export const AzurContextWrapper = ({ children }) => {
  const [azurInput, setAzurInput] = React.useState({ data: {}, errors: {} });
  const { data, loading, error } = useAzur(azurInput);

  React.useEffect(() => {
    console.log(azurInput);
  }, [azurInput]);

  return (
    <AzurContext.Provider
      value={{
        azurInput,
        setAzurInput,
        azurResponse: { data, loading, error },
      }}
    >
      {children}
    </AzurContext.Provider>
  );
};

AzurContextWrapper.propTypes = { children: PropTypes.object };
