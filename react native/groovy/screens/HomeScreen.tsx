import { SafeAreaView } from "react-native-safe-area-context";
import GradientText from "../components/general/GradientText";
import CustomText from "../components/general/CustomText";
import AddAlbumButton from "../components/home/AddAlbumButton";
import React, { useState } from "react";
import AlbumCard from "../components/home/AlbumCard";
import { Album } from "../model/Album";
import { FlatList, View, Text } from "react-native";
import { RootStackParamList } from "../navigation/RootStack";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ScrollView } from "react-native-gesture-handler";
import DbService from "../db/DbService";

type HomeScreenProps = {
    navigation: NativeStackNavigationProp<RootStackParamList, "Home">;
};

export default function HomeScreen({ navigation }: HomeScreenProps) {
    const [albums, setAlbums] = useState<Album[]>([]);
    DbService.getAllAlbums((allAlbums) => setAlbums(allAlbums));

    return (
        <SafeAreaView className="flex-1 items-center  bg-background">
            <GradientText className="text-4xl text-metallic mt-8">Groovy</GradientText>
            <View className="mr-36 mb-4 mt-10">
                <AddAlbumButton navigation={navigation} />
            </View>
            <FlatList
                data={albums}
                renderItem={({ item }) => (
                    <AlbumCard key={item.albumId} albumId={item.albumId} title={item.title} navigation={navigation} />
                )}
                keyExtractor={(item) => item.albumId.toString()}
                numColumns={2}
            />
        </SafeAreaView>
    );
}
