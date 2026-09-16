import React, { useState } from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  TextInput,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from 'react-native';
import { X, ArrowRight, CheckCircle, ShieldCheck, Edit3 } from 'lucide-react-native';
import { GarmentItem } from '../types';
import { useAppStore } from '../store/useAppStore';

interface OfferDrawerProps {
  visible: boolean;
  item: GarmentItem;
  onClose: () => void;
}

export const OfferDrawer: React.FC<OfferDrawerProps> = ({
  visible,
  item,
  onClose,
}) => {
  const { submitOffer } = useAppStore();
  const [discountPercent, setDiscountPercent] = useState<number>(15);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [isCustom, setIsCustom] = useState<boolean>(false);
  const [note, setNote] = useState<string>(
    `Hi ${item.seller.displayName.split(' ')[0]}, love the archive piece! Ready to complete payment right away.`
  );

  const calculatedAmount = isCustom
    ? parseFloat(customAmount) || item.price
    : Math.round(item.price * (1 - discountPercent / 100));

  const handleSendOffer = () => {
    if (isNaN(calculatedAmount) || calculatedAmount <= 0) {
      Alert.alert('Invalid Offer', 'Please enter a valid offer amount.');
      return;
    }

    submitOffer({
      itemId: item.id,
      buyerHandle: '@adrian_archive',
      sellerHandle: item.seller.handle,
      amount: calculatedAmount,
      originalPrice: item.price,
      discountPercentage: isCustom
        ? Math.round(((item.price - calculatedAmount) / item.price) * 100)
        : discountPercent,
      note,
    });

    Alert.alert(
      'Offer Submitted',
      `Your offer of $${calculatedAmount.toFixed(2)} was sent to ${item.seller.handle}. You will be notified as soon as they respond!`,
      [{ text: 'Great', onPress: onClose }]
    );
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      {/* Dimmed Backdrop */}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        className="flex-1 justify-end bg-black/40"
      >
        <TouchableOpacity
          activeOpacity={1}
          onPress={onClose}
          className="flex-1"
        />

        {/* Modal Container */}
        <View className="bg-white rounded-t-[28px] border-t border-black/10 shadow-2xl max-h-[85%] pb-8">
          {/* Drawer Handle */}
          <View className="items-center pt-3 pb-2">
            <View className="w-10 h-1 rounded-full bg-[#A78B71]/40" />
          </View>

          {/* Drawer Header */}
          <View className="flex-row items-center justify-between px-5 py-2 border-b border-[rgba(22,21,20,0.08)]">
            <View>
              <Text className="text-[10px] font-semibold uppercase text-[#732D30] tracking-wider">
                DIRECT NEGOTIATION
              </Text>
              <Text 
                style={{ fontFamily: 'serif' }}
                className="text-lg font-semibold text-[#161514]"
              >
                Make an Offer to {item.seller.handle}
              </Text>
            </View>
            <TouchableOpacity
              onPress={onClose}
              activeOpacity={0.7}
              className="w-8 h-8 rounded-full bg-[#F4EFEA] items-center justify-center"
            >
              <X size={16} color="#6A6661" />
            </TouchableOpacity>
          </View>

          <ScrollView className="px-5 pt-3" showsVerticalScrollIndicator={false}>
            {/* Miniature Item Recap */}
            <View className="flex-row items-center justify-between p-3 rounded-xl bg-[#F4EFEA]/60 border border-[rgba(22,21,20,0.08)] mb-4">
              <View className="flex-row items-center gap-3">
                <View className="w-12 h-12 rounded-lg bg-white border border-[rgba(22,21,20,0.08)] items-center justify-center p-1 overflow-hidden">
                  <Image
                    source={{ uri: item.imageUrl }}
                    resizeMode="contain"
                    className="w-full h-full"
                  />
                </View>
                <View>
                  <Text className="text-sm font-medium text-[#161514] max-w-[180px]" numberOfLines={1}>
                    {item.title}
                  </Text>
                  <Text className="text-[11px] text-[#9B968F]">
                    Listed at{' '}
                    <Text className="font-bold text-[#161514]">
                      ${item.price.toFixed(2)}
                    </Text>
                  </Text>
                </View>
              </View>
              <View className="flex-row items-center gap-1 px-2 py-1 rounded bg-white border border-[rgba(22,21,20,0.08)]">
                <View className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                <Text className="text-[10px] font-medium text-[#6A6661]">
                  Replies in &lt;15m
                </Text>
              </View>
            </View>

            {/* Quick-Offer Calculation Chips */}
            <View className="mb-4">
              <View className="flex-row items-center justify-between mb-2">
                <Text className="text-[10px] font-semibold uppercase tracking-wider text-[#6A6661]">
                  SELECT OFFER AMOUNT
                </Text>
                {!isCustom && (
                  <Text className="text-[10px] font-bold uppercase tracking-wider text-[#732D30]">
                    {discountPercent}% SAVING SELECTED
                  </Text>
                )}
              </View>

              <View className="flex-row gap-2">
                {/* 15% Option */}
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => {
                    setIsCustom(false);
                    setDiscountPercent(15);
                  }}
                  className={`flex-1 py-3 px-2 rounded-xl items-center relative border ${
                    !isCustom && discountPercent === 15
                      ? 'bg-[#A78B71] border-[#A78B71]'
                      : 'bg-white border-[rgba(22,21,20,0.08)]'
                  }`}
                >
                  <View className="absolute -top-2 px-1.5 py-0.5 bg-[#732D30] rounded-full">
                    <Text className="text-[8px] font-bold uppercase tracking-wider text-white">
                      Best chance
                    </Text>
                  </View>
                  <Text
                    className={`text-[10px] font-semibold uppercase ${
                      !isCustom && discountPercent === 15 ? 'text-white/90' : 'text-[#9B968F]'
                    }`}
                  >
                    -15%
                  </Text>
                  <Text
                    style={{ fontFamily: 'serif' }}
                    className={`text-base font-bold tracking-tight ${
                      !isCustom && discountPercent === 15 ? 'text-white' : 'text-[#161514]'
                    }`}
                  >
                    ${Math.round(item.price * 0.85)}.00
                  </Text>
                </TouchableOpacity>

                {/* 10% Option */}
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => {
                    setIsCustom(false);
                    setDiscountPercent(10);
                  }}
                  className={`flex-1 py-3 px-2 rounded-xl items-center relative border ${
                    !isCustom && discountPercent === 10
                      ? 'bg-[#A78B71] border-[#A78B71]'
                      : 'bg-white border-[rgba(22,21,20,0.08)]'
                  }`}
                >
                  <Text
                    className={`text-[10px] font-semibold uppercase ${
                      !isCustom && discountPercent === 10 ? 'text-white/90' : 'text-[#9B968F]'
                    }`}
                  >
                    -10%
                  </Text>
                  <Text
                    style={{ fontFamily: 'serif' }}
                    className={`text-base font-bold tracking-tight ${
                      !isCustom && discountPercent === 10 ? 'text-white' : 'text-[#161514]'
                    }`}
                  >
                    ${Math.round(item.price * 0.9)}.00
                  </Text>
                </TouchableOpacity>

                {/* Custom Option */}
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => {
                    setIsCustom(true);
                  }}
                  className={`flex-1 py-3 px-2 rounded-xl items-center border ${
                    isCustom
                      ? 'bg-[#A78B71] border-[#A78B71]'
                      : 'bg-white border-dashed border-[#80756c]/40'
                  }`}
                >
                  <Edit3
                    size={14}
                    color={isCustom ? '#FFFFFF' : '#A78B71'}
                  />
                  <Text
                    className={`text-xs font-semibold mt-0.5 ${
                      isCustom ? 'text-white' : 'text-[#161514]'
                    }`}
                  >
                    Custom
                  </Text>
                  <Text
                    className={`text-[9px] ${
                      isCustom ? 'text-white/80' : 'text-[#9B968F]'
                    }`}
                  >
                    Type price
                  </Text>
                </TouchableOpacity>
              </View>

              {/* Custom Amount Input field */}
              {isCustom && (
                <View className="mt-3 flex-row items-center bg-[#FBF9F5] border border-[#A78B71] rounded-xl px-3 py-2">
                  <Text className="text-base font-bold text-[#161514] mr-2">$</Text>
                  <TextInput
                    placeholder={`e.g. ${Math.round(item.price * 0.8)}`}
                    keyboardType="numeric"
                    value={customAmount}
                    onChangeText={setCustomAmount}
                    className="flex-1 text-base font-semibold text-[#161514]"
                    autoFocus
                  />
                  <Text className="text-xs text-[#9B968F] uppercase">USD</Text>
                </View>
              )}
            </View>

            {/* Note to Seller */}
            <View className="mb-4">
              <Text className="text-[10px] font-semibold uppercase tracking-wider text-[#6A6661] mb-1.5">
                PRIVATE NOTE TO SELLER
              </Text>
              <TextInput
                value={note}
                onChangeText={setNote}
                multiline
                numberOfLines={2}
                placeholder="Add a note with your offer (e.g. Can you ship today?)..."
                placeholderTextColor="#9B968F"
                className="p-3 rounded-xl bg-[#F4EFEA]/60 border border-[rgba(22,21,20,0.08)] text-sm text-[#161514] leading-relaxed"
              />

              {/* Suggestion tags */}
              <View className="flex-row flex-wrap gap-1.5 mt-2">
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() =>
                    setNote((prev) => `${prev} ⚡ Ready to pay immediately.`)
                  }
                  className="px-2.5 py-1 rounded-full bg-[#FBF9F5] border border-[rgba(22,21,20,0.08)]"
                >
                  <Text className="text-[11px] text-[#6A6661]">
                    ⚡ Ready to pay immediately
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() =>
                    setNote((prev) => `${prev} 📦 Can you ship tracked?`)
                  }
                  className="px-2.5 py-1 rounded-full bg-[#FBF9F5] border border-[rgba(22,21,20,0.08)]"
                >
                  <Text className="text-[11px] text-[#6A6661]">
                    📦 Can you ship tracked?
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Drawer Action Button */}
            <View className="mt-2 mb-4">
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={handleSendOffer}
                className="w-full py-4 rounded-full bg-[#A78B71] active:bg-[#8F7359] flex-row items-center justify-center gap-2 shadow-md"
              >
                <Text className="text-base font-semibold text-white tracking-wide">
                  Send Offer (${calculatedAmount.toFixed(2)})
                </Text>
                <ArrowRight size={18} color="#FFFFFF" />
              </TouchableOpacity>

              {/* Trust Badge */}
              <View className="flex-row items-center justify-center gap-1.5 mt-3">
                <ShieldCheck size={14} color="#A78B71" />
                <Text className="text-[10px] text-[#9B968F] text-center">
                  3ft Buyer Protection • Funds held in escrow until verified
                </Text>
              </View>
            </View>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};
