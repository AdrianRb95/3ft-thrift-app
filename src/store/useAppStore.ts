import { create } from 'zustand';
import {
  GarmentItem,
  SellerProfile,
  Offer,
  CategoryFilter,
  ActiveScreen,
  OnboardingState,
  FreeTrialReferral,
  Currency,
  Language,
  CostaRicaProvince,
} from '../types';

export const CURRENT_USER: SellerProfile = {
  id: 'usr_me',
  handle: '@adrian_archive',
  displayName: 'Adrian Ramirez',
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
  location: 'San José, Costa Rica',
  isVerified: true,
  salesCount: 14,
  rating: 4.95,
  reviewCount: 12,
  followersCount: 1200,
  shipSpeed: '99%',
  bio: 'Curador de prendas vintage 80s-90s, denim de archivo y chaquetas de cuero. Envíos a todo Costa Rica con Correos de CR.',
};

export const ELENA_PROFILE: SellerProfile = {
  id: 'usr_elena',
  handle: '@elena_archive',
  displayName: 'Elena Archive',
  avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80',
  location: 'San José / London',
  isVerified: true,
  salesCount: 68,
  rating: 4.9,
  reviewCount: 54,
  followersCount: 2400,
  shipSpeed: '98%',
  bio: 'Curating 80s-90s leather, archival denim, and vintage luxury pieces. Envíos nacionales e internacionales vía Correos de Costa Rica.',
};

export const INITIAL_ITEMS: GarmentItem[] = [
  {
    id: 'item_1',
    title: 'Vintage Schott NYC Leather Biker Jacket',
    subhead: 'Authentic 1980s Steerhide • Flawless Patina',
    brand: 'Schott NYC',
    era: '1980s',
    category: 'Jackets',
    size: 'Size L',
    condition: '9/10 Near Mint',
    price: 240,
    originalPrice: 380,
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDgWAQNpUcFPeOgv7DklmGAycI60-pU8C2DETAHM6371Vh2JneHpj9UPn2Y5T16EYxmunXtU4AIABeMchKZA7BV20DAABkjclOCX6EfOnMToRirl_61vNOikmS3WPG4Taeixp0sQky6mWqSBQczdaEVEZZnJi1OsdvozDWDgt3sHN2fynysBhip1uSI3gPr6zSDDD2LLQrIcx55szk2KaLwR7HYTv6vG3g0TOV0p14PgjvCRb2i_V8L3I8QhjJ8GD4l_jvZ993yitE',
    rawImageUrl: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=800&q=80',
    isStudioCleaned: true,
    seller: ELENA_PROFILE,
    likesCount: 142,
    commentsCount: 18,
    isLiked: false,
    isBookmarked: false,
    description: 'Authentic 1980s Schott NYC Perfecto steerhide leather biker jacket. Heavyweight grain with stunning naturally worn patina across collar and elbows. All Talon zippers operate smoothly with original leather pull tabs.',
    shippingFrom: 'San José, Costa Rica (Curridabat)',
    shipsWithCorreos: true,
    correosShipping: {
      originProvince: 'San José',
      destinationProvince: 'San José',
      carrier: 'Correos de Costa Rica',
      service: 'Pymexpress GAM',
      rateCRC: 2200,
      rateUSD: 4.25,
      estimatedDelivery: '24-48 horas',
      trackingNumber: 'CR928471203CR',
      trackingStatus: 'En Sucursal Zapote - Listo para entrega',
    },
    measurements: {
      chest: '22.5"',
      length: '26.0"',
      shoulders: '19.0"',
    },
  },
  {
    id: 'item_2',
    title: "90s Levi's Type III Denim Trucker Jacket",
    subhead: 'Natural Washed Indigo • Made in USA',
    brand: "Levi's",
    era: '1990s',
    category: 'Denim',
    size: 'Size M',
    condition: '9/10 Near Mint',
    price: 120,
    originalPrice: 165,
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBt1pPJPx5T-ewahoiuCTau5UAo31_f-J8T6hP6ICngXjjXHxSW-XEnLvY40CB3hlLD2xAdygf_7ksVazQoPXmBJqgiqm5C-UQpQQjVdFOa92WofAfGHlH2D68U1YIym3gdCY1LBBjywd8FC7LQqqLHVPViqsRj4YsePUYMrszjfdEBv9PiFouNNAsG1tFMM78LW7Xf48xLPte106oheOiUg3IQASrmbH7NmmTCbvgnoXSN52nKz2LLEhy-ofmhnvZ_K57pKvJC5TA',
    rawImageUrl: 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&w=800&q=80',
    isStudioCleaned: true,
    seller: {
      id: 'usr_milo',
      handle: '@milo_finds',
      displayName: 'Milo Vintage',
      avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
      location: 'Berlin, DE',
      isVerified: true,
      salesCount: 42,
      rating: 4.88,
      reviewCount: 31,
      followersCount: 1600,
      shipSpeed: '97%',
      bio: 'Berlin based curator of vintage workwear and Japanese selvedge denim.',
    },
    likesCount: 89,
    commentsCount: 9,
    isLiked: false,
    isBookmarked: false,
    description: 'Iconic 1990s Type III trucker jacket by Levi Strauss & Co. Beautiful light vintage honey wash with contrast copper bar-tack stitching. Relaxed boxy silhouette.',
    measurements: {
      chest: '21.0"',
      length: '24.5"',
      shoulders: '18.0"',
    },
  },
  {
    id: 'item_3',
    title: 'Vintage Mohair Knit Cardigan Sweater',
    subhead: 'Brushed Olive Moss • Horn Buttons',
    brand: 'Needles Archive',
    era: '1990s',
    category: 'Knitwear',
    size: 'Size S',
    condition: 'Pristine',
    price: 145,
    originalPrice: 220,
    imageUrl: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=800&q=80',
    isStudioCleaned: true,
    seller: ELENA_PROFILE,
    likesCount: 115,
    commentsCount: 12,
    isLiked: true,
    isBookmarked: false,
    description: 'Super-soft brushed mohair blend cardigan in rare olive moss green. Chunky ribbed trim with tortoise horn buttons. Pristine museum condition.',
  },
  {
    id: 'item_4',
    title: 'Vintage Carhartt Detroit Duck Canvas Jacket',
    subhead: 'Blanket Lined • Weathered Tobacco Patina',
    brand: 'Carhartt',
    era: '1980s',
    category: 'Vintage',
    size: 'Size XL',
    condition: '8/10 Great',
    price: 210,
    originalPrice: 290,
    imageUrl: 'https://images.unsplash.com/photo-1548883354-7622d03aca27?auto=format&fit=crop&w=800&q=80',
    isStudioCleaned: true,
    seller: ELENA_PROFILE,
    likesCount: 204,
    commentsCount: 24,
    isLiked: false,
    isBookmarked: true,
    description: 'Original union-made Detroit jacket in heavy 12oz duck canvas. Blanket lined body with quilted nylon sleeves and corduroy collar.',
  },
];

