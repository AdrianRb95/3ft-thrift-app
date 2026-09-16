import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Share,
} from 'react-native';
import {
  ArrowLeft,
  Settings,
  Share2,
  CheckCircle,
  Star,
  MapPin,
  Sparkles,
  MessageSquare,
  UserPlus,
  LogOut,
  Sliders,
} from 'lucide-react-native';
import { FreeTrialShareCard } from '../components/FreeTrialShareCard';
import { ProfileSettingsModal } from '../components/ProfileSettingsModal';
import { useAppStore, ELENA_PROFILE } from '../store/useAppStore';

type ProfileTab = 'active' | 'sold' | 'reviews';

export const WardrobeProfileScreen: React.FC = () => {
  const {
    items,
    setSelectedItemId,
    setActiveScreen,
    signOut,
    resetOnboarding,
    currency,
    language,
    formatPrice,
    userProvince,
  } = useAppStore();
  const [activeTab, setActiveTab] = useState<ProfileTab>('active');
  const [isFollowing, setIsFollowing] = useState<boolean>(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);

  const profile = ELENA_PROFILE;

  // Items for this curator
  const curatorItems = items.filter(
    (i) => i.seller.id === profile.id || i.seller.handle === profile.handle
  );

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Explore @elena_archive's curated vintage rack on 3ft Editorial Thrift!`,
      });
    } catch (e) {
      // Ignored
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-[#FBF9F5]">
      <StatusBar barStyle="dark-content" backgroundColor="#FBF9F5" />

      {/* Top Navigation Anchor */}
      <View className="px-5 py-3 flex-row items-center justify-between border-b border-[rgba(22,21,20,0.06)] bg-[#FBF9F5]/95">
        <TouchableOpacity
          accessibilityLabel="Back"
          onPress={() => setActiveScreen('FEED')}
          activeOpacity={0.7}
          className="w-9 h-9 rounded-full bg-[#F4EFEA] items-center justify-center border border-[rgba(22,21,20,0.08)]"
        >
          <ArrowLeft size={18} color="#161514" />
        </TouchableOpacity>

        <View className="flex-row items-center gap-1.5">
          <Text 
            style={{ fontFamily: 'serif' }}
            className="text-lg font-bold text-[#161514]"
          >
            Archive Rack
          </Text>
          <View className="w-1.5 h-1.5 rounded-full bg-[#A78B71]" />
        </View>

        <View className="flex-row items-center gap-2">
          <TouchableOpacity
            accessibilityLabel="Settings"
            onPress={() => setIsSettingsOpen(true)}
            activeOpacity={0.7}
            className="w-9 h-9 rounded-full bg-[#F4EFEA] items-center justify-center border border-[rgba(22,21,20,0.08)]"
          >
            <Settings size={17} color="#161514" />
          </TouchableOpacity>

          <TouchableOpacity
            accessibilityLabel="Share"
            onPress={handleShare}
            activeOpacity={0.7}
            className="w-9 h-9 rounded-full bg-[#F4EFEA] items-center justify-center border border-[rgba(22,21,20,0.08)]"
          >
            <Share2 size={17} color="#161514" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        className="flex-1 px-5 pt-4"
        contentContainerStyle={{ paddingBottom: 120 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Curator Profile Header */}
        <View className="items-center text-center mb-5">
          {/* Editorial Avatar */}
          <View className="relative">
            <View className="w-24 h-24 rounded-full p-1 border-2 border-[#A78B71]/60">
              <Image
                source={{ uri: profile.avatarUrl }}
                className="w-full h-full rounded-full"
              />
            </View>
            <View className="absolute bottom-0 right-1 bg-[#732D30] rounded-full w-6 h-6 items-center justify-center border-2 border-white shadow-xs">
              <CheckCircle size={14} color="#FFFFFF" />
            </View>
          </View>

          {/* Identity & Handle */}
          <Text 
            style={{ fontFamily: 'serif' }}
            className="text-2xl font-bold text-[#161514] mt-3"
          >
            {profile.displayName}
          </Text>

          <View className="flex-row items-center gap-1.5 mt-0.5">
            <Text className="text-xs font-semibold text-[#6A6661]">
              {profile.handle}
            </Text>
            <Text className="text-xs text-[#9B968F]">•</Text>
            <View className="flex-row items-center">
              <MapPin size={11} color="#A78B71" />
              <Text className="text-xs text-[#6A6661] ml-0.5">{profile.location}</Text>
            </View>
          </View>

          {/* Editorial Bio */}
          <Text className="text-xs text-[#6A6661] text-center mt-2.5 max-w-xs leading-relaxed">
            {profile.bio}
          </Text>

          {/* Trust Badges */}
          <View className="flex-row flex-wrap justify-center gap-2 mt-3">
            <View className="flex-row items-center gap-1 px-2.5 py-1 rounded-full bg-[#F4EFEA] border border-[rgba(22,21,20,0.08)]">
              <Star size={11} color="#732D30" fill="#732D30" />
              <Text className="text-[10px] font-bold uppercase tracking-wider text-[#732D30]">
                Top Rated Curator
              </Text>
            </View>
            <View className="flex-row items-center gap-1 px-2.5 py-1 rounded-full bg-[#F4EFEA] border border-[rgba(22,21,20,0.08)]">
              <Sparkles size={11} color="#A78B71" />
              <Text className="text-[10px] font-bold uppercase tracking-wider text-[#A78B71]">
                AI Studio Verified
              </Text>
            </View>
          </View>

          {/* Currency, Language & Delivery Location Quick Pill */}
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => setIsSettingsOpen(true)}
            className="flex-row items-center gap-2 mt-3 px-3.5 py-1.5 rounded-full bg-white border border-[#A78B71]/40 shadow-xs"
          >
            <Text className="text-xs font-bold text-[#732D30]">
              {currency === 'CRC' ? '₡ CRC (Colones)' : '$ USD (Dólares)'}
            </Text>
            <Text className="text-xs text-[#9B968F]">•</Text>
            <Text className="text-xs font-semibold text-[#161514]">
              {language === 'es' ? 'Español' : 'English'}
            </Text>
            <Text className="text-xs text-[#9B968F]">•</Text>
            <Text className="text-xs text-[#A78B71] font-medium">
              📍 {userProvince} (CR)
            </Text>
          </TouchableOpacity>

          {/* Seller Metrics Panel */}
          <View className="w-full mt-4 bg-white border border-[rgba(22,21,20,0.08)] rounded-2xl py-3 px-2 flex-row items-center justify-around shadow-xs">
            <View className="items-center flex-1">
              <Text 
                style={{ fontFamily: 'serif' }}
                className="text-lg font-bold text-[#161514]"
              >
                {profile.salesCount}
              </Text>
              <Text className="text-[9px] font-bold uppercase tracking-wider text-[#9B968F] mt-0.5">
                Sales
              </Text>
            </View>

            <View className="w-[1px] h-6 bg-[rgba(22,21,20,0.08)]" />

            <View className="items-center flex-1">
              <View className="flex-row items-center">
                <Text 
                  style={{ fontFamily: 'serif' }}
                  className="text-lg font-bold text-[#161514]"
                >
                  {profile.rating}
                </Text>
                <Star size={12} color="#A78B71" fill="#A78B71" style={{ marginLeft: 2 }} />
              </View>
              <Text className="text-[9px] font-bold uppercase tracking-wider text-[#9B968F] mt-0.5">
                Rating
              </Text>
            </View>

            <View className="w-[1px] h-6 bg-[rgba(22,21,20,0.08)]" />

            <View className="items-center flex-1">
              <Text 
                style={{ fontFamily: 'serif' }}
                className="text-lg font-bold text-[#161514]"
              >
                {profile.shipSpeed}
              </Text>
              <Text className="text-[9px] font-bold uppercase tracking-wider text-[#9B968F] mt-0.5">
                Dispatch
              </Text>
            </View>

            <View className="w-[1px] h-6 bg-[rgba(22,21,20,0.08)]" />

            <View className="items-center flex-1">
              <Text 
                style={{ fontFamily: 'serif' }}
                className="text-lg font-bold text-[#161514]"
              >
                {(profile.followersCount / 1000).toFixed(1)}k
              </Text>
              <Text className="text-[9px] font-bold uppercase tracking-wider text-[#9B968F] mt-0.5">
                Followers
              </Text>
            </View>
          </View>

          {/* Action Cluster */}
          <View className="flex-row gap-2.5 w-full mt-3.5">
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => setActiveScreen('INBOX')}
              className="flex-1 py-2.5 rounded-full bg-[#161514] active:bg-black flex-row items-center justify-center gap-1.5 shadow-xs"
            >
              <MessageSquare size={14} color="#FFFFFF" />
              <Text className="text-xs font-semibold text-white">
                Message Curator
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => setIsFollowing(!isFollowing)}
              className={`flex-1 py-2.5 rounded-full border items-center justify-center flex-row gap-1.5 ${
                isFollowing
                  ? 'bg-[#F4EFEA] border-[rgba(22,21,20,0.1)]'
                  : 'bg-white border-[#A78B71]'
              }`}
            >
              <UserPlus size={14} color={isFollowing ? '#6A6661' : '#A78B71'} />
              <Text
                className={`text-xs font-semibold ${
                  isFollowing ? 'text-[#6A6661]' : 'text-[#A78B71]'
                }`}
              >
                {isFollowing ? 'Following' : 'Follow (+)'}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Quick Flow Switches for Testing Onboarding & Auth */}
          <View className="flex-row gap-2 w-full mt-2.5">
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => resetOnboarding()}
              className="flex-1 py-2 rounded-xl bg-[#F4EFEA] border border-[rgba(22,21,20,0.08)] flex-row items-center justify-center gap-1.5"
            >
              <Sliders size={13} color="#6A6661" />
              <Text className="text-[11px] font-semibold text-[#6A6661]">
                Style Onboarding
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => signOut()}
              className="flex-1 py-2 rounded-xl bg-[#F4EFEA] border border-[rgba(22,21,20,0.08)] flex-row items-center justify-center gap-1.5"
            >
              <LogOut size={13} color="#732D30" />
              <Text className="text-[11px] font-semibold text-[#732D30]">
                Sign Out / Sign Up
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* 30-Day VIP Pass Sharing */}
        <FreeTrialShareCard />

        {/* Wardrobe Rack Tabs */}
        <View className="flex-row border-b border-[rgba(22,21,20,0.08)] mb-4">
          <TouchableOpacity
            onPress={() => setActiveTab('active')}
            className={`pb-2 mr-6 border-b-2 ${
              activeTab === 'active'
                ? 'border-[#732D30]'
                : 'border-transparent'
            }`}
          >
            <Text
              className={`text-xs font-bold uppercase tracking-wider ${
                activeTab === 'active' ? 'text-[#732D30]' : 'text-[#9B968F]'
              }`}
            >
              Active Rack ({curatorItems.length})
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setActiveTab('sold')}
            className={`pb-2 mr-6 border-b-2 ${
              activeTab === 'sold'
                ? 'border-[#732D30]'
                : 'border-transparent'
            }`}
          >
            <Text
              className={`text-xs font-bold uppercase tracking-wider ${
                activeTab === 'sold' ? 'text-[#732D30]' : 'text-[#9B968F]'
              }`}
            >
              Sold Archive (60)
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setActiveTab('reviews')}
            className={`pb-2 border-b-2 ${
              activeTab === 'reviews'
                ? 'border-[#732D30]'
                : 'border-transparent'
            }`}
          >
            <Text
              className={`text-xs font-bold uppercase tracking-wider ${
                activeTab === 'reviews' ? 'text-[#732D30]' : 'text-[#9B968F]'
              }`}
            >
              Reviews (54)
            </Text>
          </TouchableOpacity>
        </View>

        {/* 2-Column Garment Grid */}
        <View className="flex-row flex-wrap justify-between">
          {curatorItems.map((item) => (
            <TouchableOpacity
              key={item.id}
              activeOpacity={0.8}
              onPress={() => {
                setSelectedItemId(item.id);
                setActiveScreen('ITEM_DETAIL');
              }}
              className="w-[48%] bg-white rounded-xl overflow-hidden border border-[rgba(22,21,20,0.08)] mb-3 shadow-xs"
            >
              {/* Image Box */}
              <View className="aspect-[4/5] bg-[#F4EFEA]/40 items-center justify-center p-2 relative">
                <Image
                  source={{ uri: item.imageUrl }}
                  resizeMode="contain"
                  className="w-full h-full"
                />
                <View className="absolute top-2 left-2 px-1.5 py-0.5 rounded bg-white/90 border border-[rgba(22,21,20,0.08)]">
                  <Text className="text-[9px] font-bold text-[#6A6661] uppercase">
                    {item.size}
                  </Text>
                </View>
              </View>

              {/* Info */}
              <View className="p-2.5">
                <Text
                  className="text-xs font-semibold text-[#161514] leading-tight"
                  numberOfLines={1}
                >
                  {item.title}
                </Text>
                <View className="flex-row items-baseline justify-between mt-1">
                  <Text 
                    style={{ fontFamily: 'serif' }}
                    className="text-sm font-bold text-[#161514]"
                  >
                    {formatPrice(item.price)}
                  </Text>
                  <Text className="text-[10px] text-[#A78B71] font-semibold">
                    Offer →
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Profile Settings Modal (Currency, Language, Costa Rica Province) */}
      <ProfileSettingsModal
        visible={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
      />
    </SafeAreaView>
  );
};
