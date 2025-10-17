import { FlatList, Pressable, Text, View, Image as RNImage, TouchableOpacity } from "react-native";
import { images, offers } from "@/constants";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "expo-image";
import cn from "clsx";
import CartButton from "@/components/CartButton";

export default function Index() {
  return (
    <SafeAreaView edges={["top", "left", "right"]} className="flex-1 bg-white">

      <FlatList
        data={offers}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerClassName="pb-28 px-5"
        renderItem={({ item, index }) => {
          const isEven = index % 2 === 0;
          
          return (
            <Pressable
              className={cn("offer-card flex-row", isEven ? "flex-row-reverse" : "flex-row")}
              // className="offer-card flex-row"
              style={{ backgroundColor: item.color }}
              android_ripple={{ color: "#fffff22" }}
            >
              <View className="h-full w-1/2">
                <Image
                  source={it