import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomInput from "../components/ui/CustomInput";
import CustomButton from "../components/ui/CustomButton";
import { Colors } from "../utils/Colors";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootParamList } from "../types/Navigation";
import { useForm } from "react-hook-form";
import { FiledValues } from "../types/Login";
import { validatePassword } from "../utils/fn";

type Props = NativeStackScreenProps<RootParamList, "Login">;

function LoginScreen({ navigation }: Props) {
  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<FiledValues>({ mode: "onChange" });

  const onSignUp = () => {
    navigation.navigate("Register");
  };

  const onSubmit = (data: FiledValues) => {
    if (!validatePassword(data.Password)) {
      setError("Password", {
        message:
          "Password must contain at least one number, one uppercase and one lowercase letter",
      });
      return;
    }

    console.log("----------> Submitted Data: ", { data });
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
            Sign In
          </Text>
          <Text style={style.text}>Sign In to your Account</Text>
        </View>
        <View style={style.formContainer}>
          <CustomInput
            label="Email"
            name="Email"
            control={control}
            keyboardType="email-address"
            error={errors.Email?.message}
            requiredMessage="Email is required"
          />
          <CustomInput
            label="Password"
            name="Password"
            control={control}
            secureTextEntry
            error={errors.Password?.message}
            requiredMessage="Password is required"
          />
        </View>
        <View style={style.actionsContainer}>
          <CustomButton name="Login" onPress={handleSubmit(onSubmit)} />
          <Text style={style.text}>
            Don't have an account?{" "}
            <Text onPress={onSignUp} style={{ color: Colors.blue600 }}>
              Sign Up
            </Text>
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

export default LoginScreen;

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
    gap: 25,
  },

  actionsContainer: {
    gap: 15,
  },
});
