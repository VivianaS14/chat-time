import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import {
  FlatList,
  ListRenderItemInfo,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { RootParamList } from "../types/Navigation";
import { Ionicons } from "@expo/vector-icons";
import { UserContext } from "../context/user/UserContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode, JwtPayload } from "jwt-decode";
import { decode } from "base-64";
import { api, apiUrls } from "../utils/apiUrls";
import { User } from "../types/Users";
import UserCard from "../components/user/UserCard";
global.atob = decode;

interface JwtDecodePayload extends JwtPayload {
  userId: string;
}

type Props = NativeStackScreenProps<RootParamList, "Home">;

function HomeScreen({ navigation }: Props) {
  const { setUserId } = useContext(UserContext);

  const [users, setUsers] = useState<User[]>([]);

  const handleFriends = () => {
    navigation.navigate("Friends");
  };

  const logOut = () => {
    AsyncStorage.setItem("authToken", "");
    navigation.navigate("Login");
  };

  useEffect(() => {
    const fetchUsers = async () => {
      let token;

      try {
        token = await AsyncStorage.getItem("authToken");
      } catch (error) {
        console.log("Token expired", error);
        navigation.navigate("Login");
        return;
      }

      if (token) {
        const decode = jwtDecode<JwtDecodePayload>(token);
        const userId = decode.userId;
        setUserId(userId);

        const { data } = await api.get<User[]>(apiUrls.getUsers(userId));
        setUsers(data);
      }
    };

    fetchUsers();
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "",
      headerLeft: () => <Text style={style.headerTitle}>Chat Time</Text>,
      headerRight: () => (
        <View style={style.iconsContainer}>
          <Ionicons
            name="people-outline"
            size={26}
            color="black"
            onPress={handleFriends}
          />
          <Ionicons name="chatbubbles-outline" size={26} color="black" />
          <Ionicons
            name="log-out-outline"
            size={26}
            color="black"
            onPress={logOut}
          />
        </View>
      ),
    });
  }, []);

  return (
    <View>
      <Text>Home Screen</Text>
      <View>
        <FlatList
          data={users}
          renderItem={({ item }: ListRenderItemInfo<User>) => (
            <UserCard user={item} mode="Add friend" />
          )}
          keyExtractor={(item) => item._id}
        />
      </View>
    </View>
  );
}

export default HomeScreen;

const style = StyleSheet.create({
  iconsContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
  },

  headerTitle: {
    fontSize: 16,
    fontWeight: "700",
  },
});
