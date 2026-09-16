import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  Image,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { Search, Sparkles, TrendingUp, CheckCircle, ArrowRight, Flame } from 'lucide-react-native';
import { useAppStore } from '../store/useAppStore';

const TRENDING_TAGS = [
  '🔥 90s Leather',
  'Japanese Selvedge',
  'Detroit Canvas',
  'Mohair Knits',
  'Military Surplus',
  'Quiet Luxury',
];

const CURATOR_SPOTLIGHTS = [
  {
    handle: '@elena_archive',
    name: 'Elena Archive',
    specialty: '80s-90s Leather & Denim',
    avatar:
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80',
    sales: 68,
  },
  {
    handle: '@milo_finds',
    name: 'Milo Vintage',
    specialty: 'Berlin Workwear & Selvedge',
    avatar:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
    sales: 42,
  },
  {
    handle: '@adrian_archive',
    name: 'Adrian Ramirez',
    specialty: 'US Vintage Denim & Biker',
    avatar:
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
    sales: 12,
  },
];

export const ExploreScreen: React.FC = () => {
  const { items, setSelectedItemId, setActiveScreen, setOfferDrawerOpen } = useAppStore();
  const [search, setSearch] = useState<string>('');
  const [selectedTag, setSelectedTag] = useState<string>('🔥 90s Leather');

  const filteredItems = items.filter((item) => {
    if (!search.trim()) return true;
    const q = search.toLowerCase();
    return (
      item.title.toLowerCase().includes(q) ||
      item.brand.toLowerCase().includes(q) ||
      item.category.toLowerCase().includes(q)
    );
  });

  return (
    <SafeAreaView className="flex-1 bg-[#FBF9F5]">
      <StatusBar barStyle="dark-content" backgroundColor="#FBF9F5" />

      {/* Header Bar */}
      <View className="px-5 py-3 border-b border-[rgba(22,21,20,0.06)] bg-[#FBF9F5]/95">
        <View className="flex-row items-center justify-between mb-2.5">
          <View className="flex-row items-center gap-1.5">
            <Text 
              style={{ fontFamily: 'serif' }}
              className="text-2xl font-bold italic tracking-tight text-[#732D30]"
            >
              Explore
            </Text>
            <View className="w-1.5 h-1.5 rounded-full bg-[#A78B71]" />
          </View>
          <View className="px-2.5 py-0.5 rounded-full bg-[#F4EFEA] border border-[rgba(22,21,20,0.08)]">
            <Text className="text-[10px] font-bold uppercase tracking-wider text-[#6A6661]">
              Global Archive
            </Text>
          </View>
        </View>

        {/* Global Search Input */}
        <View className="flex-row items-center bg-[#F4EFEA] border border-[rgba(22,21,20,0.08)] rounded-full px-3.5 py-2">
          <Search size={16} color="#A78B71" style={{ marginRight: 8 }} />
          <TextInput
            value={search}
            onChangeText={setSearch}
            placeholder="Search across all global curators..."
            placeholderTextColor="#9B968F"
            className="flex-1 text-sm text-[#161514] font-medium"
          />
        </View>
      </View>

      <ScrollView
        className="flex-1 px-5 pt-3"
        contentContainerStyle={{ paddingBottom: 110 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Trending Aesthetic Tags */}
        <View className="mb-4">
          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="flex-row">
            {TRENDING_TAGS.map((tag) => (
              <TouchableOpacity
                key={tag}
                activeOpacity={0.8}
                onPress={() => setSelectedTag(tag)}
                className={`mr-2 px-3 py-1.5 rounded-full border ${
                  selectedTag === tag
                    ? 'bg-[#161514] border-[#161514]'
                    : 'bg-white border-[rgba(22,21,20,0.08)]'
                }`}
              >
                <Text
                  className={`text-xs font-semibold ${
                    selectedTag === tag ? 'text-white' : 'text-[#6A6661]'
                  }`}
                >
                  {tag}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Editorial Featured Drop Banner */}
        <View className="rounded-2xl bg-[#161514] p-4 text-white mb-5 shadow-sm overflow-hidden relative">
          <View className="flex-row items-center gap-1.5 mb-1">
            <Flame size={14} color="#A78B71" />
            <Text className="text-[10px] font-bold uppercase tracking-widest text-[#A78B71]">
              CURATOR DROP SPOTLIGHT
            </Text>
          </View>
          <Text 
            style={{ fontFamily: 'serif' }}
            className="text-xl font-bold text-white leading-tight"
          >
            London 1980s Steerhide & Moto Archive
          </Text>
          <Text className="text-xs text-[#d2c4ba] mt-1 mb-3">
            Hand-curated, isolated in 3ft studio, ready for direct buyer offers.
          </Text>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              setSelectedItemId('item_1');
              setActiveScreen('ITEM_DETAIL');
            }}
            className="self-start px-3.5 py-1.5 rounded-full bg-[#A78B71] flex-row items-center gap-1"
          >
            <Text className="text-xs font-bold text-white">Inspect Piece</Text>
            <ArrowRight size={13} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

        {/* Top Verified Curators Carousel */}
        <View className="mb-5">
          <View className="flex-row items-baseline justify-between mb-2.5">
            <Text className="text-xs font-bold uppercase tracking-wider text-[#161514]">
              Featured Curators
            </Text>
            <Text className="text-[10px] text-[#A78B71] font-semibold">
              Verified Profiles
            </Text>
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="flex-row">
            {CURATOR_SPOTLIGHTS.map((curator) => (
              <TouchableOpacity
                key={curator.handle}
                activeOpacity={0.8}
                onPress={() => setActiveScreen('PROFILE')}
                className="mr-3 w-40 bg-white rounded-2xl p-3 border border-[rgba(22,21,20,0.08)] items-center text-center shadow-xs"
              >
                <View className="relative mb-2">
                  <Image
                    source={{ uri: curator.avatar }}
                    className="w-14 h-14 rounded-full border-2 border-[#A78B71]/40"
                  />
                  <View className="absolute bottom-0 right-0 bg-[#732D30] rounded-full w-4 h-4 items-center justify-center">
                    <CheckCircle size={10} color="#FFFFFF" />
                  </View>
                </View>

                <Text className="text-xs font-bold text-[#161514]" numberOfLines={1}>
                  {curator.name}
                </Text>
                <Text className="text-[10px] text-[#9B968F] mb-2">{curator.handle}</Text>

                <View className="w-full py-1 rounded-full bg-[#F4EFEA] items-center">
                  <Text className="text-[10px] font-semibold text-[#6A6661]">
                    {curator.sales} sales
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Discovery 2-Column Grid */}
        <View className="mb-4">
          <Text className="text-xs font-bold uppercase tracking-wider text-[#161514] mb-3">
            All Archive Discoveries ({filteredItems.length})
          </Text>

          <View className="flex-row flex-wrap justify-between">
            {filteredItems.map((item) => (
              <TouchableOpacity
                key={item.id}
                activeOpacity={0.8}
                onPress={() => {
                  setSelectedItemId(item.id);
                  setActiveScreen('ITEM_DETAIL');
                }}
                className="w-[48%] bg-white rounded-2xl overflow-hidden border border-[rgba(22,21,20,0.08)] mb-3 shadow-xs"
              >
                {/* Image Stage */}
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

                {/* Details */}
                <View className="p-2.5">
                  <Text className="text-xs font-semibold text-[#161514]" numberOfLines={1}>
                    {item.title}
                  </Text>
                  <Text className="text-[10px] text-[#9B968F] uppercase mt-0.5">
                    {item.seller.handle}
                  </Text>
                  <View className="flex-row items-baseline justify-between mt-1 pt-1 border-t border-[rgba(22,21,20,0.06)]">
                    <Text 
                      style={{ fontFamily: 'serif' }}
                      className="text-sm font-bold text-[#161514]"
                    >
                      ${item.price.toFixed(2)}
                    </Text>
                    <Text className="text-[10px] font-bold text-[#A78B71]">
                      Offer →
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
