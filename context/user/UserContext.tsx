import { createContext } from "react";

interface ContextProps {
  // State
  userId: string;

  // Methods
  setUserId: (id: string) => void;
}

export const UserContext = createContext({} as ContextProps);