interface AppState {
  // Navigation
  activeScreen: ActiveScreen;
  setActiveScreen: (screen: ActiveScreen) => void;
  selectedItemId: string | null;
  setSelectedItemId: (id: string | null) => void;

  // Search & Filters
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  selectedCategory: CategoryFilter;
  setSelectedCategory: (cat: CategoryFilter) => void;
  items: GarmentItem[];
  toggleLike: (id: string) => void;
  toggleBookmark: (id: string) => void;
  addNewItem: (item: GarmentItem) => void;

  // Free Trial Sharing (Invite 2 Friends)
  freeTrial: FreeTrialReferral;
  claimFriendInvite: (friendName: string) => void;

  // Offer Drawer
  isOfferDrawerOpen: boolean;
  setOfferDrawerOpen: (open: boolean) => void;
  offers: Offer[];
  submitOffer: (offer: Omit<Offer, 'id' | 'createdAt' | 'status'>) => void;

  // Currency, Language & Costa Rica Delivery
  currency: Currency;
  setCurrency: (c: Currency) => void;
  language: Language;
  setLanguage: (l: Language) => void;
  userProvince: CostaRicaProvince;
  setUserProvince: (p: CostaRicaProvince) => void;
  formatPrice: (amountUSD: number) => string;

  // Onboarding & Auth
  isAuthenticated: boolean;
  setAuthenticated: (auth: boolean) => void;
  onboarding: OnboardingState;
  setOnboardingPreferences: (prefs: Partial<OnboardingState>) => void;
  completeOnboarding: () => void;
  signOut: () => void;
  resetOnboarding: () => void;
}

