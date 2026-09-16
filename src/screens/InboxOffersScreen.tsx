import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Image,
} from 'react-native';
import { ArrowLeft, Clock, ShieldCheck, Check, X, MessageSquare } from 'lucide-react-native';
import { useAppStore } from '../store/useAppStore';

export const InboxOffersScreen: React.FC = () => {
  const { offers, items, setActiveScreen, setSelectedItemId } = useAppStore();

  const mockIncomingOffer = {
    id: 'off_incoming_1',
    itemId: 'item_2',
    buyerHandle: '@charlie_denim',
    amount: 105,
    originalPrice: 120,
    discountPercentage: 12,
    note: 'Can you ship tomorrow to NYC? Love the honey wash!',
    createdAt: '10 mins ago',
    status: 'PENDING' as const,
  };

  return (
    <SafeAreaView className="flex-1 bg-[#FBF9F5]">
      <StatusBar barStyle="dark-content" backgroundColor="#FBF9F5" />

      {/* Header */}
      <View className="px-5 py-3 flex-row items-center justify-between border-b border-[rgba(22,21,20,0.06)] bg-[#FBF9F5]/95">
        <TouchableOpacity
          accessibilityLabel="Back"
          onPress={() => setActiveScreen('FEED')}
          activeOpacity={0.7}
          className="w-9 h-9 rounded-full bg-[#F4EFEA] items-center justify-center border border-[rgba(22,21,20,0.08)]"
        >
          <ArrowLeft size={18} color="#161514" />
        </TouchableOpacity>

        <Text 
          style={{ fontFamily: 'serif' }}
          className="text-lg font-bold text-[#161514]"
        >
          Offers & Negotiations
        </Text>

        <View className="w-9 h-9" />
      </View>

      <ScrollView
        className="flex-1 px-5 pt-4"
        contentContainerStyle={{ paddingBottom: 110 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Incoming Section */}
        <View className="mb-6">
          <Text className="text-xs font-bold uppercase tracking-wider text-[#6A6661] mb-2.5">
            Incoming DM Offers (1)
          </Text>

          {/* Incoming Offer Card */}
          <View className="bg-white rounded-2xl p-4 border border-[rgba(22,21,20,0.08)] shadow-xs">
            <View className="flex-row items-center justify-between mb-2">
              <View className="flex-row items-center gap-2">
                <View className="w-8 h-8 rounded-full bg-[#A78B71]/20 items-center justify-center">
                  <Text className="text-xs font-bold text-[#A78B71]">CD</Text>
                </View>
                <View>
                  <Text className="text-xs font-bold text-[#161514]">
                    {mockIncomingOffer.buyerHandle}
                  </Text>
                  <Text className="text-[10px] text-[#9B968F]">
                    {mockIncomingOffer.createdAt}
                  </Text>
                </View>
              </View>

              <View className="px-2 py-0.5 rounded-full bg-[#ffdad9]">
                <Text className="text-[10px] font-bold text-[#7a3235]">
                  -{mockIncomingOffer.discountPercentage}% OFFER
                </Text>
              </View>
            </View>

            {/* Offer Body */}
            <View className="bg-[#F4EFEA]/60 rounded-xl p-3 border border-[rgba(22,21,20,0.08)] my-2">
              <View className="flex-row items-baseline justify-between mb-1">
                <Text className="text-xs text-[#6A6661]">Offered Amount:</Text>
                <Text 
                  style={{ fontFamily: 'serif' }}
                  className="text-lg font-bold text-[#732D30]"
                >
                  ${mockIncomingOffer.amount}.00
                </Text>
              </View>
              <Text className="text-xs text-[#161514] italic">
                "{mockIncomingOffer.note}"
              </Text>
            </View>

            {/* Actions */}
            <View className="flex-row gap-2 mt-2">
              <TouchableOpacity
                activeOpacity={0.8}
                className="flex-1 py-2.5 rounded-full bg-[#A78B71] active:bg-[#8F7359] items-center justify-center"
              >
                <Text className="text-xs font-bold text-white">Accept Offer</Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.8}
                className="flex-1 py-2.5 rounded-full bg-[#F4EFEA] items-center justify-center border border-[rgba(22,21,20,0.08)]"
              >
                <Text className="text-xs font-semibold text-[#6A6661]">Counter</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Sent Section */}
        <View>
          <Text className="text-xs font-bold uppercase tracking-wider text-[#6A6661] mb-2.5">
            Your Sent Offers ({offers.length})
          </Text>

          {offers.length === 0 ? (
            <View className="bg-white rounded-2xl p-6 border border-[rgba(22,21,20,0.08)] items-center text-center">
              <MessageSquare size={24} color="#9B968F" />
              <Text className="text-xs font-semibold text-[#161514] mt-2">
                No active sent offers
              </Text>
              <Text className="text-[11px] text-[#9B968F] mt-0.5 text-center">
                Browse the feed and tap "Make Offer" to start direct negotiation on any archive piece.
              </Text>
            </View>
          ) : (
            offers.map((offer) => {
              const offerItem = items.find((i) => i.id === offer.itemId);
              return (
                <View
                  key={offer.id}
                  className="bg-white rounded-2xl p-4 border border-[rgba(22,21,20,0.08)] shadow-xs mb-3"
                >
                  <View className="flex-row items-center justify-between mb-2">
                    <Text className="text-xs font-bold text-[#161514]">
                      Offer to {offer.sellerHandle}
                    </Text>
                    <View className="flex-row items-center gap-1 px-2 py-0.5 rounded-full bg-amber-50 border border-amber-200">
                      <Clock size={10} color="#b45309" />
                      <Text className="text-[10px] font-semibold text-amber-800">
                        {offer.status}
                      </Text>
                    </View>
                  </View>

                  <View className="flex-row items-center justify-between bg-[#F4EFEA]/60 rounded-xl p-2.5 border border-[rgba(22,21,20,0.08)]">
                    <View>
                      <Text className="text-xs text-[#6A6661]">
                        {offerItem ? offerItem.title : 'Archive Piece'}
                      </Text>
                      <Text className="text-[10px] text-[#9B968F]">
                        Original: ${offer.originalPrice.toFixed(2)}
                      </Text>
                    </View>
                    <Text 
                      style={{ fontFamily: 'serif' }}
                      className="text-base font-bold text-[#161514]"
                    >
                      ${offer.amount.toFixed(2)}
                    </Text>
                  </View>

                  {offer.note && (
                    <Text className="text-[11px] text-[#6A6661] italic mt-2">
                      "{offer.note}"
                    </Text>
                  )}
                </View>
              );
            })
          )}
        </View>

        {/* Protection Note */}
        <View className="flex-row items-center justify-center gap-1.5 mt-6">
          <ShieldCheck size={14} color="#A78B71" />
          <Text className="text-[10px] text-[#9B968F]">
            All offers on 3ft are backed by buyer protection escrow
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
