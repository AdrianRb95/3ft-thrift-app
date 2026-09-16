import React from 'react';
import { View, Text, TouchableOpacity, Share, Alert } from 'react-native';
import { Gift, Share2, Users, CheckCircle, Sparkles, Copy } from 'lucide-react-native';
import { useAppStore } from '../store/useAppStore';

export const FreeTrialShareCard: React.FC = () => {
  const { freeTrial, claimFriendInvite } = useAppStore();
  const remainingInvites = freeTrial.maxInvites - freeTrial.claimedInvites;

  const handleShare = async () => {
    try {
      await Share.share({
        message: `🎁 Here is an exclusive 30-Day VIP Pass to 3ft Luxury Editorial Thrift! Use code ${freeTrial.code} to get 0% seller commission and free studio escrow authentication: https://3ft.app/vip/${freeTrial.code}`,
      });
    } catch (error) {
      // Ignored
    }
  };

  const handleSimulateClaim = () => {
    if (remainingInvites <= 0) {
      Alert.alert('All Passes Claimed', 'Both of your VIP trial passes have already been claimed!');
      return;
    }
    const sampleNames = ['Sofia M. (@sofia_vintage)', 'Liam K. (@liam_archive)', 'Chloe T. (@chloe_tokyo)'];
    const chosenName = sampleNames[freeTrial.claimedInvites] || 'Alex R.';
    claimFriendInvite(chosenName);
    Alert.alert(
      'Friend Joined! 🎉',
      `${chosenName} just activated their 30-day VIP pass with your link. You both now have 0% seller fees & free studio authentication!`
    );
  };

  return (
    <View className="bg-white rounded-2xl p-4 border border-[#A78B71]/40 mb-5 shadow-sm">
      {/* Header with VIP badge */}
      <View className="flex-row items-center justify-between mb-2">
        <View className="flex-row items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#A78B71]/15 border border-[#A78B71]/30">
          <Gift size={12} color="#A78B71" />
          <Text className="text-[10px] font-bold uppercase tracking-wider text-[#A78B71]">
            VIP Archive Pass • 30-Day Trial
          </Text>
        </View>

        <View className="px-2 py-0.5 rounded-full bg-[#732D30]/10">
          <Text className="text-[10px] font-bold text-[#732D30]">
            {remainingInvites > 0 ? `${remainingInvites} of 2 Remaining` : 'All Unlocked!'}
          </Text>
        </View>
      </View>

      {/* Headline & Description */}
      <Text
        style={{ fontFamily: 'serif' }}
        className="text-lg font-bold text-[#161514] leading-tight"
      >
        Share Free 30-Day VIP Pass With 2 Friends
      </Text>
      <Text className="text-xs text-[#6A6661] mt-1 leading-relaxed">
        Gift 2 friends full access with 0% seller platform fees and free AI Studio escrow authentication. When they join, your VIP status extends.
      </Text>

      {/* 2-Friend Referral Slots */}
      <View className="my-3 flex-row gap-2">
        {/* Slot 1 */}
        <View
          className={`flex-1 p-2.5 rounded-xl border ${
            freeTrial.friends[0]
              ? 'bg-emerald-50/70 border-emerald-300'
              : 'bg-[#F4EFEA]/60 border-dashed border-[#A78B71]/40'
          }`}
        >
          <View className="flex-row items-center justify-between mb-1">
            <Text className="text-[9px] font-bold uppercase text-[#6A6661]">
              Friend Pass 1
            </Text>
            {freeTrial.friends[0] ? (
              <CheckCircle size={13} color="#059669" />
            ) : (
              <Users size={12} color="#A78B71" />
            )}
          </View>
          <Text
            className={`text-xs font-semibold ${
              freeTrial.friends[0] ? 'text-emerald-900' : 'text-[#9B968F]'
            }`}
            numberOfLines={1}
          >
            {freeTrial.friends[0] ? freeTrial.friends[0].name : 'Unclaimed'}
          </Text>
        </View>

        {/* Slot 2 */}
        <View
          className={`flex-1 p-2.5 rounded-xl border ${
            freeTrial.friends[1]
              ? 'bg-emerald-50/70 border-emerald-300'
              : 'bg-[#F4EFEA]/60 border-dashed border-[#A78B71]/40'
          }`}
        >
          <View className="flex-row items-center justify-between mb-1">
            <Text className="text-[9px] font-bold uppercase text-[#6A6661]">
              Friend Pass 2
            </Text>
            {freeTrial.friends[1] ? (
              <CheckCircle size={13} color="#059669" />
            ) : (
              <Users size={12} color="#A78B71" />
            )}
          </View>
          <Text
            className={`text-xs font-semibold ${
              freeTrial.friends[1] ? 'text-emerald-900' : 'text-[#9B968F]'
            }`}
            numberOfLines={1}
          >
            {freeTrial.friends[1] ? freeTrial.friends[1].name : 'Unclaimed'}
          </Text>
        </View>
      </View>

      {/* Actions */}
      <View className="flex-row gap-2">
        {/* Main Share Button */}
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={handleShare}
          className="flex-1 py-3 px-3 rounded-full bg-[#A78B71] active:bg-[#8F7359] flex-row items-center justify-center gap-1.5 shadow-xs"
        >
          <Share2 size={14} color="#FFFFFF" />
          <Text className="text-xs font-bold text-white tracking-wide">
            Share Invite Link ({remainingInvites} left)
          </Text>
        </TouchableOpacity>

        {/* Test Simulate Claim Button */}
        {remainingInvites > 0 && (
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={handleSimulateClaim}
            className="py-3 px-3 rounded-full bg-[#F4EFEA] border border-[rgba(22,21,20,0.08)] flex-row items-center justify-center"
          >
            <Sparkles size={13} color="#732D30" />
            <Text className="text-[11px] font-semibold text-[#732D30] ml-1">
              Test Join
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};
