import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, ScrollView } from 'react-native';
import { Truck, MapPin, CheckCircle, Package, Clock, ChevronRight, ShieldCheck, X } from 'lucide-react-native';
import { useAppStore } from '../store/useAppStore';
import { CostaRicaProvince } from '../types';

interface CorreosDeliveryCardProps {
  originProvince?: CostaRicaProvince;
  shippingFrom?: string;
  trackingNumber?: string;
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

export const CorreosDeliveryCard: React.FC<CorreosDeliveryCardProps> = ({
  originProvince = 'San José',
  shippingFrom = 'San José, Costa Rica',
  trackingNumber = 'CR928471203CR',
}) => {
  const { userProvince, setUserProvince, currency, formatPrice } = useAppStore();
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const isGAM = ['San José', 'Alajuela', 'Heredia', 'Cartago'].includes(userProvince);
  const shippingRateUSD = isGAM ? 4.25 : 5.6;
  const deliveryTime = isGAM ? '24 - 48 horas' : '48 - 72 horas';

  return (
    <View className="bg-white rounded-2xl p-4 border border-[rgba(22,21,20,0.08)] mb-4 shadow-xs">
      {/* Correos Brand Header */}
      <View className="flex-row items-center justify-between mb-2 pb-2 border-b border-[rgba(22,21,20,0.06)]">
        <View className="flex-row items-center gap-2">
          <View className="w-7 h-7 rounded-full bg-[#ffcc00]/20 border border-[#ffcc00]/60 items-center justify-center">
            <Truck size={14} color="#003366" />
          </View>
          <View>
            <Text className="text-xs font-bold text-[#003366] tracking-tight">
              Correos de Costa Rica
            </Text>
            <Text className="text-[9px] font-bold text-[#A78B71] uppercase tracking-wider">
              Pymexpress Certificado
            </Text>
          </View>
        </View>

        <View className="px-2 py-0.5 rounded-full bg-emerald-50 border border-emerald-200">
          <Text className="text-[10px] font-semibold text-emerald-700">
            Envíos a todo CR
          </Text>
        </View>
      </View>

      {/* Origin & Delivery Estimate */}
      <View className="space-y-1.5 my-1">
        <View className="flex-row items-center justify-between">
          <Text className="text-xs text-[#6A6661]">
            Origen:{' '}
            <Text className="font-semibold text-[#161514]">{shippingFrom}</Text>
          </Text>
        </View>

        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => setModalVisible(true)}
          className="flex-row items-center justify-between bg-[#F4EFEA]/70 p-2.5 rounded-xl border border-[rgba(22,21,20,0.06)]"
        >
          <View className="flex-row items-center gap-2">
            <MapPin size={14} color="#732D30" />
            <View>
              <Text className="text-[10px] text-[#9B968F] uppercase font-bold">
                Entregar en:
              </Text>
              <Text className="text-xs font-bold text-[#161514]">
                {userProvince}, Costa Rica {isGAM ? '(GAM)' : '(Rural)'}
              </Text>
            </View>
          </View>
          <View className="flex-row items-center gap-1">
            <Text className="text-xs font-bold text-[#732D30]">
              {formatPrice(shippingRateUSD)}
            </Text>
            <ChevronRight size={14} color="#732D30" />
          </View>
        </TouchableOpacity>
      </View>

      {/* Time & Tracking status */}
      <View className="mt-2.5 pt-2 border-t border-[rgba(22,21,20,0.06)] flex-row items-center justify-between">
        <View className="flex-row items-center gap-1.5">
          <Clock size={12} color="#6A6661" />
          <Text className="text-[11px] text-[#6A6661]">
            Tiempo estimado: <Text className="font-bold text-[#161514]">{deliveryTime}</Text>
          </Text>
        </View>

        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => setModalVisible(true)}
        >
          <Text className="text-[11px] font-semibold text-[#A78B71] underline">
            Rastreo #{trackingNumber.slice(0, 6)}...
          </Text>
        </TouchableOpacity>
      </View>

      {/* Province Picker & Live Tracking Modal */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View className="flex-1 justify-end bg-black/40">
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => setModalVisible(false)}
            className="flex-1"
          />

