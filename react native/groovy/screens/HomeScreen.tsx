import { SafeAreaView } from "react-native-safe-area-context";
import GradientText from "../components/general/GradientText";
import CustomText from "../components/general/CustomText";
import AddAlbumButton from "../components/home/AddAlbumButton";
import React, { useState } from "react";
import AlbumCard from "../components/home/AlbumCard";
import { Album } from "../models/Album";
import { View } from "react-native";

export default function HomeScreen() {
  const [albums, setAlbums] = useState<Album[]>([]);
  const sampleAlbums: Album[] = [
    {
      id: 1,
      title: "Album 1",
      artist: "Artist 1",
      year: 2020,
      genre: "Hip-Hop",
      no_songs: 10,
    },
    {
      id: 2,
      title: "Album 2",
      artist: "Artist 2",
      year: 2021,
      genre: "Pop",
      no_songs: 12,
    },
    {
      id: 3,
      title: "Album 2",
      artist: "Artist 2",
      year: 2021,
      genre: "Pop",
      no_songs: 12,
    },
    {
      id: 4,
      title: "Album 2",
      artist: "Artist 2",
      year: 2021,
      genre: "Pop",
      no_songs: 12,
    },
    {
      id: 5,
      title: "Album 2",
      artist: "Artist 2",
      year: 2021,
      genre: "Pop",
      no_songs: 12,
    },
    {
      id: 6,
      title: "Album 2",
      artist: "Artist 2",
      year: 2021,
      genre: "Pop",
      no_songs: 12,
    },
    {
      id: 7,
      title: "Album 2",
      artist: "Artist 2",
      year: 2021,
      genre: "Pop",
      no_songs: 12,
    },
    {
      id: 8,
      title: "Album 2",
      artist: "Artist 2",
      year: 2021,
      genre: "Pop",
      no_songs: 12,
    },
  ];
  return (
    <SafeAreaView className="flex-1 items-center justify-top bg-background">
      <GradientText className="text-4xl text-metallic mt-8">
        Groovy
      </GradientText>
      <AddAlbumButton />
      {/* <FlatList></FlatList> */}
      <View className="flex flex-row flex-wrap justify-center">
        {sampleAlbums.map((album: Album) => (
          <AlbumCard key={album.id}>{album.title}</AlbumCard>
        ))}
      </View>
    </SafeAreaView>
  );
}
