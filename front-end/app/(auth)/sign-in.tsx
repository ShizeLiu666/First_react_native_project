import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import { useState } from 'react'
import { Link, router } from 'expo-router'

const SignIn = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSignIn = () => {
    // TODO: Implement sign in logic
    console.log('Sign in with:', email, password)
    router.replace('/(tabs)')
  }

  return (
    <View className="flex-1 px-6 pt-8">
      <Text className="text-3xl font-bold mb-2">Welcome Back</Text>
      <Text className="text-gray-600 mb-8">Sign in to continue</Text>

      <View className="mb-4">
        <Text className="text-sm font-medium mb-2">Email</Text>
        <TextInput
          className="border border-gray-300 rounded-lg px-4 py-3"
          placeholder="Enter your email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>

      <View className="mb-6">
        <Text className="text-sm font-medium mb-2">Password</Text>
        <TextInput
          className="border border-gray-300 rounded-lg px-4 py-3"
          placeholder="Enter your password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
      </View>

      <TouchableOpacity
        className="bg-primary rounded-lg py-4 mb-4"
        onPress={handleSignIn}
      >
        <Text className="text-white text-center font-semibold text-lg">
          Sign In
        </Text>
      </TouchableOpacity>

      <View className="flex-row justify-center">
        <Text className="text-gray-600">Don't have an account? </Text>
        <Link href="/(auth)/sign-up" asChild>
          <TouchableOpacity>
            <Text className="text-primary font-semibold">Sign Up</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </View>
  )
}

export default SignIn