export const useAppStore = create<AppState>((set, get) => ({
  // Currency & Localization defaults
  currency: 'USD',
  setCurrency: (c) => set({ currency: c }),
  language: 'es',
  setLanguage: (l) => set({ language: l }),
  userProvince: 'San José',
  setUserProvince: (p) => set({ userProvince: p }),
  formatPrice: (amountUSD) => {
    const curr = get().currency;
    if (curr === 'CRC') {
      const colones = Math.round(amountUSD * 515);
      return `₡${colones.toLocaleString('es-CR')}`;
    }
    return `$${amountUSD.toFixed(2)}`;
  },

  activeScreen: 'FEED',
  setActiveScreen: (screen) => set({ activeScreen: screen }),
  selectedItemId: 'item_1',
  setSelectedItemId: (id) => set({ selectedItemId: id }),

  searchQuery: '',
  setSearchQuery: (query) => set({ searchQuery: query }),
  isSearchOpen: false,
  setIsSearchOpen: (open) => set({ isSearchOpen: open }),

  selectedCategory: 'All',
  setSelectedCategory: (cat) => set({ selectedCategory: cat }),
  items: INITIAL_ITEMS,

  freeTrial: {
    code: '3FT-ADRIAN-VIP',
    maxInvites: 2,
    claimedInvites: 0,
    friends: [],
    isTrialActive: true,
    daysRemaining: 30,
  },
  claimFriendInvite: (friendName) =>
    set((state) => {
      if (state.freeTrial.claimedInvites >= state.freeTrial.maxInvites) return state;
      const updatedFriends = [
        ...state.freeTrial.friends,
        {
          id: `friend_${Date.now()}`,
          name: friendName,
          claimedAt: 'Claimed today',
        },
      ];
      return {
        freeTrial: {
          ...state.freeTrial,
          claimedInvites: updatedFriends.length,
          friends: updatedFriends,
        },
      };
    }),

  toggleLike: (id) =>
    set((state) => ({
      items: state.items.map((item) =>
        item.id === id
          ? {
              ...item,
              isLiked: !item.isLiked,
              likesCount: item.isLiked ? item.likesCount - 1 : item.likesCount + 1,
            }
          : item
      ),
    })),

  toggleBookmark: (id) =>
    set((state) => ({
      items: state.items.map((item) =>
        item.id === id ? { ...item, isBookmarked: !item.isBookmarked } : item
      ),
    })),

  addNewItem: (newItem) =>
    set((state) => ({
      items: [newItem, ...state.items],
      activeScreen: 'FEED',
    })),

  isOfferDrawerOpen: false,
  setOfferDrawerOpen: (open) => set({ isOfferDrawerOpen: open }),
  offers: [],
  submitOffer: (newOffer) =>
    set((state) => ({
      offers: [
        {
          ...newOffer,
          id: `off_${Date.now()}`,
          createdAt: new Date().toISOString(),
          status: 'PENDING',
        },
        ...state.offers,
      ],
      isOfferDrawerOpen: false,
    })),

  isAuthenticated: true,
  setAuthenticated: (auth) => set({ isAuthenticated: auth }),

  onboarding: {
    aestheticMoods: ['90s Vintage Archive', 'Minimalist Luxury'],
    topSize: 'M',
    bottomSize: '32',
    marketplaceIntent: 'BOTH',
    isCompleted: true,
  },
  setOnboardingPreferences: (prefs) =>
    set((state) => ({
      onboarding: { ...state.onboarding, ...prefs },
    })),
  completeOnboarding: () =>
    set((state) => ({
      onboarding: { ...state.onboarding, isCompleted: true },
      activeScreen: 'FEED',
    })),
  signOut: () =>
    set({
      isAuthenticated: false,
      onboarding: {
        aestheticMoods: ['90s Vintage Archive', 'Minimalist Luxury'],
        topSize: 'M',
        bottomSize: '32',
        marketplaceIntent: 'BOTH',
        isCompleted: false,
      },
      activeScreen: 'SIGN_UP',
    }),
  resetOnboarding: () =>
    set((state) => ({
      onboarding: { ...state.onboarding, isCompleted: false },
      activeScreen: 'ONBOARDING',
    })),
}));
