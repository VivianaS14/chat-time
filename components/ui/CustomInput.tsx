import React from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from "react-native";
import { Colors } from "../../utils/Colors";

interface Props extends TextInputProps {
  name: string;
}

function CustomInput(props: Props) {
  return (
    <View style={style.inputContainer}>
      <Text style={style.text}>{props.name}</Text>
      <TextInput {...props} style={style.input} />
    </View>
  );
}

export default CustomInput;

const style = StyleSheet.create({
  inputContainer: {
    gap: 2,
  },
  input: {
    height: 40,
    padding: 10,
    borderBottomWidth: 1,
  },
  text: {
    color: Colors.gray,
  },
});
