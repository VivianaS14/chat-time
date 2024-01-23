import React from "react";
import {
  Pressable,
  PressableProps,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Colors } from "../../utils/Colors";

interface Props {
  name: string;
}

function CustomButton({ name }: Props) {
  return (
    <Pressable android_ripple={{ color: Colors.gray }}>
      <View style={style.buttonContainer}>
        <Text style={style.text}>{name}</Text>
      </View>
    </Pressable>
  );
}

export default CustomButton;

const style = StyleSheet.create({
  buttonContainer: {
    borderRadius: 4,
    backgroundColor: Colors.blue600,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  text: {
    textAlign: "center",
    color: Colors.white,
    fontWeight: "600",
  },
});
