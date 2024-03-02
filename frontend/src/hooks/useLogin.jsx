import { useState } from 'react';

const useLogin = () => {
  const [state, setState] = useState(false);
  const setLogin = () => {
    setState(!state);
  };
  return [state, setLogin];
};

export default useLogin;
