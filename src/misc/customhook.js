import { useCallback, useEffect, useState } from 'react';
import { ref, onValue, off } from 'firebase/database';
import { database } from '../misc/firebase';
export function useModalState(defaultValue = false) {
  const [isOpen, setisOpen] = useState(false);
  const open = useCallback(() => setisOpen(true), []);
  const close = useCallback(() => setisOpen(false), []);
  return { isOpen, open, close };
}
// usage
// const is992px = useMediaQuery('(max-width: 992px)')

export const useMediaQuery = query => {
  const [matches, setMatches] = useState(
    () => window.matchMedia(query).matches
  );

  useEffect(() => {
    const queryList = window.matchMedia(query);
    setMatches(queryList.matches);

    const listener = evt => setMatches(evt.matches);

    queryList.addListener(listener);
    return () => queryList.removeListener(listener);
  }, [query]);

  return matches;
};
//ANCHOR - function to check the presence of a particular user
export const usePresence = uid => {
  const [presence, setPresence] = useState(null);

  useEffect(() => {
    const userStatusRef = ref(database, `/status/${uid}`);
    onValue(userStatusRef, function (snap) {
      if (snap.exists()) {
        const data = snap.val();
        setPresence(data);
      }
    });
    return () => {
      off(userStatusRef);
    };
  });
  return presence;
};
