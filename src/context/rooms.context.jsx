import { off, onValue, ref } from 'firebase/database';
import { createContext, useContext, useEffect, useState } from 'react';
import { database } from '../misc/firebase';
import { transformToArrayWithId } from '../misc/helper';

const RoomsContext = createContext();
export const RoomsProvider = ({ children }) => {
  const [rooms, setRooms] = useState(null);

  useEffect(() => {
    const roomRef = ref(database, 'rooms');
    onValue(roomRef, snap => {
      const data = transformToArrayWithId(snap.val());
      setRooms(data);
    });
    return () => {
      off(roomRef);
    };
  }, []);
  return (
    <RoomsContext.Provider value={rooms}>{children}</RoomsContext.Provider>
  );
};
export const useRooms = () => useContext(RoomsContext);
