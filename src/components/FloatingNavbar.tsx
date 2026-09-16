import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Home, Compass, Camera, MessageSquare, User } from 'lucide-react-native';
import { useAppStore } from '../store/useAppStore';
import { ActiveScreen } from '../types';

export const FloatingNavbar: React.FC = () => {
  const { activeScreen, setActiveScreen, offers } = useAppStore();
  const pendingOffersCount = offers.filter(o => o.status === 'PENDING').length || 1;

  const navItems: { label: string; screen: ActiveScreen; icon: React.ElementType }[] = [
    { label: 'Home', screen: 'FEED', icon: Home },
    { label: 'Explore', screen: 'FEED', icon: Compass },
    { label: 'Sell', screen: 'AI_CAPTURE', icon: Camera },
    { label: 'Inbox', screen: 'INBOX', icon: MessageSquare },
    { label: 'Profile', screen: 'PROFILE', icon: User },
  ];

  return (
    <View className="absolute bottom-6 left-5 right-5 z-50 self-center max-w-md">
      <View className="bg-white/95 border border-[rgba(22,21,20,0.08)] rounded-full px-4 py-2 flex-row items-center justify-around shadow-lg">
        {navItems.map((item, index) => {
          const isSell = item.label === 'Sell';
          const isActive = activeScreen === item.screen && !isSell;
          const Icon = item.icon;

          if (isSell) {
            return (
              <TouchableOpacity
                key={index}
                activeOpacity={0.8}
                onPress={() => setActiveScreen('AI_CAPTURE')}
                className="items-center -top-4"
              >
                <View className="w-12 h-12 rounded-full bg-[#A78B71] active:bg-[#8F7359] items-center justify-center border-2 border-[#FBF9F5] shadow-md">
                  <Camera size={22} color="#FFFFFF" />
                </View>
                <Text className="text-[9px] font-bold uppercase tracking-wider text-[#A78B71] mt-0.5">
                  Sell
                </Text>
              </TouchableOpacity>
            );
          }

          return (
            <TouchableOpacity
              key={index}
              activeOpacity={0.7}
              onPress={() => setActiveScreen(item.screen)}
              className="items-center justify-center relative py-1 px-2"
            >
              <Icon
                size={20}
                color={isActive ? '#732D30' : '#9B968F'}
              />
              {item.label === 'Inbox' && pendingOffersCount > 0 && (
                <View className="absolute top-0 right-2 w-2 h-2 rounded-full bg-[#732D30]" />
              )}
              <Text
                className={`text-[9px] font-semibold uppercase tracking-wider mt-0.5 ${
                  isActive ? 'text-[#732D30]' : 'text-[#9B968F]'
                }`}
              >
                {item.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};
