import { View, Text, ScrollView } from 'react-native'

const Home = () => {
  return (
    <ScrollView className="flex-1 bg-white">
      <View className="p-4">
        <Text className="text-2xl font-bold mb-4">Home</Text>
        <Text className="text-gray-600">Welcome to Fast Food App</Text>
      </View>
    </ScrollView>
  )
}

export default Home
