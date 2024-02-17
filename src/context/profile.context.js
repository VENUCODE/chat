import { createContext, useContext, useEffect, useState } from 'react';
import { auth, database } from '../misc/firebase';
import {
  ref,
  onValue,
  serverTimestamp,
  set,
  onDisconnect,
  off,
  query,
} from 'firebase/database';
export const isOfflineForDatabase = {
  state: 'offline',
  last_changed: serverTimestamp(),
};

export const isOnlineForDatabase = {
  state: 'online',
  last_changed: serverTimestamp(),
};
const ProfileContext = createContext();
//we need a provider

export const ProfileProvider = ({ children }) => {
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    var userStatusRef;
    const unsub = auth.onAuthStateChanged(authObj => {
      if (authObj) {
        const userRef = ref(database, `/profiles/${authObj.uid}`);
        userStatusRef = ref(database, '/status/' + authObj.uid);

        onValue(userRef, snapshot => {
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
        //SECTION - Real time presence cheking
        onValue(ref(database, '.info/connected'), snapshot => {
          if (!!snapshot.val() === false) {
            return;
          }

          onDisconnect(userStatusRef)
            .set(isOfflineForDatabase)
            .then(() => {
              set(userStatusRef, isOnlineForDatabase);
            });
        });

        //!SECTION -end of realtime presence checking
      } else {
        setProfile(null);
        setIsLoading(false);
      }
    });

    return () => {
      if (userStatusRef) {
        off(userStatusRef);
      }
      if (unsub) {
        off(unsub);
      }
      off(query(ref(database, '.info/connected')));
    };
  }, []);
  return (
    <ProfileContext.Provider value={{ isLoading, profile }}>
      {children}
    </ProfileContext.Provider>
  );
};
export const useProfile = () => useContext(ProfileContext);
