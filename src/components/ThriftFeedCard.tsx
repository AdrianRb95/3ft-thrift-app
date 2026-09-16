import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Bookmark, Heart, MessageCircle, CheckCircle } from 'lucide-react-native';
import { GarmentItem } from '../types';
import { useAppStore } from '../store/useAppStore';

interface ThriftFeedCardProps {
  item: GarmentItem;
  onPress: () => void;
  onOfferPress: () => void;
}

export const ThriftFeedCard: React.FC<ThriftFeedCardProps> = ({
  item,
  onPress,
  onOfferPress,
}) => {
  const { toggleLike, toggleBookmark, setSelectedItemId, setActiveScreen, formatPrice } = useAppStore();

  return (
    <View className="bg-white rounded-2xl overflow-hidden border border-[rgba(22,21,20,0.08)] mb-5 shadow-sm">
      {/* Studio Header & Garment Stage */}
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={onPress}
        className="relative bg-[#F4EFEA]/50 aspect-[3/4] items-center justify-center p-4 overflow-hidden"
      >
        {/* Top Floating Metadata */}
        <View className="absolute top-3 left-3 right-3 z-10 flex-row items-center justify-between">
          {item.isStudioCleaned ? (
            <View className="flex-row items-center px-2.5 py-1 rounded-full bg-[#FBF9F5]/90 border border-[#A78B71]/30 shadow-xs">
              <Text className="text-[11px] mr-1">✨</Text>
              <Text className="text-[10px] font-semibold text-[#A78B71] tracking-widest uppercase">
                AI STUDIO CLEANED
              </Text>
            </View>
          ) : <View />}

          <TouchableOpacity
            accessibilityLabel="Bookmark item"
            activeOpacity={0.7}
            onPress={(e) => {
              e.stopPropagation();
              toggleBookmark(item.id);
            }}
            className="w-8 h-8 rounded-full bg-[#FBF9F5]/90 border border-[rgba(22,21,20,0.08)] items-center justify-center shadow-xs"
          >
            <Bookmark
              size={15}
              color={item.isBookmarked ? '#732D30' : '#6A6661'}
              fill={item.isBookmarked ? '#732D30' : 'transparent'}
            />
          </TouchableOpacity>
        </View>

        {/* Cutout Garment Image */}
        <Image
          source={{ uri: item.imageUrl }}
          resizeMode="contain"
          className="w-full h-full"
        />

        {/* Studio Floor Soft Contact Shadow */}
        <View className="absolute bottom-3 w-3/4 h-2.5 bg-[rgba(22,21,20,0.06)] rounded-full" />
      </TouchableOpacity>

      {/* Garment Details & Actions */}
      <View className="p-4 flex-col gap-3">
        {/* Title & Size */}
        <View className="flex-row items-start justify-between gap-2">
          <TouchableOpacity activeOpacity={0.8} onPress={onPress} className="flex-1">
            <Text 
              className="text-base font-semibold text-[#161514] leading-tight"
              numberOfLines={2}
            >
              {item.title}
            </Text>
            {item.subhead && (
              <Text className="text-[11px] text-[#9B968F] uppercase tracking-wider mt-0.5">
                {item.subhead}
              </Text>
            )}
          </TouchableOpacity>
          <View className="px-2 py-0.5 rounded bg-[#F4EFEA] border border-[rgba(22,21,20,0.08)]">
            <Text className="text-[11px] font-semibold text-[#6A6661] uppercase">
              {item.size}
            </Text>
          </View>
        </View>

        {/* Pricing Row & Correos Delivery Badge */}
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-baseline gap-2">
            <Text 
              style={{ fontFamily: 'serif' }}
              className="text-xl font-bold text-[#161514]"
            >
              {formatPrice(item.price)}
            </Text>
            {item.originalPrice && (
              <Text className="text-xs text-[#9B968F] line-through">
                {formatPrice(item.originalPrice)}
              </Text>
            )}
          </View>

          {item.shipsWithCorreos && (
            <View className="flex-row items-center gap-1 px-2 py-0.5 rounded-full bg-[#ffcc00]/15 border border-[#ffcc00]/50">
              <Text className="text-[10px]">📦</Text>
              <Text className="text-[9px] font-bold text-[#003366]">
                Correos de CR
              </Text>
            </View>
          )}
        </View>

        {/* Seller Info & Action Cluster */}
        <View className="pt-3 border-t border-[rgba(22,21,20,0.08)] flex-row items-center justify-between">
          {/* Seller Snapshot */}
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => {
              setActiveScreen('PROFILE');
            }}
            className="flex-row items-center gap-2"
          >
            <View className="w-8 h-8 rounded-full bg-[#A78B71]/20 border border-[#A78B71]/40 items-center justify-center overflow-hidden">
              {item.seller.avatarUrl ? (
                <Image
                  source={{ uri: item.seller.avatarUrl }}
                  className="w-full h-full rounded-full"
                />
              ) : (
                <Text className="text-xs font-semibold text-[#A78B71]">
                  {item.seller.displayName.slice(0, 2).toUpperCase()}
                </Text>
              )}
            </View>
            <View>
              <View className="flex-row items-center gap-1">
                <Text className="text-xs font-semibold text-[#161514]">
                  {item.seller.handle}
                </Text>
                {item.seller.isVerified && (
                  <CheckCircle size={12} color="#A78B71" />
                )}
              </View>
              <Text className="text-[10px] text-[#9B968F]">{item.seller.location}</Text>
            </View>
          </TouchableOpacity>

          {/* Social Feedback & Offer CTA */}
          <View className="flex-row items-center gap-2.5">
            {/* Likes */}
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => toggleLike(item.id)}
              className="flex-row items-center gap-1"
            >
              <Heart
                size={16}
                color={item.isLiked ? '#732D30' : '#6A6661'}
                fill={item.isLiked ? '#732D30' : 'transparent'}
              />
              <Text className="text-xs text-[#6A6661]">{item.likesCount}</Text>
            </TouchableOpacity>

            {/* Comments */}
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={onPress}
              className="flex-row items-center gap-1"
            >
              <MessageCircle size={16} color="#6A6661" />
              <Text className="text-xs text-[#6A6661]">{item.commentsCount}</Text>
            </TouchableOpacity>

            {/* Make Offer CTA */}
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={onOfferPress}
              className="px-3.5 py-1.5 rounded-full bg-[#A78B71] active:bg-[#8F7359] shadow-xs"
            >
              <Text className="text-xs font-semibold text-white tracking-wide">
                Make Offer
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};
