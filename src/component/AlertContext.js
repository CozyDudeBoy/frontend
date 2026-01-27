import { createContext, useState } from 'react';

export const AlertContext = createContext();

export function AlertProvider({ children }) {
  const [bookCount, setBookCount] = useState(0);
  const [noodleCount, setNoodleCount] = useState(0);

  return (
    <AlertContext.Provider value={{
      bookCount,
      setBookCount,noodleCount,setNoodleCount
    }}>
      {children}
    </AlertContext.Provider>
  );
}