          <View className="bg-white rounded-t-[28px] p-5 max-h-[80%] shadow-2xl">
            {/* Modal Header */}
            <View className="flex-row items-center justify-between pb-3 border-b border-[rgba(22,21,20,0.08)] mb-3">
              <View>
                <Text className="text-[10px] font-bold uppercase tracking-wider text-[#A78B71]">
                  LOGÍSTICA CORREOS DE COSTA RICA
                </Text>
                <Text
                  style={{ fontFamily: 'serif' }}
                  className="text-lg font-bold text-[#161514]"
                >
                  Seleccionar Provincia de Entrega
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                className="w-8 h-8 rounded-full bg-[#F4EFEA] items-center justify-center"
              >
                <X size={16} color="#6A6661" />
              </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
              {/* Province Selector */}
              <Text className="text-xs font-bold text-[#161514] mb-2 uppercase tracking-wider">
                7 Provincias de Costa Rica:
              </Text>

              <View className="gap-2 mb-4">
                {PROVINCES.map((p) => {
                  const isSelected = userProvince === p;
                  const isSelectedGAM = ['San José', 'Alajuela', 'Heredia', 'Cartago'].includes(p);
                  const rate = isSelectedGAM ? 4.25 : 5.6;

                  return (
                    <TouchableOpacity
                      key={p}
                      activeOpacity={0.8}
                      onPress={() => setUserProvince(p)}
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
                          className={`text-sm font-semibold ${
                            isSelected ? 'text-[#003366]' : 'text-[#161514]'
                          }`}
                        >
                          {p}{' '}
                          <Text className="text-[10px] text-[#9B968F] font-normal">
                            ({isSelectedGAM ? 'GAM' : 'Rural'})
                          </Text>
                        </Text>
                      </View>
                      <Text className="text-xs font-bold text-[#161514]">
                        {formatPrice(rate)}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>

              {/* Simulated Tracking Timeline */}
              <View className="bg-[#F4EFEA]/70 rounded-2xl p-4 border border-[rgba(22,21,20,0.08)] mb-4">
                <View className="flex-row items-center justify-between mb-3">
                  <Text className="text-xs font-bold text-[#161514]">
                    Rastreo Pymexpress: {trackingNumber}
                  </Text>
                  <View className="px-2 py-0.5 rounded-full bg-emerald-100">
                    <Text className="text-[9px] font-bold text-emerald-800">
                      En Tránsito
                    </Text>
                  </View>
                </View>

                {/* Tracking Steps */}
                <View className="space-y-3">
                  <View className="flex-row gap-3">
                    <View className="w-3 h-3 rounded-full bg-emerald-600 mt-1" />
                    <View>
                      <Text className="text-xs font-bold text-[#161514]">
                        En Sucursal Zapote (San José)
                      </Text>
                      <Text className="text-[10px] text-[#6A6661]">
                        Paquete clasificado y listo para despacho hacia {userProvince}
                      </Text>
                    </View>
                  </View>

                  <View className="flex-row gap-3">
                    <View className="w-3 h-3 rounded-full bg-emerald-600 mt-1" />
                    <View>
                      <Text className="text-xs font-bold text-[#161514]">
                        Recibido por Mensajero Pymexpress
                      </Text>
                      <Text className="text-[10px] text-[#6A6661]">
                        Prenda verificada y asegurada en empaque ecológico 3ft
                      </Text>
                    </View>
                  </View>

                  <View className="flex-row gap-3">
                    <View className="w-3 h-3 rounded-full bg-emerald-600 mt-1" />
                    <View>
                      <Text className="text-xs font-bold text-[#161514]">
                        Vendedor despachó la prenda
                      </Text>
                      <Text className="text-[10px] text-[#6A6661]">
                        Depósito en Sucursal Correos Curridabat
                      </Text>
                    </View>
                  </View>
                </View>
              </View>

              {/* Confirm Button */}
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => setModalVisible(false)}
                className="w-full py-3.5 rounded-full bg-[#161514] items-center justify-center mb-2"
              >
                <Text className="text-sm font-bold text-white">
                  Confirmar Entrega en {userProvince}
                </Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
};
