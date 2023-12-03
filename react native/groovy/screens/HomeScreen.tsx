import { SafeAreaView } from "react-native-safe-area-context";
import GradientText from "../components/general/GradientText";
import CustomText from "../components/general/CustomText";
import AddAlbumButton from "../components/home/AddAlbumButton";
import React, { useState } from "react";
import AlbumCard from "../components/home/AlbumCard";
import { Album } from "../model/Album";
import { FlatList, View } from "react-native";
import { RootStackParamList } from "../navigation/RootStack";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import AlbumDetailBottomSheet from "../components/home/AlbumDetailBottomSheet";
import { ScrollView } from "react-native-gesture-handler";

type HomeScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, "Home">;
};

export default function HomeScreen({ navigation }: HomeScreenProps) {
  const [albums, setAlbums] = useState<Album[]>([]);
  const sampleAlbums: Album[] = [
    {
      albumId: 1,
      title: "Album 1",
      artist: "Artist 1",
      year: 2020,
      genre: "Hip-Hop",
      noSongs: 10,
    },
    {
      albumId: 2,
      title: "Album 2",
      artist: "Artist 2",
      year: 2021,
      genre: "Pop",
      noSongs: 12,
    },
    {
      albumId: 3,
      title: "Album 2",
      artist: "Artist 2",
      year: 2021,
      genre: "Pop",
      noSongs: 12,
    },
    {
      albumId: 4,
      title: "Album 2",
      artist: "Artist 2",
      year: 2021,
      genre: "Pop",
      noSongs: 12,
    },
    {
      albumId: 5,
      title: "Album 2",
      artist: "Artist 2",
      year: 2021,
      genre: "Pop",
      noSongs: 12,
    },
    {
      albumId: 6,
      title: "Album 2",
      artist: "Artist 2",
      year: 2021,
      genre: "Pop",
      noSongs: 12,
    },
    {
      albumId: 7,
      title: "Album 2",
      artist: "Artist 2",
      year: 2021,
      genre: "Pop",
      noSongs: 12,
    },
    {
      albumId: 8,
      title: "Album 2",
      artist: "Artist 2",
      year: 2021,
      genre: "Pop",
      noSongs: 12,
    },
  ];
  return (
    <SafeAreaView className="flex-1 items-center  bg-background">
      <AlbumDetailBottomSheet />
      <GradientText className="text-4xl text-metallic mt-8">
        Groovy
      </GradientText>
      <View className="mr-36 mb-4 mt-10">
        <AddAlbumButton navigation={navigation} />
      </View>
      {/* <FlatList data={sampleAlbums} renderItem={({album}) => (<AlbumCard key={album.albumId}>{album.title}</AlbumCard>)} /> */}
      <ScrollView>
        <View className="flex flex-row flex-wrap justify-center">
          {sampleAlbums.map((album: Album) => (
            <AlbumCard
              key={album.albumId}
              albumId={album.albumId}
              title={album.title}
            ></AlbumCard>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
