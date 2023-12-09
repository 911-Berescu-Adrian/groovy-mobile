import { View, Text } from "react-native";
import React, { useCallback, useMemo, useRef } from "react";
import BottomSheet from "@gorhom/bottom-sheet";

export default function AlbumDetailBottomSheet() {
  const bottomSheetRef = useRef<BottomSheet>(null);

  // variables
  const snapPoints = useMemo(() => ["25%", "50%"], []);

  // callbacks
  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index);
  }, []);
  return (
    <View>
      <Text>AlbumDetailBottomSheet</Text>
      <BottomSheet
        ref={bottomSheetRef}
        index={1}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
      >
        <Text>test</Text>
        <Text>test</Text>
        <Text>test</Text>
      </BottomSheet>
    </View>
  );
}
