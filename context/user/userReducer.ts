import { UserState } from "./UserProvider";

type userActionType = { type: "Set-UserId"; payload: string };

export const userReducer = (state: UserState, action: userActionType) => {
  switch (action.type) {
    case "Set-UserId":
      return {
        ...state,
        userId: action.payload,
      };

    default:
      return state;
  }
};
