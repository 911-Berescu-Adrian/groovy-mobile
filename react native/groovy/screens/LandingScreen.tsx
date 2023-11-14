import { SafeAreaView, Text, View } from "react-native";
import GradientText from "../components/general/GradientText";

export default function LandingScreen() {
  return (
    <SafeAreaView className="flex-1 items-center justify-center bg-background">
      <GradientText className="text-7xl font-extrabold">Groovy</GradientText>
      <Text className="text-2xl text-slate-300 font-semibold">
        your digital music companion
      </Text>
    </SafeAreaView>
  );
}
