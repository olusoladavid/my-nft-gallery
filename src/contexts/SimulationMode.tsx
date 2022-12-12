import React, { createContext, useState } from "react";

export const SimulationModeContext = createContext({
  isSimulationMode: false,
  toggleSimulationMode: () => {},
});

export const SimulationModeProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isSimulationMode, setIsSimulationMode] = useState(false);

  return (
    <SimulationModeContext.Provider
      value={{
        isSimulationMode,
        toggleSimulationMode: () =>
          setIsSimulationMode(!isSimulationMode),
      }}
    >
      {children}
    </SimulationModeContext.Provider>
  );
};
