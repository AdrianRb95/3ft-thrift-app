import React from 'react';
import { View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { AppNavigator } from './src/navigation/AppNavigator';

export default function App() {
  return (
    <View className="flex-1 bg-[#FBF9F5]">
      <StatusBar style="dark" backgroundColor="#FBF9F5" />
      <AppNavigator />
    </View>
  );
}
