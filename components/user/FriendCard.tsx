import React, { useContext } from "react";
import { Alert, Image, StyleSheet, Text, View } from "react-native";
import { Colors } from "../../utils/Colors";
import CustomButton from "../ui/CustomButton";
import { UserContext } from "../../context/user/UserContext";
import { FriendRequest } from "../../types/Users";
import { api, apiUrls } from "../../utils/apiUrls";

interface Props {
  user: FriendRequest;
}

function FriendCard({ user }: Props) {
  const { userId } = useContext(UserContext);

  const acceptFriendRequest = async () => {
    try {
      const { status } = await api.post(apiUrls.acceptFriendRequest, {
        senderId: user._id,
        recipientId: userId,
      });
      if (status === 201) {
        Alert.alert("Request accepted successfully!");
      }
    } catch (error) {
      console.error("Error message ", error);
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

        <View style={{ justifyContent: "center" }}>
          <Text style={{ fontWeight: "700" }}>
            {user.name} sent you a friend request!
          </Text>
        </View>
      </View>

      <View>
        <CustomButton name="Accept" onPress={acceptFriendRequest} />
      </View>
    </View>
  );
}

export default FriendCard;

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
    gap: 10,
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
