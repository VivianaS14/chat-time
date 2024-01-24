import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { RootParamList } from "../types/Navigation";
import { Ionicons } from "@expo/vector-icons";
import { UserContext } from "../context/user/UserContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode, JwtPayload } from "jwt-decode";
import { decode } from "base-64";
import { api, apiUrls } from "../utils/apiUrls";
import { User } from "../types/Users";
global.atob = decode;

interface JwtDecodePayload extends JwtPayload {
  userId: string;
}

type Props = NativeStackScreenProps<RootParamList, "Home">;

function HomeScreen({ navigation }: Props) {
  const { userId, setUserId } = useContext(UserContext);

  const [users, setUsers] = useState<User[]>([]);

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
      headerShown: true,
      headerLeft: () => <Text style={style.headerTitle}>Chat Time</Text>,
      headerRight: () => (
        <View style={style.iconsContainer}>
          <Ionicons name="chatbubbles-outline" size={24} color="black" />
          <Ionicons name="people-outline" size={24} color="black" />
        </View>
      ),
    });
  }, []);

  return (
    <View>
      <Text>Home Screen</Text>
    </View>
  );
}

export default HomeScreen;

const style = StyleSheet.create({
  iconsContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
  },

  headerTitle: {
    fontSize: 16,
    fontWeight: "700",
  },
});
