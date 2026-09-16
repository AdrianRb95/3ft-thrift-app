export type CategoryFilter = 'All' | 'Jackets' | 'Denim' | 'Knitwear' | 'Vintage' | 'Streetwear';

export interface SellerProfile {
  id: string;
  handle: string;
  displayName: string;
  avatarUrl: string;
  location: string;
  isVerified: boolean;
  salesCount: number;
  rating: number;
  reviewCount: number;
  followersCount: number;
  shipSpeed: string;
  bio: string;
}

export interface GarmentItem {
  id: string;
  title: string;
  subhead?: string;
  brand: string;
  era?: string;
  category: CategoryFilter;
  size: string;
  condition: 'Pristine' | '9/10 Near Mint' | '8/10 Great' | 'Good' | 'Fair';
  price: number;
  originalPrice?: number;
  imageUrl: string;
  rawImageUrl?: string;
  isStudioCleaned: boolean;
  seller: SellerProfile;
  likesCount: number;
  commentsCount: number;
  isLiked?: boolean;
  isBookmarked?: boolean;
  description: string;
  measurements?: {
    chest?: string;
    length?: string;
    shoulders?: string;
  };
}

export interface Offer {
  id: string;
  itemId: string;
  buyerHandle: string;
  sellerHandle: string;
  amount: number;
  originalPrice: number;
  discountPercentage: number;
  note?: string;
  status: 'PENDING' | 'ACCEPTED' | 'DECLINED' | 'COUNTERED';
  createdAt: string;
}

export type ActiveScreen = 
  | 'FEED' 
  | 'EXPLORE'
  | 'ITEM_DETAIL' 
  | 'AI_CAPTURE' 
  | 'PROFILE' 
  | 'SIGN_UP' 
  | 'ONBOARDING'
  | 'INBOX';

export interface FreeTrialReferral {
  code: string;
  maxInvites: number;
  claimedInvites: number;
  friends: { id: string; name: string; claimedAt: string }[];
  isTrialActive: boolean;
  daysRemaining: number;
}

export interface OnboardingState {
  aestheticMoods: string[];
  topSize: string;
  bottomSize: string;
  marketplaceIntent: 'BUYING' | 'SELLING' | 'BOTH';
  isCompleted: boolean;
}

