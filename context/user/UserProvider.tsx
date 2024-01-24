import { ReactNode, useReducer, useState } from "react";
import { UserContext } from "./UserContext";
import { userReducer } from "./userReducer";

export interface UserState {
  userId: string;
}

const user_INITIAL_STATE: UserState = {
  userId: "",
};

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(userReducer, user_INITIAL_STATE);

  const setUserId = (userId: string) => {
    dispatch({ type: "Set-UserId", payload: userId });
  };

  return (
    <UserContext.Provider value={{ ...state, setUserId }}>
      {children}
    </UserContext.Provider>
  );
};
