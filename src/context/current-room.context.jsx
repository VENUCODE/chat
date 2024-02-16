import React from 'react';
import { useContextSelector ,createContext} from 'use-context-selector';

// Create the context
const CurrentRoomContext = createContext(null);

// Provider component
export const CurrentRoomProvider = ({ children, data }) => {
  return (
    <CurrentRoomContext.Provider value={data}>
      {children}
    </CurrentRoomContext.Provider>
  );
};

// Custom hook to consume the context
export const useCurrentRoom = selector =>
  useContextSelector(CurrentRoomContext, selector);
