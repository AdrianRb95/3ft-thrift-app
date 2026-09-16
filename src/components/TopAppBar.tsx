import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Search, Mail } from 'lucide-react-native';
import { useAppStore } from '../store/useAppStore';

interface TopAppBarProps {
  onSearchPress?: () => void;
  onMailPress?: () => void;
}

export const TopAppBar: React.FC<TopAppBarProps> = ({
  onSearchPress,
  onMailPress,
}) => {
  const { setActiveScreen, offers } = useAppStore();
  const pendingOffersCount = offers.filter(o => o.status === 'PENDING').length || 2;

  return (
    <View className="w-full bg-[#FBF9F5]/95 border-b border-[rgba(22,21,20,0.08)] px-5 py-3 flex-row items-center justify-between z-40">
      {/* Leading Icon: Search */}
      <TouchableOpacity
        accessibilityLabel="Search archive"
        onPress={onSearchPress}
        activeOpacity={0.7}
        className="w-10 h-10 rounded-full bg-[#F4EFEA] items-center justify-center border border-[rgba(22,21,20,0.05)]"
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
        className="w-10 h-10 rounded-full bg-[#F4EFEA] items-center justify-center border border-[rgba(22,21,20,0.05)] relative"
      >
        <Mail size={18} color="#6A6661" />
        {pendingOffersCount > 0 && (
          <View className="absolute top-2 right-2 w-2.5 h-2.5 rounded-full bg-[#732D30] border-2 border-[#FBF9F5]" />
        )}
      </TouchableOpacity>
    </View>
  );
};
