import React, { createContext, useContext, useState, useEffect } from 'react';
import { useUser } from './UserContext';
import { setJsonCookie, getJsonCookie, deleteCookie } from '../utils/cookies';

interface UserProfile {
  ID: number;
  Username: string;
  Name: string;
  Surname: string;
  Email: string;
  Role: number;
  ProfileImage: string;
}

interface CreatorProfile {
  UserID: number;
  Bio: string;
  ProfileImage: string;
  Followers: number;
  Subscribers: number;
  SubscriptionFee: number;
  BannerImage: string;
  Username: string;
}

type Profile = UserProfile | CreatorProfile;

interface UserProfileContextType {
  profile: Profile | null;
  setUserProfile: (profile: UserProfile | null) => void;
  setCreatorProfile: (profile: CreatorProfile | null) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

const UserProfileContext = createContext<UserProfileContextType | undefined>(undefined);

const USER_PROFILE_COOKIE = 'userProfile';
const CREATOR_PROFILE_COOKIE = 'creatorProfile';

export const UserProfileProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userProfile, setUserProfileState] = useState<UserProfile | null>(null);
  const [creatorProfile, setCreatorProfileState] = useState<CreatorProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useUser();

  // Load from cookies on mount
  useEffect(() => {
    const storedUser = getJsonCookie(USER_PROFILE_COOKIE);
    const storedCreator = getJsonCookie(CREATOR_PROFILE_COOKIE);
    if (storedUser) setUserProfileState(storedUser);
    if (storedCreator) setCreatorProfileState(storedCreator);
    setIsLoading(false);
  }, []);

  // Save to cookies when profile changes
  const setUserProfile = (profile: UserProfile | null) => {
    setUserProfileState(profile);
    if (profile) {
      setJsonCookie(USER_PROFILE_COOKIE, profile, 7);
    } else {
      deleteCookie(USER_PROFILE_COOKIE);
    }
  };

  const setCreatorProfile = (profile: CreatorProfile | null) => {
    setCreatorProfileState(profile);
    if (profile) {
      setJsonCookie(CREATOR_PROFILE_COOKIE, profile, 7);
    } else {
      deleteCookie(CREATOR_PROFILE_COOKIE);
    }
  };

  // Determine which profile to show based on user role
  const profile = user?.["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] === "Creator"
    ? creatorProfile
    : userProfile;

  return (
    <UserProfileContext.Provider 
      value={{ 
        profile,
        setUserProfile, 
        setCreatorProfile,
        isLoading, 
        setIsLoading 
      }}
    >
      {children}
    </UserProfileContext.Provider>
  );
};

export const useUserProfile = () => {
  const context = useContext(UserProfileContext);
  if (context === undefined) {
    throw new Error('useUserProfile must be used within a UserProfileProvider');
  }
  return context;
}; 