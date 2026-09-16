import React from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Share,
  Alert,
} from 'react-native';
import {
  ArrowLeft,
  Share2,
  Bookmark,
  CheckCircle,
  Star,
  MapPin,
  ShieldCheck,
} from 'lucide-react-native';
import { useAppStore } from '../store/useAppStore';
import { OfferDrawer } from '../components/OfferDrawer';

export const ItemDetailScreen: React.FC = () => {
  const {
    items,
    selectedItemId,
    setActiveScreen,
    toggleBookmark,
    isOfferDrawerOpen,
    setOfferDrawerOpen,
  } = useAppStore();

  const currentItem =
    items.find((i) => i.id === selectedItemId) || items[0];

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Check out this authentic ${currentItem.title} on 3ft Editorial Thrift!`,
      });
    } catch (error) {
      // Ignored
    }
  };

  const handleBuyNow = () => {
    Alert.alert(
      'Proceed to Checkout',
      `Ready to purchase ${currentItem.title} for $${currentItem.price.toFixed(2)} with 3ft Buyer Escrow Protection?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Confirm & Pay',
          onPress: () => {
            Alert.alert(
              'Order Placed!',
              `Your payment is securely held. ${currentItem.seller.displayName} has been notified to dispatch with tracked shipping.`
            );
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-[#FBF9F5]">
      <StatusBar barStyle="dark-content" backgroundColor="#FBF9F5" />

      {/* Top Floating Action Header */}
      <View className="px-5 py-3 flex-row items-center justify-between border-b border-[rgba(22,21,20,0.06)] bg-[#FBF9F5]/95 z-30">
        {/* Back Button */}
        <TouchableOpacity
          accessibilityLabel="Back to feed"
          onPress={() => setActiveScreen('FEED')}
          activeOpacity={0.7}
          className="w-10 h-10 rounded-full bg-[#F4EFEA] items-center justify-center border border-[rgba(22,21,20,0.08)]"
        >
          <ArrowLeft size={18} color="#161514" />
        </TouchableOpacity>

        {/* Center Watermark */}
        <View className="px-3 py-1 rounded-full bg-[#F4EFEA] border border-[rgba(22,21,20,0.06)]">
          <Text 
            style={{ fontFamily: 'serif' }}
            className="text-base font-bold italic tracking-tight text-[#732D30]"
          >
            3ft
          </Text>
        </View>

        {/* Action Buttons: Share & Bookmark */}
        <View className="flex-row items-center gap-2">
          <TouchableOpacity
            accessibilityLabel="Share item"
            onPress={handleShare}
            activeOpacity={0.7}
            className="w-10 h-10 rounded-full bg-[#F4EFEA] items-center justify-center border border-[rgba(22,21,20,0.08)]"
          >
            <Share2 size={16} color="#161514" />
          </TouchableOpacity>

          <TouchableOpacity
            accessibilityLabel="Bookmark item"
            onPress={() => toggleBookmark(currentItem.id)}
            activeOpacity={0.7}
            className="w-10 h-10 rounded-full bg-[#F4EFEA] items-center justify-center border border-[rgba(22,21,20,0.08)]"
          >
            <Bookmark
              size={16}
              color={currentItem.isBookmarked ? '#732D30' : '#161514'}
              fill={currentItem.isBookmarked ? '#732D30' : 'transparent'}
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Main Scrollable Content */}
      <ScrollView
        className="flex-1 px-5 pt-3"
        contentContainerStyle={{ paddingBottom: 120 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero Product Studio Presentation */}
        <View className="mb-4">
          <View className="self-start mb-2 flex-row items-center gap-1.5 px-3 py-1 rounded-full bg-[#F4EFEA] border border-[#A78B71]/40">
            <Text className="text-[10px] font-semibold text-[#A78B71] tracking-widest uppercase">
              ✨ AI STUDIO ISOLATED
            </Text>
          </View>

          {/* Studio Garment Frame */}
          <View className="relative w-full aspect-[4/5] rounded-2xl items-center justify-center overflow-hidden bg-[#F4EFEA]/40 border border-[rgba(22,21,20,0.08)] p-4">
            <Image
              source={{ uri: currentItem.imageUrl }}
              resizeMode="contain"
              className="w-full h-full"
            />
            {/* Diffused shadow */}
            <View className="absolute bottom-4 w-3/4 h-3 bg-[rgba(22,21,20,0.07)] rounded-full" />

            {/* Slide Indicators */}
            <View className="absolute bottom-3 flex-row items-center gap-1.5">
              <View className="w-5 h-1 rounded-full bg-[#6f5740]" />
              <View className="w-1.5 h-1 rounded-full bg-[#d2c4ba]" />
              <View className="w-1.5 h-1 rounded-full bg-[#d2c4ba]" />
            </View>
          </View>
        </View>

        {/* Item Details */}
        <View className="space-y-3">
          {/* Subheading Micro Tag */}
          <Text className="text-[11px] font-semibold uppercase tracking-wider text-[#9B968F]">
            {currentItem.era ? `${currentItem.era} ARCHIVE` : 'VINTAGE ARCHIVE'} • {currentItem.category.toUpperCase()}
          </Text>

          {/* Title */}
          <Text 
            style={{ fontFamily: 'serif' }}
            className="text-2xl font-bold text-[#161514] leading-tight"
          >
            {currentItem.title}
          </Text>

          {/* Price Hero Row */}
          <View className="flex-row items-baseline gap-3 pt-1">
            <Text 
              style={{ fontFamily: 'serif' }}
              className="text-2xl font-bold text-[#732D30]"
            >
              ${currentItem.price.toFixed(2)}
            </Text>
            {currentItem.originalPrice && (
              <>
                <Text className="text-sm text-[#9B968F] line-through">
                  ${currentItem.originalPrice.toFixed(2)}
                </Text>
                <View className="px-2 py-0.5 rounded-full bg-[#ffdad9]">
                  <Text className="text-[10px] font-bold text-[#7a3235]">
                    -{Math.round(((currentItem.originalPrice - currentItem.price) / currentItem.originalPrice) * 100)}% OFF
                  </Text>
                </View>
              </>
            )}
          </View>

          {/* Spec Chips Row */}
          <View className="flex-row flex-wrap items-center gap-2 pt-1">
            <View className="px-3 py-1 rounded-full bg-[#F4EFEA] border border-[rgba(22,21,20,0.08)]">
              <Text className="text-xs font-semibold text-[#161514]">
                {currentItem.size}
              </Text>
            </View>
            <View className="flex-row items-center gap-1.5 px-3 py-1 rounded-full bg-[#F4EFEA] border border-[rgba(22,21,20,0.08)]">
              <View className="w-1.5 h-1.5 rounded-full bg-[#A78B71]" />
              <Text className="text-xs font-medium text-[#161514]">
                Condition {currentItem.condition}
              </Text>
            </View>
            <View className="flex-row items-center gap-1 px-3 py-1 rounded-full bg-white border border-[#A78B71]/40">
              <CheckCircle size={12} color="#A78B71" />
              <Text className="text-[10px] font-bold text-[#A78B71] uppercase tracking-wider">
                AUTHENTICITY VERIFIED
              </Text>
            </View>
          </View>

          {/* Garment Description */}
          <View className="pt-2">
            <Text className="text-xs font-semibold uppercase tracking-wider text-[#6A6661] mb-1">
              Curator Notes & Details
            </Text>
            <Text className="text-sm text-[#161514] leading-relaxed">
              {currentItem.description}
            </Text>
          </View>

          {/* Measurements if available */}
          {currentItem.measurements && (
            <View className="bg-white rounded-xl p-3.5 border border-[rgba(22,21,20,0.08)]">
              <Text className="text-xs font-semibold uppercase tracking-wider text-[#6A6661] mb-2">
                Flat Measurements
              </Text>
              <View className="flex-row justify-between">
                {currentItem.measurements.chest && (
                  <View>
                    <Text className="text-[10px] text-[#9B968F] uppercase">Chest / Pit</Text>
                    <Text className="text-sm font-semibold text-[#161514]">
                      {currentItem.measurements.chest}
                    </Text>
                  </View>
                )}
                {currentItem.measurements.length && (
                  <View>
                    <Text className="text-[10px] text-[#9B968F] uppercase">Length</Text>
                    <Text className="text-sm font-semibold text-[#161514]">
                      {currentItem.measurements.length}
                    </Text>
                  </View>
                )}
                {currentItem.measurements.shoulders && (
                  <View>
                    <Text className="text-[10px] text-[#9B968F] uppercase">Shoulders</Text>
                    <Text className="text-sm font-semibold text-[#161514]">
                      {currentItem.measurements.shoulders}
                    </Text>
                  </View>
                )}
              </View>
            </View>
          )}

          {/* Seller Profile Snapshot Card */}
          <View className="p-3.5 rounded-xl bg-white border border-[rgba(22,21,20,0.08)] flex-row items-center justify-between shadow-xs mt-2">
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => setActiveScreen('PROFILE')}
              className="flex-row items-center gap-3 flex-1 mr-2"
            >
              <View className="relative">
                <Image
                  source={{ uri: currentItem.seller.avatarUrl }}
                  className="w-11 h-11 rounded-full border border-[#A78B71]/40"
                />
                <View className="absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full bg-white items-center justify-center">
                  <CheckCircle size={12} color="#A78B71" />
                </View>
              </View>
              <View>
                <Text className="text-sm font-semibold text-[#161514]">
                  {currentItem.seller.handle}
                </Text>
                <View className="flex-row items-center gap-1.5 mt-0.5">
                  <View className="flex-row items-center">
                    <Star size={11} color="#A78B71" fill="#A78B71" />
                    <Text className="text-[11px] font-medium text-[#161514] ml-0.5">
                      {currentItem.seller.rating} ({currentItem.seller.salesCount} sales)
                    </Text>
                  </View>
                  <Text className="text-[10px] text-[#9B968F]">•</Text>
                  <View className="flex-row items-center">
                    <MapPin size={10} color="#9B968F" />
                    <Text className="text-[10px] text-[#9B968F] ml-0.5">
                      {currentItem.seller.location}
                    </Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => setActiveScreen('PROFILE')}
              className="px-3 py-1.5 rounded-full border border-[rgba(22,21,20,0.08)] bg-[#FBF9F5]"
            >
              <Text className="text-xs font-semibold text-[#161514]">
                View rack
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* Sticky Bottom Bar */}
      <View className="absolute bottom-0 left-0 right-0 bg-white/95 border-t border-[rgba(22,21,20,0.08)] p-4 flex-row items-center gap-3">
        {/* Make an Offer Button */}
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => setOfferDrawerOpen(true)}
          className="flex-1 py-3.5 rounded-full border border-[#A78B71] bg-white items-center justify-center"
        >
          <Text className="text-sm font-bold text-[#A78B71] tracking-wide">
            Make an Offer
          </Text>
        </TouchableOpacity>

        {/* Buy Now Button */}
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={handleBuyNow}
          className="flex-1 py-3.5 rounded-full bg-[#161514] active:bg-black items-center justify-center shadow-sm"
        >
          <Text className="text-sm font-bold text-white tracking-wide">
            Buy Now (${currentItem.price.toFixed(2)})
          </Text>
        </TouchableOpacity>
      </View>

      {/* Direct Offer Slide-Up Drawer */}
      <OfferDrawer
        visible={isOfferDrawerOpen}
        item={currentItem}
        onClose={() => setOfferDrawerOpen(false)}
      />
    </SafeAreaView>
  );
};
