import { createContext, useContext, useState } from 'react';

const ProfileContext = createContext();
//we need a provider
export const ProfileProvider = ({ children }) => {
  const [profile] = useState(true);
  return (
    <ProfileContext.Provider value={profile}>
      {children}
    </ProfileContext.Provider>
  );
};
export const useProfile = () => useContext(ProfileContext);
