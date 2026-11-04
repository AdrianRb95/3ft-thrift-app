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
  User,
  ShoppingBag,
} from 'lucide-react-native';
import { useAppStore } from '../store/useAppStore';

export const SignUpScreen: React.FC = () => {
  const { setAuthenticated, setActiveScreen } = useAppStore();
  const [handle, setHandle] = useState<string>('threeftstudio');
  const [email, setEmail] = useState<string>('curator@vintagearchive.com');
  const [password, setPassword] = useState<string>('VintageArchive2025');
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleCreateAccount = () => {
    setAuthenticated(true);
    setActiveScreen('ONBOARDING');
  };

  const handleQuickLogin = (role: 'seller' | 'buyer') => {
    setAuthenticated(true);
    setActiveScreen('FEED');
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
                CR / USD ($) & CRC (₡)
              </Text>
            </View>

            <TouchableOpacity
              activeOpacity={0.7}
              className="flex-row items-center gap-1"
            >
              <Text className="text-xs text-[#6A6661]">Ayuda</Text>
              <HelpCircle size={14} color="#9B968F" />
            </TouchableOpacity>
          </View>

          {/* Editorial Hero Branding */}
          <View className="mt-4 mb-5">
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
              Compra piezas vintage curadas o vende en segundos con recorte de estudio automático por IA.
            </Text>

            <View className="flex-row items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-[#A78B71]/40 shadow-xs">
              <Sparkles size={13} color="#A78B71" />
              <Text className="text-[10px] font-bold text-[#6A6661] uppercase tracking-wider">
                AI STUDIO ENHANCED • CORREOS DE COSTA RICA
              </Text>
            </View>
          </View>

          {/* Quick 1-Click Demo Profiles */}
          <View className="mb-5 p-3.5 rounded-2xl bg-white border border-[#A78B71]/35 shadow-xs space-y-2.5">
            <Text className="text-[10px] font-bold uppercase tracking-widest text-[#A78B71] text-center">
              Acceso Rápido Demo (1 Clic)
            </Text>
            <View className="flex-row gap-2">
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => handleQuickLogin('seller')}
                className="flex-1 py-3 px-3 rounded-xl bg-[#FBF9F5] border border-[rgba(22,21,20,0.08)] items-center"
              >
                <Text className="text-xs font-bold text-[#161514]">@threeftstudio</Text>
                <Text className="text-[10px] text-[#A78B71] font-medium">Curadora / Vendedora</Text>
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => handleQuickLogin('buyer')}
                className="flex-1 py-3 px-3 rounded-xl bg-[#FBF9F5] border border-[rgba(22,21,20,0.08)] items-center"
              >
                <Text className="text-xs font-bold text-[#161514]">@nico_vintage</Text>
                <Text className="text-[10px] text-[#A78B71] font-medium">Comprador Vintage</Text>
              </TouchableOpacity>
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
                Continuar con Apple
              </Text>
            </TouchableOpacity>

            {/* Google */}
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={handleCreateAccount}
              className="w-full py-3.5 px-4 bg-white active:bg-[#F4EFEA] border border-[rgba(22,21,20,0.08)] rounded-full flex-row items-center justify-center gap-2 shadow-xs"
            >
              <Text className="text-sm font-semibold text-[#161514]">
                Continuar con Google
              </Text>
            </TouchableOpacity>

            {/* Divider */}
            <View className="flex-row items-center my-3">
              <View className="flex-1 h-[1px] bg-[rgba(22,21,20,0.08)]" />
              <Text className="px-3 text-[10px] font-bold uppercase tracking-wider text-[#9B968F]">
                o con correo electrónico
              </Text>
              <View className="flex-1 h-[1px] bg-[rgba(22,21,20,0.08)]" />
            </View>
          </View>

          {/* Registration Form Card */}
          <View className="bg-white rounded-2xl border border-[rgba(22,21,20,0.08)] p-4 shadow-xs space-y-3.5 mb-5">
            {/* Handle Input */}
            <View>
              <Text className="text-[10px] font-bold uppercase tracking-wider text-[#6A6661] mb-1">
                Handle de Archivo
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
                    Disponible
                  </Text>
                </View>
              </View>
            </View>

            {/* Email Input */}
            <View>
              <Text className="text-[10px] font-bold uppercase tracking-wider text-[#6A6661] mb-1">
                Correo Electrónico
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
                  Contraseña
                </Text>
                <Text className="text-[9px] font-medium text-[#9B968F] uppercase">
                  Mín. 8 caracteres
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
              Crear Cuenta de Archivo
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
              ¿Ya tienes cuenta de archivo?{' '}
              <Text className="font-bold text-[#732D30]">Iniciar sesión</Text>
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
