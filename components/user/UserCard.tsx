import React, { useContext } from "react";
import { Image, StyleSheet, Text, View, Alert } from "react-native";
import { User } from "../../types/Users";
import { Colors } from "../../utils/Colors";
import CustomButton from "../ui/CustomButton";
import { UserContext } from "../../context/user/UserContext";
import { api, apiUrls } from "../../utils/apiUrls";

interface Props {
  user: User;
}

function UserCard({ user }: Props) {
  const { userId } = useContext(UserContext);

  const sentFriendRequest = async () => {
    try {
      const { status } = await api.post(apiUrls.sendFriendRequest, {
        currentUserId: userId,
        selectedUserId: user._id,
      });
      if (status === 201) {
        Alert.alert(
          "Request sent successfully",
          "Hope you get a response soon!"
        );
      }
    } catch (error) {
      console.log("Error message ", error);
      Alert.alert("Something happened", "Try Later");
    }
  };

  return (
    <View style={style.card}>
      <View style={style.cardContent}>
        <View>
          <Image
            source={{
              uri: "https://i.pinimg.com/564x/43/cc/94/43cc948fbad9cd318f960a4a3b350345.jpg",
            }}
            style={style.image}
          />
        </View>

        <View>
          <Text style={style.name}>{user.name}</Text>
          <Text style={style.email}>{user.email}</Text>
        </View>
      </View>

      <View>
        <CustomButton name="Add Friend" onPress={sentFriendRequest} />
      </View>
    </View>
  );
}

export default UserCard;

const style = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    margin: 10,
    padding: 10,
    backgroundColor: Colors.white,
    borderRadius: 8,
    elevation: 4,
  },

  cardContent: {
    flexDirection: "row",
    gap: 20,
  },

  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    resizeMode: "cover",
  },

  name: {
    fontSize: 16,
    fontWeight: "600",
  },

  email: {
    color: Colors.gray,
  },
});