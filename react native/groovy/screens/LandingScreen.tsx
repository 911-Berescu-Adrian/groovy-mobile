import { SafeAreaView, StatusBar, Text, View } from "react-native";
import GradientText from "../components/general/GradientText";
import { Colors } from "react-native/Libraries/NewAppScreen";
import CustomText from "../components/general/CustomText";
import CustomTitle from "../components/general/CustomTitle";
import CustomTextLight from "../components/general/CustomTextLight";

export default function LandingScreen() {
  return (
    // test with SafeAreaProvider too
    <SafeAreaView className="flex-1 items-center justify-center bg-background">
      <GradientText className="text-6xl text-metallic mb-1">
        Groovy
      </GradientText>
      <CustomText className="text-2xl  text-slate-300">
        your digital music companion
      </CustomText>
    </SafeAreaView>
  );
}
