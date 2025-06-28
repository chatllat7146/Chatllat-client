// src/utils/avatarUtils.js

// Array of avatar image paths (stored in public/avatars/)
const DEFAULT_AVATARS = [
  '/avatars/avatar-1.png',
  '/avatars/avatar-2.png', 
  '/avatars/avatar-3.png',
  '/avatars/avatar-4.png',
  '/avatars/avatar-5.png',
  '/avatars/avatar-6.png',
  '/avatars/avatar-7.png',
  '/avatars/avatar-8.png',
  '/avatars/avatar-9.png',
  '/avatars/avatar-10.png'
];

// Function to get a random avatar
export const getRandomAvatar = () => {
  const randomIndex = Math.floor(Math.random() * DEFAULT_AVATARS.length);
  return DEFAULT_AVATARS[randomIndex];
};

// Function to get user's assigned avatar
export const getUserAvatar = (walletAddress) => {
  const storageKey = `userAvatar_${walletAddress}`;
  let userAvatar = localStorage.getItem(storageKey);
  
  if (!userAvatar) {
    // First time connecting - assign random avatar
    userAvatar = getRandomAvatar();
    localStorage.setItem(storageKey, userAvatar);
    console.log(`New user ${walletAddress} assigned avatar: ${userAvatar}`);
  }
  
  return userAvatar;
};

// Optional: Function to reset user's avatar
export const resetUserAvatar = (walletAddress) => {
  const storageKey = `userAvatar_${walletAddress}`;
  localStorage.removeItem(storageKey);
  console.log(`Avatar reset for user: ${walletAddress}`);
};

// Optional: Function to manually assign specific avatar
export const assignSpecificAvatar = (walletAddress, avatarIndex) => {
  if (avatarIndex >= 0 && avatarIndex < DEFAULT_AVATARS.length) {
    const storageKey = `userAvatar_${walletAddress}`;
    const avatar = DEFAULT_AVATARS[avatarIndex];
    localStorage.setItem(storageKey, avatar);
    console.log(`User ${walletAddress} assigned specific avatar: ${avatar}`);
    return avatar;
  }
  return null;
};