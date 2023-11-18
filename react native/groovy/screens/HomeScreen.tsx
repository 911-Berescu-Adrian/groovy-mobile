import { SafeAreaView } from "react-native-safe-area-context";
import GradientText from "../components/general/GradientText";
import CustomText from "../components/general/CustomText";
import AddAlbumButton from "../components/home/AddAlbumButton";
import React from "react";
import AlbumCard from "../components/home/AlbumCard";

export default function HomeScreen() {
  return (
    <SafeAreaView className="flex-1 items-center justify-top bg-background">
      <GradientText className="text-4xl text-metallic mt-8">
        Groovy
      </GradientText>
      <AddAlbumButton />
      <AlbumCard>Miaunescovici</AlbumCard>
    </SafeAreaView>
  );
}
