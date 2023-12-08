import { View, Text, Pressable } from "react-native";
import React from "react";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/RootStack";
import { Album } from "../model/Album";
import { Ionicons } from "@expo/vector-icons";

type DetailScreenProps = {
    navigation: NativeStackNavigationProp<RootStackParamList, "Detail">;
    album: Album;
};

export default function DetailAlbumScreen({ navigation, album }: DetailScreenProps) {
    return (
        <View>
            <Text>{album.title}</Text>
            <Text>{album.artist}</Text>
            <View className="flex flex-row">
                <Text>{album.genre}</Text>
                <Text>•</Text>
                <Text>{album.year}</Text>
            </View>
            <Text>{album.noSongs} songs</Text>
            <Pressable onPress={navigation.navigate("Home")}>
                <Ionicons name="arrow-back-circle" size={24} color="black" />
            </Pressable>
        </View>
    );
}
