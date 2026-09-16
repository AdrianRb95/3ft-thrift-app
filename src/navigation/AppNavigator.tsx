import React from 'react';
import { View } from 'react-native';
import { useAppStore } from '../store/useAppStore';
import { ThriftFeedScreen } from '../screens/ThriftFeedScreen';
import { ItemDetailScreen } from '../screens/ItemDetailScreen';
import { AIStudioCaptureScreen } from '../screens/AIStudioCaptureScreen';
import { WardrobeProfileScreen } from '../screens/WardrobeProfileScreen';
import { SignUpScreen } from '../screens/SignUpScreen';
import { OnboardingScreen } from '../screens/OnboardingScreen';
import { InboxOffersScreen } from '../screens/InboxOffersScreen';
import { FloatingNavbar } from '../components/FloatingNavbar';

export const AppNavigator: React.FC = () => {
  const { activeScreen, isAuthenticated, onboarding } = useAppStore();

  const renderScreen = () => {
    // Auth gates
    if (!isAuthenticated) {
      return <SignUpScreen />;
    }
    if (!onboarding.isCompleted) {
      return <OnboardingScreen />;
    }

    switch (activeScreen) {
      case 'FEED':
        return <ThriftFeedScreen />;
      case 'ITEM_DETAIL':
        return <ItemDetailScreen />;
      case 'AI_CAPTURE':
        return <AIStudioCaptureScreen />;
      case 'PROFILE':
        return <WardrobeProfileScreen />;
      case 'SIGN_UP':
        return <SignUpScreen />;
      case 'ONBOARDING':
        return <OnboardingScreen />;
      case 'INBOX':
        return <InboxOffersScreen />;
      default:
        return <ThriftFeedScreen />;
    }
  };

  const showNavbar =
    isAuthenticated &&
    onboarding.isCompleted &&
    ['FEED', 'PROFILE', 'INBOX'].includes(activeScreen);

  return (
    <View className="flex-1 bg-[#FBF9F5] relative">
      {renderScreen()}
      {showNavbar && <FloatingNavbar />}
    </View>
  );
};
