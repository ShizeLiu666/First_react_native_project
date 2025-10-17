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
                  source={item.image}
                  style={{ width: "100%", height: "100%"}}
                  contentFit="contain"
                />
              </View>
              <View className={cn("offer-card__info", isEven ? "pl-10" : "pr-10")}>
                <Text className="h1-bold text-white leading-tight">{item.title}</Text>
                <RNImage 
                  source={images.arrowRight} 
                  style={{ width: 40, height: 40, tintColor: "white" }} 
                  resizeMode="contain"
                />
              </View>
            </Pressable>
          );
        }}
        ListHeaderComponent={() => {
          return (
            <View className="flex-between flex-row w-full my-5">
            <View className="flex-start">
              <Text className="small-bold text-primary">DELIVER TO</Text>
              <TouchableOpacity className="flex-row gap-x-1 mt-0.5 ">
                <Text className="paragraph-bold text-dark-100">Adelaide</Text>
                <RNImage source={images.arrowDown} className="size-3" resizeMode="contain"/>
              </TouchableOpacity>
            </View>
            <CartButton/>
          </View>
          );
        }}
      />
    </SafeAreaView>
  );
}
