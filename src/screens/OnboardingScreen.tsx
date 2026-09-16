import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { Check, ArrowRight, Sparkles } from 'lucide-react-native';
import { useAppStore } from '../store/useAppStore';

interface MoodboardItem {
  id: string;
  title: string;
  subtitle: string;
  imageUrl: string;
}

const MOODBOARDS: MoodboardItem[] = [
  {
    id: '90s Vintage Archive',
    title: '90s Vintage Archive',
    subtitle: 'Distressed denim & heavy leathers',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBrL3JGFXSHxJYsXv1G1x-Prh53eIlcLYltompeBI5NLWZnKiDwvzHESFtOXP2sHFB9Rl9ed8SnTXHjWsOgCyOaJ75BoXSWrzUpbjqWB79YH_MJJUIASZ5FzNGiMvKHeihaZcmnCFY_ENEA_rkGy4NTWoHN2ZfhFE1MwL4PyGeQhhJzU8QEs0VM7mjnIpIohFKhmPirUmMGIEQ_5iLyPZO9KuqTNM7GBDAYFYJGZYk_CNafUFtmsmXK91X3hvcVLoff1r2KDRiQse8',
  },
  {
    id: 'Minimalist Luxury',
    title: 'Minimalist Luxury',
    subtitle: 'Virgin wool, silk & cashmere',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBin-Xb64T5RXtfgk-Jm72B0EaQrmAQDaQNTNyrIbIQTgNp_a0bdQTReYqf-vUSMd7NKJBcKUOUIIDU_QwQAyHbfyaoYGT_LjtJiJ0MCqykErvY8cIZZRxikYwss-sJnxfyl3o4doT9WlDkP_Wzao3FwYXsdlklyhbSnKjjvwJ--o0hag77Z6oc9OKUWx8xNOI6k9xlYoi31_p-yfsRyYEbH_VUvbWz-XfoV4PkyKt92lY6LJWkAFoClxXYY6sznLuH5DkiIpChkZU',
  },
  {
    id: 'Japanese Streetwear',
    title: 'Japanese Streetwear',
    subtitle: 'Raw selvedge & boxy silhouettes',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAFOJp14fx-ptJeAc4Lg54KOjgWgTVim7wUfNwgtqzRGphEysg5ntlKe0VRLE4nyAe7i2ZZpOjKULP7OVrFPEMdWLMSlUOC9hEThgpgDFv5qVY1__8Scc5-l9bcv9wt_o-Qr3yDY5zCKJS8KMv1U79acNaw5oSaq4ZaT_laxnrJXLSqqKneQai-hraceXpzlaC2gein_coGStP2AiAqtxraFsRxykWbh3s_szmxZZGgN_U7phuQ-Z6aodNtSjFj3rOoqS66ZSaQlWU',
  },
  {
    id: 'Gorpcore & Workwear',
    title: 'Gorpcore & Workwear',
    subtitle: 'Weathered canvas & technical shell',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuB_CsuVacIXrQkISxHl7Lmz036IJV31XoR6YezttAthqaJUMDw3lajGiXRdDMboTMF7kAMRfiZFRtk1HnhNrVgNl9c3x7OnM6QNQGIQwMeMAdYFBCTnjQMxzWbHp466aJtDLBv0RxQBAiKJuSGx-n8b3hg4sMx_3dYJU5L5ky49PxoQ4Cnn4WuZ3zqUqJ4tuzVN6WNH6-V-tNo6y3xsJjNA8-ZStf7xbrM9v1NMP8SqLo8AYvDVXYLRwBbPfX5hAy8CIuQiZLZmpdM',
  },
];

