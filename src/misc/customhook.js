import { useCallback, useState } from 'react';

function useModalState(defaultValue = false) {
  const [isOpen, setisOpen] = useState(false);
  const open = useCallback(() => setisOpen(true), []);
  const close = useCallback(() => setisOpen(false), []);
  return { isOpen, open, close };
}
export default useModalState;
