import React from "react";
import {
  Pressable,
  PressableProps,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Colors } from "../../utils/Colors";

interface Props extends PressableProps {
  name: string;
}

function CustomButton(props: Props) {
  return (
    <Pressable android_ripple={{ color: Colors.gray }} {...props}>
      <View style={style.buttonContainer}>
        <Text style={style.text}>{props.name}</Text>
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
