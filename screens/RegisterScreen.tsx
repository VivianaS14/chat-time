import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomInput from "../components/ui/CustomInput";
import CustomButton from "../components/ui/CustomButton";
import { Colors } from "../utils/Colors";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootParamList } from "../types/Navigation";

type Props = NativeStackScreenProps<RootParamList, "Register">;

function RegisterScreen({ navigation }: Props) {
  const onSignIn = () => {
    navigation.navigate("Login");
  };

  return (
    <SafeAreaView style={style.mainContainer}>
      <View style={style.innerContainer}>
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
          <CustomInput name="Name" />
          <CustomInput name="Email" />
          <CustomInput name="Confirm Email" />
          <CustomInput name="Password" />
          <CustomInput name="Confirm Password" />
        </View>
        <View style={style.actionsContainer}>
          <CustomButton name="Register" />
          <Text style={style.text}>
            Already have an account?{" "}
            <Text onPress={onSignIn} style={{ color: Colors.blue600 }}>
              Sign In
            </Text>
          </Text>
        </View>
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
});
