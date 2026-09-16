import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { TopAppBar } from '../components/TopAppBar';
import { ThriftFeedCard } from '../components/ThriftFeedCard';
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
  } = useAppStore();

  const filteredItems =
    selectedCategory === 'All'
      ? items
      : items.filter((item) => item.category === selectedCategory);

  return (
    <SafeAreaView className="flex-1 bg-[#FBF9F5]">
      <StatusBar barStyle="dark-content" backgroundColor="#FBF9F5" />
      
      {/* Editorial Header */}
      <TopAppBar
        onSearchPress={() => {}}
        onMailPress={() => setActiveScreen('INBOX')}
      />

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
        {filteredItems.length === 0 ? (
          <View className="items-center justify-center py-16">
            <Text className="text-sm font-medium text-[#6A6661]">
              No archive pieces found in {selectedCategory}.
            </Text>
            <TouchableOpacity
              onPress={() => setSelectedCategory('All')}
              className="mt-3 px-4 py-1.5 rounded-full bg-[#A78B71]"
            >
              <Text className="text-xs font-semibold text-white">
                View All Pieces
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
