import { createContext, useContext, useEffect, useState } from 'react';
import { auth, database } from '../misc/firebase';
import { ref, onValue } from 'firebase/database';

const ProfileContext = createContext();
//we need a provider
export const ProfileProvider = ({ children }) => {
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const unsub = auth.onAuthStateChanged(authObj => {
      if (authObj) {
        const starCountRef = ref(database, `/profiles/${authObj.uid}`);

        onValue(starCountRef, snapshot => {
          const { name, createdAt, avatar } = snapshot.val();
          const data = {
            name,
            createdAt,
            avatar,
            uid: authObj.uid,
            email: authObj.email,
          };
          setProfile(data);
          setIsLoading(false);
        });
      } else {
        setProfile(null);
        setIsLoading(false);
      }
    });

    return unsub;
  }, []);
  return (
    <ProfileContext.Provider value={{ isLoading, profile }}>
      {children}
    </ProfileContext.Provider>
  );
};
export const useProfile = () => useContext(ProfileContext);
