export type User = {
  __v: number;
  _id: string;
  email: string;
  friendRequest: any[];
  friends: any[];
  name: string;
  password: string;
  sentFriendRequest: any[];
};

export type FriendRequest = {
  _id: string;
  email: string;
  name: string;
};
