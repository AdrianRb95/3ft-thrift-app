import React from 'react';
import { View, Text, Modal, TouchableOpacity, ScrollView } from 'react-native';
import { X, CheckCircle, Globe, DollarSign, MapPin, Check } from 'lucide-react-native';
import { useAppStore } from '../store/useAppStore';
import { Currency, Language, CostaRicaProvince } from '../types';

interface ProfileSettingsModalProps {
  visible: boolean;
  onClose: () => void;
}

const PROVINCES: CostaRicaProvince[] = [
  'San José',
  'Alajuela',
  'Cartago',
  'Heredia',
  'Guanacaste',
  'Puntarenas',
  'Limón',
];

export const ProfileSettingsModal: React.FC<ProfileSettingsModalProps> = ({
  visible,
  onClose,
}) => {
  const {
    currency,
    setCurrency,
    language,
    setLanguage,
    userProvince,
    setUserProvince,
  } = useAppStore();

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View className="flex-1 justify-end bg-black/40">
        <TouchableOpacity activeOpacity={1} onPress={onClose} className="flex-1" />

        <View className="bg-white rounded-t-[28px] p-5 max-h-[85%] shadow-2xl">
          {/* Header */}
          <View className="flex-row items-center justify-between pb-3 border-b border-[rgba(22,21,20,0.08)] mb-4">
            <View>
              <Text className="text-[10px] font-bold uppercase tracking-wider text-[#A78B71]">
                PREFERENCIAS DE CUENTA
              </Text>
              <Text
                style={{ fontFamily: 'serif' }}
                className="text-xl font-bold text-[#161514]"
              >
                Moneda, Idioma y Entregas
              </Text>
            </View>
            <TouchableOpacity
              onPress={onClose}
              className="w-8 h-8 rounded-full bg-[#F4EFEA] items-center justify-center"
            >
              <X size={16} color="#6A6661" />
            </TouchableOpacity>
          </View>

          <ScrollView showsVerticalScrollIndicator={false}>
            {/* Currency Selector Section */}
            <View className="mb-5">
              <View className="flex-row items-center gap-1.5 mb-2">
                <DollarSign size={14} color="#732D30" />
                <Text className="text-xs font-bold text-[#161514] uppercase tracking-wider">
                  Moneda / Currency
                </Text>
              </View>

              <View className="flex-row gap-2.5">
                {/* Colones (CRC) */}
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => setCurrency('CRC')}
                  className={`flex-1 p-3.5 rounded-2xl border flex-row items-center justify-between ${
                    currency === 'CRC'
                      ? 'bg-[#732D30]/10 border-[#732D30]'
                      : 'bg-[#FBF9F5] border-[rgba(22,21,20,0.08)]'
                  }`}
                >
                  <View>
                    <Text className="text-sm font-bold text-[#161514]">
                      Colones (₡ CRC)
                    </Text>
                    <Text className="text-[10px] text-[#6A6661]">
                      Costa Rica (~₡515 / $1)
                    </Text>
                  </View>
                  {currency === 'CRC' && (
                    <CheckCircle size={18} color="#732D30" />
                  )}
                </TouchableOpacity>

                {/* Dólares (USD) */}
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => setCurrency('USD')}
                  className={`flex-1 p-3.5 rounded-2xl border flex-row items-center justify-between ${
                    currency === 'USD'
                      ? 'bg-[#732D30]/10 border-[#732D30]'
                      : 'bg-[#FBF9F5] border-[rgba(22,21,20,0.08)]'
                  }`}
                >
                  <View>
                    <Text className="text-sm font-bold text-[#161514]">
                      Dólares ($ USD)
                    </Text>
                    <Text className="text-[10px] text-[#6A6661]">
                      Estándar internacional
                    </Text>
                  </View>
                  {currency === 'USD' && (
                    <CheckCircle size={18} color="#732D30" />
                  )}
                </TouchableOpacity>
              </View>
            </View>

            {/* Language Selector Section */}
            <View className="mb-5">
              <View className="flex-row items-center gap-1.5 mb-2">
                <Globe size={14} color="#A78B71" />
                <Text className="text-xs font-bold text-[#161514] uppercase tracking-wider">
                  Idioma / Language
                </Text>
              </View>

              <View className="flex-row gap-2.5">
                {/* Spanish */}
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => setLanguage('es')}
                  className={`flex-1 p-3.5 rounded-2xl border flex-row items-center justify-between ${
                    language === 'es'
                      ? 'bg-[#A78B71]/15 border-[#A78B71]'
                      : 'bg-[#FBF9F5] border-[rgba(22,21,20,0.08)]'
                  }`}
                >
                  <View>
                    <Text className="text-sm font-bold text-[#161514]">
                      Español (CR)
                    </Text>
                    <Text className="text-[10px] text-[#6A6661]">
                      Costa Rica & LATAM
                    </Text>
                  </View>
                  {language === 'es' && (
                    <CheckCircle size={18} color="#A78B71" />
                  )}
                </TouchableOpacity>

                {/* English */}
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => setLanguage('en')}
                  className={`flex-1 p-3.5 rounded-2xl border flex-row items-center justify-between ${
                    language === 'en'
                      ? 'bg-[#A78B71]/15 border-[#A78B71]'
                      : 'bg-[#FBF9F5] border-[rgba(22,21,20,0.08)]'
                  }`}
                >
                  <View>
                    <Text className="text-sm font-bold text-[#161514]">
                      English (US)
                    </Text>
                    <Text className="text-[10px] text-[#6A6661]">
                      International
                    </Text>
                  </View>
                  {language === 'en' && (
                    <CheckCircle size={18} color="#A78B71" />
                  )}
                </TouchableOpacity>
              </View>
            </View>

            {/* Default Delivery Province Section */}
            <View className="mb-6">
              <View className="flex-row items-center gap-1.5 mb-2">
                <MapPin size={14} color="#732D30" />
                <Text className="text-xs font-bold text-[#161514] uppercase tracking-wider">
                  Provincia de Entrega (Correos de Costa Rica)
                </Text>
              </View>

              <View className="gap-2">
                {PROVINCES.map((prov) => {
                  const isSelected = userProvince === prov;
                  const isGAM = ['San José', 'Alajuela', 'Heredia', 'Cartago'].includes(prov);
                  return (
                    <TouchableOpacity
                      key={prov}
                      activeOpacity={0.8}
                      onPress={() => setUserProvince(prov)}
                      className={`p-3 rounded-xl border flex-row items-center justify-between ${
                        isSelected
                          ? 'bg-[#003366]/5 border-[#003366]'
                          : 'bg-[#FBF9F5] border-[rgba(22,21,20,0.08)]'
                      }`}
                    >
                      <View className="flex-row items-center gap-2">
                        {isSelected ? (
                          <CheckCircle size={16} color="#003366" />
                        ) : (
                          <View className="w-4 h-4 rounded-full border border-[rgba(22,21,20,0.2)]" />
                        )}
                        <Text
                          className={`text-sm font-medium ${
                            isSelected ? 'text-[#003366] font-bold' : 'text-[#161514]'
                          }`}
                        >
                          {prov}
                        </Text>
                      </View>
                      <Text className="text-[11px] font-semibold text-[#6A6661]">
                        {isGAM ? 'Tarifa GAM (₡2,200)' : 'Tarifa Rural (₡2,900)'}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>

            {/* Save CTA */}
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={onClose}
              className="w-full py-3.5 rounded-full bg-[#161514] items-center justify-center mb-4"
            >
              <Text className="text-sm font-bold text-white tracking-wide">
                Guardar Preferencias
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};
