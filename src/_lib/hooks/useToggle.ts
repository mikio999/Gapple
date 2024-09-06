import { useState, useEffect } from 'react';

function useToggle(initialState: boolean = false): [boolean, () => void] {
  const [isToggled, setIsToggled] = useState<boolean>(initialState);

  const toggle = () => {
    setIsToggled(!isToggled);
  };

  useEffect(() => {
    console.log('Toggle state has changed:', isToggled);
  }, [isToggled]);

  return [isToggled, toggle];
}

export default useToggle;
