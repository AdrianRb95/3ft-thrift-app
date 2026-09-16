import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { Sparkles, UserPlus, SlidersHorizontal, Search } from 'lucide-react-native';
import { TopAppBar } from '../components/TopAppBar';
import { ThriftFeedCard } from '../components/ThriftFeedCard';
import { FreeTrialShareCard } from '../components/FreeTrialShareCard';
import { useAppStore } from '../store/useAppStore';
import { CategoryFilter } from '../types';

const CATEGORIES: CategoryFilter[] = [
  'All',
  'Jackets',
  'Denim',
  'Knitwear',
  'Vintage',
  'Streetwear',
];

export const ThriftFeedScreen: React.FC = () => {
  const {
    items,
    selectedCategory,
    setSelectedCategory,
    setSelectedItemId,
    setOfferDrawerOpen,
    setActiveScreen,
    searchQuery,
    setSearchQuery,
    signOut,
    resetOnboarding,
  } = useAppStore();

  const filteredItems = items.filter((item) => {
    const matchesCategory =
      selectedCategory === 'All' || item.category === selectedCategory;
    if (!matchesCategory) return false;
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      item.title.toLowerCase().includes(q) ||
      item.brand.toLowerCase().includes(q) ||
      (item.subhead && item.subhead.toLowerCase().includes(q)) ||
      (item.era && item.era.toLowerCase().includes(q)) ||
      item.seller.handle.toLowerCase().includes(q)
    );
  });

  return (
    <SafeAreaView className="flex-1 bg-[#FBF9F5]">
      <StatusBar barStyle="dark-content" backgroundColor="#FBF9F5" />

      {/* Editorial Header with working search */}
      <TopAppBar onMailPress={() => setActiveScreen('INBOX')} />

      {/* Quick Test Bar for Sign Up & Onboarding */}
      <View className="bg-[#F4EFEA]/80 border-b border-[rgba(22,21,20,0.06)] px-5 py-1.5 flex-row items-center justify-between">
        <View className="flex-row items-center gap-1">
          <Sparkles size={11} color="#A78B71" />
          <Text className="text-[10px] font-bold text-[#6A6661] uppercase tracking-wider">
            Quick Test:
          </Text>
        </View>
        <View className="flex-row items-center gap-2">
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => signOut()}
            className="px-2.5 py-0.5 rounded-full bg-white border border-[rgba(22,21,20,0.1)] flex-row items-center gap-1"
          >
            <UserPlus size={10} color="#732D30" />
            <Text className="text-[10px] font-bold text-[#732D30]">Sign Up</Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => resetOnboarding()}
            className="px-2.5 py-0.5 rounded-full bg-white border border-[rgba(22,21,20,0.1)] flex-row items-center gap-1"
          >
            <SlidersHorizontal size={10} color="#A78B71" />
            <Text className="text-[10px] font-bold text-[#A78B71]">Onboarding</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Category Filter Horizontal Pills */}
      <View className="py-2.5 px-5 border-b border-[rgba(22,21,20,0.06)] bg-[#FBF9F5]">
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="flex-row"
        >
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <TouchableOpacity
                key={cat}
                activeOpacity={0.8}
                onPress={() => setSelectedCategory(cat)}
                className={`mr-2 px-4 py-1.5 rounded-full border ${
                  isSelected
                    ? 'bg-[#161514] border-[#161514]'
                    : 'bg-[#F4EFEA] border-[rgba(22,21,20,0.08)]'
                }`}
              >
                <Text
                  className={`text-xs font-semibold ${
                    isSelected ? 'text-white' : 'text-[#6A6661]'
                  }`}
                >
                  {cat}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      {/* Social Thrift Feed ScrollView */}
      <ScrollView
        className="flex-1 px-5 pt-4"
        contentContainerStyle={{ paddingBottom: 110 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Search status indicator */}
        {searchQuery.trim().length > 0 && (
          <View className="flex-row items-center justify-between pb-3">
            <Text className="text-xs text-[#6A6661]">
              Results for "<Text className="font-bold text-[#161514]">{searchQuery}</Text>"
            </Text>
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Text className="text-xs font-semibold text-[#732D30]">Clear</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Free Trial Sharing Card (2 Friends) */}
        {!searchQuery && <FreeTrialShareCard />}

        {filteredItems.length === 0 ? (
          <View className="items-center justify-center py-16">
            <Search size={32} color="#9B968F" />
            <Text className="text-sm font-semibold text-[#161514] mt-2">
              No archive pieces found
            </Text>
            <Text className="text-xs text-[#6A6661] mt-1 text-center">
              Try searching for "Schott", "Levi's", "Cardigan", or clear filters.
            </Text>
            <TouchableOpacity
              onPress={() => {
                setSearchQuery('');
                setSelectedCategory('All');
              }}
              className="mt-4 px-4 py-2 rounded-full bg-[#A78B71]"
            >
              <Text className="text-xs font-semibold text-white">
                Reset All Filters
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          filteredItems.map((item) => (
            <ThriftFeedCard
              key={item.id}
              item={item}
              onPress={() => {
                setSelectedItemId(item.id);
                setActiveScreen('ITEM_DETAIL');
              }}
              onOfferPress={() => {
                setSelectedItemId(item.id);
                setOfferDrawerOpen(true);
                setActiveScreen('ITEM_DETAIL');
              }}
            />
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
};
