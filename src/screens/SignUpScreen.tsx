import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {
  Globe,
  HelpCircle,
  Sparkles,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  CheckCircle,
} from 'lucide-react-native';
import { useAppStore } from '../store/useAppStore';

export const SignUpScreen: React.FC = () => {
  const { setAuthenticated, setActiveScreen } = useAppStore();
  const [handle, setHandle] = useState<string>('cloeystudio');
  const [email, setEmail] = useState<string>('curator@vintagearchive.com');
  const [password, setPassword] = useState<string>('VintageArchive2025');
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleCreateAccount = () => {
    setAuthenticated(true);
    setActiveScreen('ONBOARDING');
  };

  return (
    <SafeAreaView className="flex-1 bg-[#FBF9F5]">
      <StatusBar barStyle="dark-content" backgroundColor="#FBF9F5" />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        className="flex-1"
      >
        <ScrollView
          className="flex-1 px-6 pt-2"
          contentContainerStyle={{ paddingBottom: 40 }}
          showsVerticalScrollIndicator={false}
        >
          {/* Top Utility Bar */}
          <View className="flex-row justify-between items-center py-2">
            <View className="flex-row items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[rgba(22,21,20,0.08)] shadow-xs">
              <Globe size={13} color="#A78B71" />
              <Text className="text-[10px] font-semibold uppercase tracking-wider text-[#6A6661]">
                US / USD ($)
              </Text>
            </View>

            <TouchableOpacity
              activeOpacity={0.7}
              className="flex-row items-center gap-1"
            >
              <Text className="text-xs text-[#6A6661]">Help</Text>
              <HelpCircle size={14} color="#9B968F" />
            </TouchableOpacity>
          </View>

          {/* Editorial Hero Branding */}
          <View className="mt-4 mb-6">
            <View className="flex-row items-center justify-between mb-2">
              <Text 
                style={{ fontFamily: 'serif' }}
                className="text-4xl font-bold italic tracking-tight text-[#732D30]"
              >
                3ft
              </Text>
              <View className="px-2.5 py-0.5 rounded-full bg-[#F4EFEA] border border-[rgba(22,21,20,0.08)]">
                <Text className="text-[9px] font-bold uppercase tracking-widest text-[#9B968F]">
                  STUDIO ED.
                </Text>
              </View>
            </View>

            <Text 
              style={{ fontFamily: 'serif' }}
              className="text-2xl font-bold text-[#161514] leading-tight mb-2"
            >
              Curated Thrift Meets AI Studio Craft
            </Text>

            <Text className="text-xs text-[#6A6661] leading-relaxed mb-3">
              Buy iconic vintage archives or sell in seconds with on-device AI studio cutouts.
            </Text>

            <View className="flex-row items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-[#A78B71]/40 shadow-xs">
              <Sparkles size={13} color="#A78B71" />
              <Text className="text-[10px] font-bold text-[#6A6661] uppercase tracking-wider">
                AI STUDIO ENHANCED • VERIFIED BUYER PROTECTION
              </Text>
            </View>
          </View>

          {/* Social Auth Buttons */}
          <View className="space-y-2.5 mb-5">
            {/* Apple */}
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={handleCreateAccount}
              className="w-full py-3.5 px-4 bg-[#161514] active:bg-black rounded-full flex-row items-center justify-center gap-2 shadow-xs"
            >
              <Text className="text-sm font-semibold text-white">
                Continue with Apple
              </Text>
            </TouchableOpacity>

            {/* Google */}
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={handleCreateAccount}
              className="w-full py-3.5 px-4 bg-white active:bg-[#F4EFEA] border border-[rgba(22,21,20,0.08)] rounded-full flex-row items-center justify-center gap-2 shadow-xs"
            >
              <Text className="text-sm font-semibold text-[#161514]">
                Continue with Google
              </Text>
            </TouchableOpacity>

            {/* Divider */}
            <View className="flex-row items-center my-3">
              <View className="flex-1 h-[1px] bg-[rgba(22,21,20,0.08)]" />
              <Text className="px-3 text-[10px] font-bold uppercase tracking-wider text-[#9B968F]">
                or with email
              </Text>
              <View className="flex-1 h-[1px] bg-[rgba(22,21,20,0.08)]" />
            </View>
          </View>

          {/* Registration Form Card */}
          <View className="bg-white rounded-2xl border border-[rgba(22,21,20,0.08)] p-4 shadow-xs space-y-3.5 mb-5">
            {/* Handle Input */}
            <View>
              <Text className="text-[10px] font-bold uppercase tracking-wider text-[#6A6661] mb-1">
                Archive Handle
              </Text>
              <View className="relative flex-row items-center bg-[#FBF9F5] border border-[rgba(22,21,20,0.08)] rounded-xl px-3 py-2.5">
                <Text className="text-sm font-medium text-[#9B968F] mr-1">@</Text>
                <TextInput
                  value={handle}
                  onChangeText={setHandle}
                  className="flex-1 text-sm font-medium text-[#161514]"
                  autoCapitalize="none"
                />
                <View className="flex-row items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 border border-emerald-200">
                  <View className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                  <Text className="text-[10px] font-semibold text-emerald-700">
                    Available
                  </Text>
                </View>
              </View>
            </View>

            {/* Email Input */}
            <View>
              <Text className="text-[10px] font-bold uppercase tracking-wider text-[#6A6661] mb-1">
                Email Address
              </Text>
              <View className="flex-row items-center bg-[#FBF9F5] border border-[rgba(22,21,20,0.08)] rounded-xl px-3 py-2.5">
                <Mail size={16} color="#9B968F" style={{ marginRight: 8 }} />
                <TextInput
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  className="flex-1 text-sm font-medium text-[#161514]"
                  autoCapitalize="none"
                />
              </View>
            </View>

            {/* Password Input */}
            <View>
              <View className="flex-row justify-between items-center mb-1">
                <Text className="text-[10px] font-bold uppercase tracking-wider text-[#6A6661]">
                  Password
                </Text>
                <Text className="text-[9px] font-medium text-[#9B968F] uppercase">
                  Min. 8 chars
                </Text>
              </View>
              <View className="flex-row items-center bg-[#FBF9F5] border border-[rgba(22,21,20,0.08)] rounded-xl px-3 py-2.5">
                <Lock size={16} color="#9B968F" style={{ marginRight: 8 }} />
                <TextInput
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                  className="flex-1 text-sm font-medium text-[#161514]"
                />
                <TouchableOpacity
                  onPress={() => setShowPassword(!showPassword)}
                  activeOpacity={0.7}
                >
                  {showPassword ? (
                    <EyeOff size={16} color="#9B968F" />
                  ) : (
                    <Eye size={16} color="#9B968F" />
                  )}
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* Submit Button */}
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={handleCreateAccount}
            className="w-full py-4 rounded-full bg-[#A78B71] active:bg-[#8F7359] flex-row items-center justify-center gap-2 shadow-md mb-4"
          >
            <Text className="text-base font-bold text-white tracking-wide">
              Create Archive Account
            </Text>
            <ArrowRight size={18} color="#FFFFFF" />
          </TouchableOpacity>

          {/* Sign In Link */}
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => {
              setAuthenticated(true);
              setActiveScreen('FEED');
            }}
            className="items-center py-2"
          >
            <Text className="text-xs text-[#6A6661]">
              Already have an archive account?{' '}
              <Text className="font-bold text-[#732D30]">Sign in</Text>
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
