import { createContext, useState } from 'react';

export const SelectedCellContext = createContext([-1, -1]);


// Create the provider component
export const SelectedCellProvider = ({ children }) => {
    const [selectedCells, setSelectedCells] = useState([]);
  
    return (
      <SelectedCellContext.Provider value={{ selectedCells, setSelectedCells }}>
        {children}
      </SelectedCellContext.Provider>
    );
  };