export const OnboardingScreen: React.FC = () => {
  const { setOnboardingPreferences, completeOnboarding } = useAppStore();

  const [selectedMoods, setSelectedMoods] = useState<string[]>([
    '90s Vintage Archive',
    'Minimalist Luxury',
  ]);
  const [topSize, setTopSize] = useState<string>('M');
  const [bottomSize, setBottomSize] = useState<string>('32');
  const [intent, setIntent] = useState<'BUYING' | 'SELLING' | 'BOTH'>('BOTH');

  const toggleMood = (id: string) => {
    if (selectedMoods.includes(id)) {
      if (selectedMoods.length > 1) {
        setSelectedMoods(selectedMoods.filter((m) => m !== id));
      }
    } else {
      setSelectedMoods([...selectedMoods, id]);
    }
  };

  const handleFinish = () => {
    setOnboardingPreferences({
      aestheticMoods: selectedMoods,
      topSize,
      bottomSize,
      marketplaceIntent: intent,
    });
    completeOnboarding();
  };

  return (
    <SafeAreaView className="flex-1 bg-[#FBF9F5]">
      <StatusBar barStyle="dark-content" backgroundColor="#FBF9F5" />

      {/* Top Bar */}
      <View className="px-5 py-3 flex-row items-center justify-between border-b border-[rgba(22,21,20,0.06)] bg-[#FBF9F5]/95">
        <View className="flex-row items-center gap-1.5">
          <Sparkles size={13} color="#A78B71" />
          <Text className="text-[10px] font-bold uppercase tracking-wider text-[#A78B71]">
            STEP 1 OF 3 • ARCHIVE CURATION
          </Text>
        </View>

        <TouchableOpacity
          activeOpacity={0.7}
          onPress={completeOnboarding}
          className="px-3 py-1 rounded-full bg-[#F4EFEA]"
        >
          <Text className="text-xs font-semibold text-[#6A6661]">Skip</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        className="flex-1 px-5 pt-3"
        contentContainerStyle={{ paddingBottom: 110 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Editorial Heading */}
        <View className="mb-4">
          <Text 
            style={{ fontFamily: 'serif' }}
            className="text-2xl font-bold text-[#161514] leading-tight"
          >
            Curate Your Archive Feed
          </Text>
          <Text className="text-xs text-[#6A6661] mt-1">
            Select your aesthetic moodboards and sizing to customize your 3ft thrift feed.
          </Text>
        </View>

        {/* Section 1: Aesthetic Moodboards (2x2 Grid) */}
        <View className="mb-5">
          <View className="flex-row items-baseline justify-between mb-2.5">
            <Text className="text-xs font-bold text-[#161514] uppercase tracking-wider">
              Aesthetic Moodboards
            </Text>
            <Text className="text-[10px] text-[#A78B71] font-semibold">
              {selectedMoods.length} Selected
            </Text>
          </View>

          <View className="flex-row flex-wrap justify-between">
            {MOODBOARDS.map((mood) => {
              const isSelected = selectedMoods.includes(mood.id);
              return (
                <TouchableOpacity
                  key={mood.id}
                  activeOpacity={0.8}
                  onPress={() => toggleMood(mood.id)}
                  className={`w-[48%] rounded-2xl p-2.5 mb-3 border ${
                    isSelected
                      ? 'bg-white border-[#A78B71] shadow-sm'
                      : 'bg-white border-[rgba(22,21,20,0.08)]'
                  }`}
                >
                  <View className="relative w-full aspect-[4/3] rounded-xl overflow-hidden mb-2 bg-[#F4EFEA]">
                    <Image
                      source={{ uri: mood.imageUrl }}
                      className="w-full h-full"
                      resizeMode="cover"
                    />
                    {isSelected ? (
                      <View className="absolute top-2 right-2 w-5 h-5 rounded-full bg-[#A78B71] items-center justify-center">
                        <Check size={12} color="#FFFFFF" />
                      </View>
                    ) : (
                      <View className="absolute top-2 right-2 w-5 h-5 rounded-full bg-white/80 border border-[rgba(22,21,20,0.1)]" />
                    )}
                  </View>

                  <Text className="text-xs font-bold text-[#161514] leading-tight" numberOfLines={1}>
                    {mood.title}
                  </Text>
                  <Text className="text-[10px] text-[#9B968F] mt-0.5" numberOfLines={1}>
                    {mood.subtitle}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Section 2: Fit & Sizing */}
        <View className="bg-white rounded-2xl p-4 border border-[rgba(22,21,20,0.08)] shadow-xs space-y-4 mb-5">
          <View>
            <Text className="text-sm font-bold text-[#161514]">
              Your Fit & Sizing
            </Text>
            <Text className="text-[11px] text-[#6A6661]">
              We filter out pieces that won't fit your silhouette.
            </Text>
          </View>

          {/* Tops */}
          <View>
            <View className="flex-row justify-between mb-1.5">
              <Text className="text-xs font-semibold text-[#161514]">
                Tops & Outerwear
              </Text>
              <Text className="text-[10px] font-bold text-[#A78B71] uppercase">
                Selected: {topSize}
              </Text>
            </View>
            <View className="flex-row gap-2">
              {['XS', 'S', 'M', 'L', 'XL'].map((s) => (
                <TouchableOpacity
                  key={s}
                  activeOpacity={0.8}
                  onPress={() => setTopSize(s)}
                  className={`flex-1 py-2 rounded-lg items-center border ${
                    topSize === s
                      ? 'bg-[#A78B71] border-[#A78B71]'
                      : 'bg-[#F4EFEA] border-transparent'
                  }`}
                >
                  <Text
                    className={`text-xs font-bold ${
                      topSize === s ? 'text-white' : 'text-[#6A6661]'
                    }`}
                  >
                    {s}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Waist */}
          <View className="pt-2 border-t border-[rgba(22,21,20,0.06)]">
            <View className="flex-row justify-between mb-1.5">
              <Text className="text-xs font-semibold text-[#161514]">
                Waist & Bottoms
              </Text>
              <Text className="text-[10px] font-bold text-[#A78B71] uppercase">
                Selected: {bottomSize}"
              </Text>
            </View>
            <View className="flex-row gap-2">
              {['28', '30', '32', '34', '36'].map((b) => (
                <TouchableOpacity
                  key={b}
                  activeOpacity={0.8}
                  onPress={() => setBottomSize(b)}
                  className={`flex-1 py-2 rounded-lg items-center border ${
                    bottomSize === b
                      ? 'bg-[#A78B71] border-[#A78B71]'
                      : 'bg-[#F4EFEA] border-transparent'
                  }`}
                >
                  <Text
                    className={`text-xs font-bold ${
                      bottomSize === b ? 'text-white' : 'text-[#6A6661]'
                    }`}
                  >
                    {b}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>

        {/* Section 3: Marketplace Intent */}
        <View className="space-y-2 mb-6">
          <Text className="text-sm font-bold text-[#161514]">
            How do you plan to use 3ft?
          </Text>
          <View className="flex-row gap-2">
            {[
              { id: 'BUYING', label: 'Buy Pieces' },
              { id: 'SELLING', label: 'Sell Archive' },
              { id: 'BOTH', label: 'Both' },
            ].map((opt) => (
              <TouchableOpacity
                key={opt.id}
                activeOpacity={0.8}
                onPress={() => setIntent(opt.id as any)}
                className={`flex-1 py-2.5 rounded-full border items-center ${
                  intent === opt.id
                    ? 'bg-[#161514] border-[#161514]'
                    : 'bg-white border-[rgba(22,21,20,0.08)]'
                }`}
              >
                <Text
                  className={`text-xs font-semibold ${
                    intent === opt.id ? 'text-white' : 'text-[#6A6661]'
                  }`}
                >
                  {opt.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Sticky Bottom Bar */}
      <View className="absolute bottom-0 left-0 right-0 bg-white/95 border-t border-[rgba(22,21,20,0.08)] p-4">
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={handleFinish}
          className="w-full py-4 rounded-full bg-[#A78B71] active:bg-[#8F7359] flex-row items-center justify-center gap-2 shadow-md"
        >
          <Text className="text-base font-bold text-white tracking-wide">
            Complete Curation
          </Text>
          <ArrowRight size={18} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
