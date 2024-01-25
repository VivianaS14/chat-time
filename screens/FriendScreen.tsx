import React, { useContext, useEffect, useState } from "react";
import {
  FlatList,
  ListRenderItemInfo,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { api, apiUrls } from "../utils/apiUrls";
import { UserContext } from "../context/user/UserContext";
import { FriendRequest } from "../types/Users";
import UserCard from "../components/user/UserCard";

function FriendScreen() {
  const { userId } = useContext(UserContext);

  const [friendRequests, setFriendRequests] = useState<FriendRequest[]>([]);

  useEffect(() => {
    const getFriendRequest = async () => {
      try {
        const { data } = await api.get<FriendRequest[]>(
          apiUrls.getFriendRequests(userId)
        );
        setFriendRequests(data);
      } catch (error) {
        console.log("Error message ", error);
      }
    };

    getFriendRequest();
  }, []);

  return (
    <View>
      <View>
        <Text style={style.title}>
          {friendRequests.length > 0
            ? "Your Friend Request!"
            : "No friends request yet!"}
        </Text>
      </View>

      <View>
        <FlatList
          data={friendRequests}
          renderItem={({ item }: ListRenderItemInfo<FriendRequest>) => (
            <UserCard user={item} mode="Accept friend" />
          )}
          keyExtractor={(item) => item._id}
        />
      </View>
    </View>
  );
}

export default FriendScreen;

const style = StyleSheet.create({
  title: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "800",
    marginVertical: 10,
  },
});
