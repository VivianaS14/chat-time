import React from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from "react-native";

import { Colors } from "../../utils/Colors";
import { Control, Controller } from "react-hook-form";
import { FiledValues } from "../../types/Login";

interface Props extends TextInputProps {
  label: string;
  name: keyof FiledValues;
  control: Control<FiledValues>;
  error?: string;
  requiredMessage?: string;
  regex?: RegExp;
}

function CustomInput(props: Props) {
  const { label, control, name, error } = props;

  return (
    <View style={style.inputContainer}>
      <Text style={[style.text, error ? { color: Colors.error } : {}]}>
        {label}
      </Text>
      <Controller
        control={control}
        render={({ field }) => (
          <TextInput
            value={field.value}
            onChangeText={field.onChange}
            style={[
              style.input,
              error ? { borderBottomColor: Colors.error } : {},
            ]}
            {...props}
          />
        )}
        name={name}
        rules={{
          required: props.requiredMessage,
        }}
      />
      {error && <Text style={style.error}>{error}</Text>}
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
  error: {
    color: Colors.error,
    fontSize: 13,
  },
});
