import { useCallback, useEffect, useState, useRef } from 'react';
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
export function useHover() {
  const [isHovered, setIsHovered] = useState(false);
  const elementRef = useRef(null); // Ensure ref is created initially

  const handleMouseOver = () => setIsHovered(true);
  const handleMouseOut = () => setIsHovered(false);

  useEffect(() => {
    const node = elementRef.current; // Access ref safely within effect
    if (node) {
      node.addEventListener('mouseover', handleMouseOver);
      node.addEventListener('mouseout', handleMouseOut);
    }

    return () => {
      if (node) {
        node.removeEventListener('mouseover', handleMouseOver);
        node.removeEventListener('mouseout', handleMouseOut);
      }
    };
  }, [elementRef.current]); // Re-run only if ref changes

  return [elementRef, isHovered];
}
