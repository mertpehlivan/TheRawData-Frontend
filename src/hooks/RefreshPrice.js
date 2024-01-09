// RefreshPriceContext.js
import React, { createContext, useContext, useState } from 'react';

const RefreshPriceContext = createContext();

export const RefreshPriceProvider = ({ children }) => {
  const [refreshPrice, setRefreshPrice] = useState(0);

  const refreshPriceHandler = () => {
    setRefreshPrice(prev => prev + 1);
  };

  return (
    <RefreshPriceContext.Provider value={{ refreshPrice, refreshPriceHandler }}>
      {children}
    </RefreshPriceContext.Provider>
  );
};

export const useRefreshPrice = () => {
  return useContext(RefreshPriceContext);
};
