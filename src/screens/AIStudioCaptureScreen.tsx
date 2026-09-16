import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Switch,
  Alert,
} from 'react-native';
import {
  X,
  Sparkles,
  CheckCircle,
  Tag,
  Clock,
  TrendingUp,
  RefreshCw,
  Lock,
  ArrowUpRight,
} from 'lucide-react-native';
import { useAppStore, CURRENT_USER } from '../store/useAppStore';
import { GarmentItem } from '../types';

type ViewMode = 'split' | 'studio' | 'raw';

export const AIStudioCaptureScreen: React.FC = () => {
  const { setActiveScreen, addNewItem } = useAppStore();

  const [viewMode, setViewMode] = useState<ViewMode>('split');
  const [title, setTitle] = useState<string>("Vintage Levi's Type III Denim Trucker Jacket");
  const [selectedSize, setSelectedSize] = useState<string>('M');
  const [selectedCondition, setSelectedCondition] = useState<
    'Pristine' | '9/10 Near Mint' | '8/10 Great' | 'Good' | 'Fair'
  >('9/10 Near Mint');
  const [price, setPrice] = useState<string>('120');
  const [acceptQuickOffers, setAcceptQuickOffers] = useState<boolean>(true);
  const [description, setDescription] = useState<string>(
    "Iconic 1990s Type III trucker jacket by Levi Strauss & Co. Beautiful light vintage honey wash with contrast copper bar-tack stitching. Relaxed boxy silhouette. Isolated and authenticated via 3ft AI Studio."
  );

  const rawImage =
    'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&w=800&q=80';
  const studioImage =
    'https://lh3.googleusercontent.com/aida-public/AB6AXuBt1pPJPx5T-ewahoiuCTau5UAo31_f-J8T6hP6ICngXjjXHxSW-XEnLvY40CB3hlLD2xAdygf_7ksVazQoPXmBJqgiqm5C-UQpQQjVdFOa92WofAfGHlH2D68U1YIym3gdCY1LBBjywd8FC7LQqqLHVPViqsRj4YsePUYMrszjfdEBv9PiFouNNAsG1tFMM78LW7Xf48xLPte106oheOiUg3IQASrmbH7NmmTCbvgnoXSN52nKz2LLEhy-ofmhnvZ_K57pKvJC5TA';

  const handlePublish = () => {
    const numericPrice = parseFloat(price) || 120;
    const newItem: GarmentItem = {
      id: `item_${Date.now()}`,
      title,
      subhead: 'Natural Washed Indigo • Made in USA',
      brand: "Levi's",
      era: '1990s',
      category: 'Denim',
      size: `Size ${selectedSize}`,
      condition: selectedCondition,
      price: numericPrice,
      originalPrice: Math.round(numericPrice * 1.35),
      imageUrl: studioImage,
      rawImageUrl: rawImage,
      isStudioCleaned: true,
      seller: CURRENT_USER,
      likesCount: 1,
      commentsCount: 0,
      isLiked: false,
      isBookmarked: false,
      description,
      measurements: {
        chest: '21.5"',
        length: '25.0"',
        shoulders: '18.5"',
      },
    };

    addNewItem(newItem);
    Alert.alert(
      'Garment Published! ✨',
      'Your AI Studio cleaned piece is now live on the 3ft Editorial Thrift Feed.',
      [{ text: 'View on Feed', onPress: () => setActiveScreen('FEED') }]
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-[#FBF9F5]">
      <StatusBar barStyle="dark-content" backgroundColor="#FBF9F5" />

      {/* Top Header Bar */}
      <View className="px-5 py-3 flex-row items-center justify-between border-b border-[rgba(22,21,20,0.06)] bg-[#FBF9F5]/95">
        <TouchableOpacity
          accessibilityLabel="Dismiss"
          onPress={() => setActiveScreen('FEED')}
          activeOpacity={0.7}
          className="w-9 h-9 rounded-full bg-[#F4EFEA] items-center justify-center border border-[rgba(22,21,20,0.08)]"
        >
          <X size={18} color="#161514" />
        </TouchableOpacity>

        <Text 
          style={{ fontFamily: 'serif' }}
          className="text-lg font-bold text-[#161514]"
        >
          AI Studio Listing
        </Text>

        <View className="w-9 h-9" />
      </View>

      <ScrollView
        className="flex-1 px-5 pt-3"
        contentContainerStyle={{ paddingBottom: 120 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Interactive Before / After Studio Frame */}
        <View className="bg-white rounded-2xl p-3 border border-[rgba(22,21,20,0.08)] shadow-xs mb-4">
          {/* Segmented Mode Selector */}
          <View className="flex-row items-center justify-between pb-2 mb-2 border-b border-[rgba(22,21,20,0.05)]">
            <View className="flex-row items-center gap-1.5">
              <View className="w-2 h-2 rounded-full bg-[#A78B71]" />
              <Text className="text-[10px] font-bold uppercase tracking-wider text-[#6A6661]">
                AI Clean-Up Active
              </Text>
            </View>

            <View className="flex-row bg-[#F4EFEA] p-0.5 rounded-full border border-[rgba(22,21,20,0.08)]">
              {(['split', 'studio', 'raw'] as ViewMode[]).map((mode) => (
                <TouchableOpacity
                  key={mode}
                  activeOpacity={0.8}
                  onPress={() => setViewMode(mode)}
                  className={`px-3 py-1 rounded-full ${
                    viewMode === mode ? 'bg-white shadow-xs' : ''
                  }`}
                >
                  <Text
                    className={`text-[10px] font-bold uppercase tracking-wider ${
                      viewMode === mode ? 'text-[#161514]' : 'text-[#6A6661]'
                    }`}
                  >
                    {mode}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Image Stage */}
          <View className="relative w-full aspect-[4/5] rounded-xl overflow-hidden bg-[#F4EFEA]">
            {viewMode === 'split' ? (
              <View className="w-full h-full flex-row">
                {/* Raw Half */}
                <View className="w-1/2 h-full overflow-hidden relative">
                  <Image
                    source={{ uri: rawImage }}
                    className="w-[200%] h-full"
                    resizeMode="cover"
                  />
                  <View className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-black/60">
                    <Text className="text-[9px] font-semibold text-white uppercase">
                      Raw
                    </Text>
                  </View>
                </View>

                {/* Studio Half */}
                <View className="w-1/2 h-full bg-[#fbf9f5] overflow-hidden relative items-center justify-center p-2">
                  <Image
                    source={{ uri: studioImage }}
                    className="w-full h-full"
                    resizeMode="contain"
                  />
                  <View className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-white/90 border border-[rgba(22,21,20,0.08)]">
                    <Text className="text-[9px] font-semibold text-[#A78B71] uppercase">
                      Studio
                    </Text>
                  </View>
                </View>

                {/* Divider bar */}
                <View className="absolute top-0 bottom-0 left-1/2 -ml-0.5 w-1 bg-white shadow-md items-center justify-center">
                  <View className="w-5 h-5 rounded-full bg-white border border-[rgba(22,21,20,0.1)] items-center justify-center">
                    <Sparkles size={11} color="#A78B71" />
                  </View>
                </View>
              </View>
            ) : viewMode === 'studio' ? (
              <View className="w-full h-full bg-[#fbf9f5] items-center justify-center p-4">
                <Image
                  source={{ uri: studioImage }}
                  className="w-full h-full"
                  resizeMode="contain"
                />
                <View className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-white/90 border border-[rgba(22,21,20,0.08)]">
                  <Text className="text-[10px] font-bold text-[#A78B71] uppercase tracking-wider">
                    ✨ Isolated
                  </Text>
                </View>
              </View>
            ) : (
              <View className="w-full h-full relative">
                <Image
                  source={{ uri: rawImage }}
                  className="w-full h-full"
                  resizeMode="cover"
                />
                <View className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/70">
                  <Text className="text-[10px] font-bold text-white uppercase tracking-wider">
                    Raw Upload
                  </Text>
                </View>
              </View>
            )}

            {/* Floating Badges */}
            <View className="absolute bottom-2 left-2 right-2 flex-row flex-wrap gap-1">
              <View className="bg-white/90 px-2 py-0.5 rounded-full border border-[rgba(22,21,20,0.08)] flex-row items-center gap-1">
                <Text className="text-[9px]">✨</Text>
                <Text className="text-[9px] font-medium text-[#161514]">BG Removed</Text>
              </View>
              <View className="bg-white/90 px-2 py-0.5 rounded-full border border-[rgba(22,21,20,0.08)] flex-row items-center gap-1">
                <Text className="text-[9px]">☀️</Text>
                <Text className="text-[9px] font-medium text-[#161514]">Relit</Text>
              </View>
              <View className="bg-white/90 px-2 py-0.5 rounded-full border border-[rgba(22,21,20,0.08)] flex-row items-center gap-1">
                <Text className="text-[9px]">🏷️</Text>
                <Text className="text-[9px] font-medium text-[#161514]">4 Tags</Text>
              </View>
            </View>
          </View>
        </View>

        {/* AI Listing Form */}
        <View className="bg-white rounded-2xl p-4 border border-[rgba(22,21,20,0.08)] shadow-xs space-y-4">
          <View className="flex-row items-center justify-between pb-2 border-b border-[rgba(22,21,20,0.06)]">
            <View className="flex-row items-center gap-1.5">
              <Sparkles size={14} color="#A78B71" />
              <Text className="text-[10px] font-bold uppercase tracking-wider text-[#A78B71]">
                AI AUTO-FILLED • VERIFY & EDIT
              </Text>
            </View>
            <View className="px-2 py-0.5 rounded-full bg-[#F4EFEA]">
              <Text className="text-[9px] font-semibold text-[#6A6661] uppercase">
                Editable
              </Text>
            </View>
          </View>

          {/* Garment Title */}
          <View>
            <Text className="text-[10px] font-bold uppercase tracking-wider text-[#6A6661] mb-1">
              Garment Title
            </Text>
            <TextInput
              value={title}
              onChangeText={setTitle}
              className="bg-[#FBF9F5] border border-[rgba(22,21,20,0.08)] rounded-xl px-3 py-2.5 text-base font-semibold text-[#161514]"
            />
          </View>

          {/* Detected Attributes */}
          <View>
            <Text className="text-[10px] font-bold uppercase tracking-wider text-[#6A6661] mb-1.5">
              Detected Attributes
            </Text>
            <View className="flex-row flex-wrap gap-2">
              <View className="flex-row items-center gap-1 bg-[#F4EFEA] px-2.5 py-1 rounded-full border border-[rgba(22,21,20,0.08)]">
                <CheckCircle size={13} color="#2e7d32" />
                <Text className="text-xs font-semibold text-[#161514]">Levi's</Text>
                <Text className="text-[9px] font-bold text-[#2e7d32] bg-[#2e7d32]/10 px-1 rounded">
                  98%
                </Text>
              </View>

              <View className="flex-row items-center gap-1 bg-[#F4EFEA] px-2.5 py-1 rounded-full border border-[rgba(22,21,20,0.08)]">
                <Tag size={12} color="#6A6661" />
                <Text className="text-xs text-[#6A6661]">Denim Jackets</Text>
              </View>

              <View className="flex-row items-center gap-1 bg-[#F4EFEA] px-2.5 py-1 rounded-full border border-[rgba(22,21,20,0.08)]">
                <Clock size={12} color="#6A6661" />
                <Text className="text-xs text-[#6A6661]">1990s Era</Text>
              </View>
            </View>
          </View>

          {/* Size Selector */}
          <View>
            <Text className="text-[10px] font-bold uppercase tracking-wider text-[#6A6661] mb-1.5">
              Size
            </Text>
            <View className="flex-row gap-2">
              {['XS', 'S', 'M', 'L', 'XL'].map((sz) => (
                <TouchableOpacity
                  key={sz}
                  activeOpacity={0.8}
                  onPress={() => setSelectedSize(sz)}
                  className={`flex-1 py-2 rounded-lg border items-center ${
                    selectedSize === sz
                      ? 'bg-[#A78B71]/15 border-[#A78B71]'
                      : 'bg-[#FBF9F5] border-[rgba(22,21,20,0.08)]'
                  }`}
                >
                  <Text
                    className={`text-xs font-bold ${
                      selectedSize === sz ? 'text-[#161514]' : 'text-[#6A6661]'
                    }`}
                  >
                    {sz}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Condition Rating */}
          <View>
            <View className="flex-row items-center justify-between mb-1.5">
              <Text className="text-[10px] font-bold uppercase tracking-wider text-[#6A6661]">
                Condition Grade
              </Text>
              <Text className="text-[10px] text-[#9B968F]">
                AI graded from photo wear
              </Text>
            </View>
            <View className="flex-row flex-wrap gap-1.5">
              {(
                [
                  'Pristine',
                  '9/10 Near Mint',
                  '8/10 Great',
                  'Good',
                  'Fair',
                ] as const
              ).map((cond) => (
                <TouchableOpacity
                  key={cond}
                  activeOpacity={0.8}
                  onPress={() => setSelectedCondition(cond)}
                  className={`px-3 py-1.5 rounded-full border ${
                    selectedCondition === cond
                      ? 'bg-[#A78B71]/15 border-[#A78B71]'
                      : 'bg-[#FBF9F5] border-[rgba(22,21,20,0.08)]'
                  }`}
                >
                  <Text
                    className={`text-xs font-semibold ${
                      selectedCondition === cond
                        ? 'text-[#161514]'
                        : 'text-[#6A6661]'
                    }`}
                  >
                    {cond}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Listing Price */}
          <View>
            <Text className="text-[10px] font-bold uppercase tracking-wider text-[#6A6661] mb-1">
              Listing Price (USD)
            </Text>
            <View className="flex-row items-center bg-[#FBF9F5] border border-[rgba(22,21,20,0.08)] rounded-xl px-3 py-2">
              <Text className="text-xl font-bold text-[#161514] mr-1">$</Text>
              <TextInput
                value={price}
                onChangeText={setPrice}
                keyboardType="numeric"
                className="flex-1 text-xl font-bold text-[#161514]"
              />
              <Text className="text-xs font-semibold text-[#9B968F] uppercase">
                USD
              </Text>
            </View>

            {/* Valuation note */}
            <View className="bg-[#F4EFEA] rounded-xl p-2.5 border border-[rgba(22,21,20,0.08)] flex-row items-start gap-2 mt-2">
              <TrendingUp size={16} color="#A78B71" style={{ marginTop: 2 }} />
              <Text className="text-xs text-[#6A6661] flex-1 leading-snug">
                <Text className="font-bold text-[#161514]">
                  ✨ AI Valuation: $110 – $145
                </Text>{' '}
                based on 34 recent sales of 90s vintage Levi’s jackets.
              </Text>
            </View>
          </View>

          {/* Quick DM Offers Toggle */}
          <View className="flex-row items-center justify-between py-2 border-t border-[rgba(22,21,20,0.06)]">
            <View className="flex-1 pr-2">
              <Text className="text-xs font-bold text-[#161514]">
                Accept Quick DM Offers
              </Text>
              <Text className="text-[11px] text-[#6A6661]">
                Buyers can send instant -10% or -15% offers
              </Text>
            </View>
            <Switch
              value={acceptQuickOffers}
              onValueChange={setAcceptQuickOffers}
              trackColor={{ false: '#d2c4ba', true: '#A78B71' }}
              thumbColor="#FFFFFF"
            />
          </View>

          {/* AI Generated Description */}
          <View>
            <View className="flex-row items-center justify-between mb-1">
              <Text className="text-[10px] font-bold uppercase tracking-wider text-[#6A6661]">
                AI Generated Description
              </Text>
              <TouchableOpacity
                onPress={() => {
                  setDescription(
                    "Original union-label 1990s Levi's Type III trucker jacket. Features dual chest flap pockets, natural honey fades, and relaxed archival drape."
                  );
                }}
                className="flex-row items-center gap-0.5"
              >
                <RefreshCw size={11} color="#A78B71" />
                <Text className="text-[10px] font-semibold text-[#A78B71] uppercase">
                  Regenerate
                </Text>
              </TouchableOpacity>
            </View>
            <TextInput
              value={description}
              onChangeText={setDescription}
              multiline
              numberOfLines={3}
              className="bg-[#FBF9F5] border border-[rgba(22,21,20,0.08)] rounded-xl p-3 text-xs text-[#161514] leading-relaxed"
            />
          </View>
        </View>

        {/* Studio Guarantee */}
        <View className="flex-row items-center justify-center gap-1.5 py-4">
          <Lock size={13} color="#9B968F" />
          <Text className="text-[10px] font-semibold uppercase tracking-wider text-[#9B968F]">
            Protected by 3ft Studio Authentication
          </Text>
        </View>
      </ScrollView>

      {/* Sticky Bottom Publishing Bar */}
      <View className="absolute bottom-0 left-0 right-0 bg-white/95 border-t border-[rgba(22,21,20,0.08)] p-4">
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={handlePublish}
          className="w-full py-4 rounded-full bg-[#A78B71] active:bg-[#8F7359] flex-row items-center justify-center gap-2 shadow-md"
        >
          <Text className="text-base font-bold text-white tracking-wide">
            Publish to Feed ↑
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
