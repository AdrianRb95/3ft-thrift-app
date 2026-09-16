import React from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import { Search, Mail, X } from 'lucide-react-native';
import { useAppStore } from '../store/useAppStore';

interface TopAppBarProps {
  onSearchPress?: () => void;
  onMailPress?: () => void;
}

export const TopAppBar: React.FC<TopAppBarProps> = ({
  onSearchPress,
  onMailPress,
}) => {
  const {
    setActiveScreen,
    offers,
    searchQuery,
    setSearchQuery,
    isSearchOpen,
    setIsSearchOpen,
  } = useAppStore();

  const pendingOffersCount = offers.filter((o) => o.status === 'PENDING').length || 2;

  const handleToggleSearch = () => {
    if (onSearchPress) {
      onSearchPress();
    } else {
      setIsSearchOpen(!isSearchOpen);
    }
  };

  return (
    <View className="w-full bg-[#FBF9F5]/95 border-b border-[rgba(22,21,20,0.08)] px-5 py-3 z-40">
      {isSearchOpen ? (
        /* Expandable Search Input Bar */
        <View className="flex-row items-center gap-2">
          <View className="flex-1 flex-row items-center bg-[#F4EFEA] border border-[rgba(22,21,20,0.1)] rounded-full px-3.5 py-1.5">
            <Search size={16} color="#A78B71" style={{ marginRight: 6 }} />
            <TextInput
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholder="Search designer, era, jacket, denim..."
              placeholderTextColor="#9B968F"
              className="flex-1 text-sm text-[#161514] font-medium"
              autoFocus
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity
                onPress={() => setSearchQuery('')}
                className="w-5 h-5 rounded-full bg-[rgba(22,21,20,0.1)] items-center justify-center"
              >
                <X size={12} color="#6A6661" />
              </TouchableOpacity>
            )}
          </View>
          <TouchableOpacity
            onPress={() => {
              setSearchQuery('');
              setIsSearchOpen(false);
            }}
            className="px-2.5 py-1.5"
          >
            <Text className="text-xs font-semibold text-[#732D30]">Cancel</Text>
          </TouchableOpacity>
        </View>
      ) : (
        /* Default Editorial Header Bar */
        <View className="flex-row items-center justify-between">
          {/* Leading Icon: Search (Interactive) */}
          <TouchableOpacity
            accessibilityLabel="Search archive"
            onPress={handleToggleSearch}
            activeOpacity={0.7}
            className="w-10 h-10 rounded-full bg-[#F4EFEA] items-center justify-center border border-[rgba(22,21,20,0.05)] active:scale-95"
          >
            <Search size={18} color="#6A6661" />
          </TouchableOpacity>

          {/* Brand Logo */}
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => setActiveScreen('FEED')}
            className="items-center justify-center"
          >
            <Text
              style={{ fontFamily: 'serif' }}
              className="text-3xl font-bold italic tracking-tight text-[#732D30]"
            >
              3ft
            </Text>
          </TouchableOpacity>

          {/* Trailing Icon: Mail with Unread Badge */}
          <TouchableOpacity
            accessibilityLabel="Direct messages and offers"
            onPress={() => {
              if (onMailPress) onMailPress();
              else setActiveScreen('INBOX');
            }}
            activeOpacity={0.7}
            className="w-10 h-10 rounded-full bg-[#F4EFEA] items-center justify-center border border-[rgba(22,21,20,0.05)] relative active:scale-95"
          >
            <Mail size={18} color="#6A6661" />
            {pendingOffersCount > 0 && (
              <View className="absolute top-2 right-2 w-2.5 h-2.5 rounded-full bg-[#732D30] border-2 border-[#FBF9F5]" />
            )}
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};
