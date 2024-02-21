import React from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Alert, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useForm } from "react-hook-form";

import CustomInput from "../components/ui/CustomInput";
import CustomButton from "../components/ui/CustomButton";

import { Colors } from "../utils/Colors";
import { validatePassword } from "../utils/fn";
import { api, apiUrls } from "../utils/apiUrls";
import { RootParamList } from "../types/Navigation";
import { FiledValues } from "../types/Login";

type Props = NativeStackScreenProps<RootParamList, "Register">;

function RegisterScreen({ navigation }: Props) {
  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<FiledValues>({ mode: "onChange" });

  const onSignIn = () => {
    navigation.navigate("Login");
  };

  const onSubmit = async (data: FiledValues) => {
    if (data.Email !== data.ConfirmEmail) {
      setError("Email", {
        message: "Your email and confirmation email must match",
      });
      setError("ConfirmEmail", {
        message: "Your email and confirmation email must match",
      });
      return;
    }

    if (data.Password !== data.ConfirmPassword) {
      setError("Password", {
        message: "Your password and confirmation password must match",
      });
      setError("ConfirmPassword", {
        message: "Your password and confirmation password must match",
      });
      return;
    }

    if (!validatePassword(data.Password)) {
      setError("Password", {
        message:
          "Password must contain at least one number, one uppercase and one lowercase letter",
      });
      setError("ConfirmPassword", {
        message:
          "Password must contain at least one number, one uppercase and one lowercase letter",
      });
      return;
    }

    // Send a POST request to backend API to register user
    const user = {
      name: data.Name,
      email: data.Email,
      password: data.Password,
    };

    try {
      await api.post(apiUrls.register, user);
      Alert.alert(
        "Registration successful",
        "You have been registered successfully"
      );
      navigation.navigate("Login");
    } catch (error) {
      Alert.alert("Registration failed", "An error occurred");
      console.log(error);
    }
  };

  return (
    <SafeAreaView style={style.mainContainer}>
      <View style={style.innerContainer}>
        <ScrollView>
          <View style={style.textContainer}>
            <Text
              style={[
                style.text,
                { fontSize: 20, fontWeight: "700", color: Colors.blue600 },
              ]}
            >
              Register
            </Text>
            <Text style={style.text}>Register to your Account</Text>
          </View>
          <View style={style.formContainer}>
            <CustomInput
              label="Name"
              name="Name"
              control={control}
              keyboardType="email-address"
              error={errors.Name?.message}
              requiredMessage="Name is required"
            />
            <CustomInput
              label="Email"
              name="Email"
              control={control}
              keyboardType="email-address"
              error={errors.Email?.message}
              requiredMessage="Email is required"
            />
            <CustomInput
              label="Confirm Email"
              name="ConfirmEmail"
              control={control}
              keyboardType="email-address"
              error={errors.ConfirmEmail?.message}
              requiredMessage="Confirm Email is required"
            />
            <CustomInput
              label="Password"
              name="Password"
              control={control}
              secureTextEntry
              error={errors.Password?.message}
              requiredMessage="Password is required"
            />
            <CustomInput
              label="Confirm Password"
              name="ConfirmPassword"
              control={control}
              secureTextEntry
              error={errors.Password?.message}
              requiredMessage="Confirm Password is required"
            />
          </View>
          <View style={style.actionsContainer}>
            <CustomButton name="Register" onPress={handleSubmit(onSubmit)} />
            <Text style={style.text}>
              Already have an account?{" "}
              <Text onPress={onSignIn} style={{ color: Colors.blue600 }}>
                Sign In
              </Text>
            </Text>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

export default RegisterScreen;

const style = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  innerContainer: {
    width: "80%",
  },

  textContainer: {
    gap: 15,
  },

  text: {
    textAlign: "center",
  },

  formContainer: {
    marginVertical: 40,
    gap: 15,
  },

  actionsContainer: {
    gap: 15,
  },

  pictureContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
});
