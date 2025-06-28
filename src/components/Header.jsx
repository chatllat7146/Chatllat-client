import { useState, useEffect } from "react";
import React from "react";
import NotificationPopover from "./NotificationPopover";
import ProfileDrawer from "./ProfileDrawer";

// Avatar utilities
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
  '/avatars/avatar-10.png',
  '/avatars/avatar-11.png'
];

const getRandomAvatar = () => {
  const randomIndex = Math.floor(Math.random() * DEFAULT_AVATARS.length);
  return DEFAULT_AVATARS[randomIndex];
};

const getUserAvatar = (walletAddress) => {
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

function Header({ setWalletAddress, setWalletBalance }) {
  const [account, setAccount] = useState("");
  const [userAvatar, setUserAvatar] = useState(null);
  const [notifAnchorEl, setNotifAnchorEl] = useState(null);
  const [profileDrawerOpen, setProfileDrawerOpen] = useState(false);
  const [walletBalance, setLocalWalletBalance] = useState(null);
  

  const handleNotifClick = (event) => {
    console.log("Hello World!!!")
    setNotifAnchorEl(event.currentTarget);
  };

  const handleNotifClose = () => {
    setNotifAnchorEl(null);
  };

  // Check for existing wallet connection on component mount
  useEffect(() => {
    const checkExistingConnection = async () => {
      if (typeof window.ethereum !== "undefined") {
        try {
          // Check if already connected
          const accounts = await window.ethereum.request({
            method: "eth_accounts",
          });
          
          if (accounts.length > 0) {
            const walletAddress = accounts[0];
            setAccount(walletAddress);
            
            // Fetch and set wallet balance
            const ethBalance = await fetchETHBalance(walletAddress);
            const ethToUSDT = await fetchETHToUSDT();
            const usdtEquivalent = ethBalance * ethToUSDT;

            const balanceData = {
              eth: ethBalance,
              usdtEquivalent: usdtEquivalent,
              ethToUSDTRate: ethToUSDT,
            };

            setLocalWalletBalance(balanceData);

            if (setWalletAddress) {
              setWalletAddress(walletAddress);
            }

            if (setWalletBalance) {
              setWalletBalance(balanceData);
            }
          }
        } catch (error) {
          console.error("Error checking existing connection:", error);
        }
      }
    };

    checkExistingConnection();
  }, []); // Empty dependency array - runs only once on mount

  // Handle user profile when account changes
  useEffect(() => {
    const handleUserProfile = async () => {
      if (!account) {
        setUserAvatar(null);
        return;
      }

      try {
        // First check if user profile already exists
        const profileResponse = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/user/profile/${account}`);
        const profileResult = await profileResponse.json();

        if (profileResponse.ok && profileResult.success && profileResult.data?.user) {
          // User exists, use existing avatar
          const existingAvatar = profileResult.data.user.profileImage;
          setUserAvatar(existingAvatar);
          console.log(`Existing user ${account} loaded with avatar: ${existingAvatar}`);
        } else {
          // User doesn't exist, create new profile
          console.log(`New user ${account}, creating profile...`);

          // Step 1: Pick random avatar
          const randomAvatar = getUserAvatar(account);

          // Step 2: Convert image to File/Blob for upload
          const response = await fetch(randomAvatar);
          const blob = await response.blob();
          const fileName = randomAvatar.split('/').pop();
          const file = new File([blob], fileName, { type: blob.type });

          // Step 3: Upload to backend
          const formData = new FormData();
          formData.append('files', file);

          const uploadResponse = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/upload/file`, {
            method: "POST",
            body: formData,
          });

          const uploadResult = await uploadResponse.json();

          if (!uploadResponse.ok || !uploadResult.success) {
            throw new Error(uploadResult.message || "Upload failed");
          }

          // Step 4: Extract Cloudinary URL
          const avatarUrl = uploadResult.data.imgUrls[0];

          // Step 5: Create user profile
          const createProfileResponse = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/user/profile`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              walletId: account,
              avatar: avatarUrl,
            }),
          });

          const createProfileResult = await createProfileResponse.json();

          if (!createProfileResponse.ok || !createProfileResult.success) {
            throw new Error(createProfileResult.message || "Profile creation failed");
          }

          // Step 6: Update local state
          setUserAvatar(avatarUrl);
          console.log(`New user ${account} created with avatar: ${avatarUrl}`);
        }
      } catch (error) {
        console.error("Error handling user profile:", error);
        // Fallback to local avatar if upload/creation fails
        const fallbackAvatar = getUserAvatar(account);
        setUserAvatar(fallbackAvatar);
      }
    };

    handleUserProfile();
  }, [account]);

  // Helper function to convert Wei to Ether
  const weiToEther = (wei) => {
    return parseFloat(wei) / Math.pow(10, 18);
  };

  // Helper function to fetch ETH balance
  const fetchETHBalance = async (walletAddress) => {
    try {
      if (!window.ethereum) {
        throw new Error("MetaMask not connected");
      }

      const balance = await window.ethereum.request({
        method: "eth_getBalance",
        params: [walletAddress, "latest"],
      });

      return weiToEther(parseInt(balance, 16));
    } catch (error) {
      console.error("Error fetching ETH balance:", error);
      return 0;
    }
  };

  // Helper function to fetch ETH to USDT conversion rate
  const fetchETHToUSDT = async () => {
    try {
      const response = await fetch(
        "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd"
      );
      const data = await response.json();
      return data.ethereum?.usd || 0;
    } catch (error) {
      console.error("Error fetching ETH price:", error);
      return 0;
    }
  };

  // Simplified connectWallet function - removed duplicate avatar logic
  const connectWallet = async () => {
    if (typeof window.ethereum !== "undefined") {
      try {
        // Request account access
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        const walletAddress = accounts[0];
        setAccount(walletAddress); // This will trigger the useEffect to handle profile

        // Fetch wallet balance
        const ethBalance = await fetchETHBalance(walletAddress);
        const ethToUSDT = await fetchETHToUSDT();
        const usdtEquivalent = ethBalance * ethToUSDT;

        const balanceData = {
          eth: ethBalance,
          usdtEquivalent: usdtEquivalent,
          ethToUSDTRate: ethToUSDT,
        };

        setLocalWalletBalance(balanceData);

        if (setWalletAddress) {
          setWalletAddress(walletAddress);
        }

        if (setWalletBalance) {
          setWalletBalance(balanceData);
        }

        console.log(`Wallet connected: ${walletAddress}`);
        console.log(`ETH Balance: ${ethBalance.toFixed(6)} ETH`);
        console.log(`USDT Equivalent: $${usdtEquivalent.toFixed(2)}`);
      } catch (error) {
        console.error("Error connecting wallet:", error);
        alert("Error connecting to MetaMask. Please try again.");
      }
    } else {
      alert(
        "MetaMask is not installed. Please install MetaMask to connect your wallet."
      );
    }
  };

  const truncateAddress = (address) => {
    if (!address) return "";
    return address.slice(0, 6) + "..." + address.slice(-4);
  };

  return (
    <>
      <header className="header">
        <div className="container">
          <div className="header__inner">
            <a className="header__logo logo" href="/">
              <img className="logo__text" src="images/chatllat.png" alt="img" />
            </a>
            <div className="header__wrapper">
              <div className="header__lang lang">
                <div className="lang__top">
                  <svg
                    width="22"
                    height="16"
                    viewBox="0 0 22 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clipPath="url(#clip0_206_19996)">
                      <path d="M0 0H21.3333V16H0V0Z" fill="#012169" />
                      <path
                        d="M2.5 0L10.6333 6.03333L18.7333 0H21.3333V2.06667L13.3333 8.03333L21.3333 13.9667V16H18.6667L10.6667 10.0333L2.7 16H0V14L7.96667 8.06667L0 2.13333V0H2.5Z"
                        fill="white"
                      />
                      <path
                        d="M14.1333 9.36667L21.3333 14.6667V16L12.3 9.36667H14.1333ZM8 10.0333L8.2 11.2L1.8 16H0L8 10.0333ZM21.3333 0V0.1L13.0333 6.36667L13.1 4.9L19.6667 0H21.3333ZM0 0L7.96667 5.86667H5.96667L0 1.4V0Z"
                        fill="#C8102E"
                      />
                      <path
                        d="M8.03333 0V16H13.3667V0H8.03333ZM0 5.33333V10.6667H21.3333V5.33333H0Z"
                        fill="white"
                      />
                      <path
                        d="M0 6.43333V9.63333H21.3333V6.43333H0ZM9.1 0V16H12.3V0H9.1Z"
                        fill="#C8102E"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_206_19996">
                        <rect width="21.3333" height="16" rx="4" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                  <span>English</span>
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M2.99997 4.5L5.99997 7.5L8.99997 4.5"
                      stroke="white"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div className="lang__box lang-box">
                  <a className="lang-box__link" href="#">
                    <svg
                      width="22"
                      height="16"
                      viewBox="0 0 22 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clipPath="url(#clip0_206_19996)">
                        <path d="M0 0H21.3333V16H0V0Z" fill="#012169" />
                        <path
                          d="M2.5 0L10.6333 6.03333L18.7333 0H21.3333V2.06667L13.3333 8.03333L21.3333 13.9667V16H18.6667L10.6667 10.0333L2.7 16H0V14L7.96667 8.06667L0 2.13333V0H2.5Z"
                          fill="white"
                        />
                        <path
                          d="M14.1333 9.36667L21.3333 14.6667V16L12.3 9.36667H14.1333ZM8 10.0333L8.2 11.2L1.8 16H0L8 10.0333ZM21.3333 0V0.1L13.0333 6.36667L13.1 4.9L19.6667 0H21.3333ZM0 0L7.96667 5.86667H5.96667L0 1.4V0Z"
                          fill="#C8102E"
                        />
                        <path
                          d="M8.03333 0V16H13.3667V0H8.03333ZM0 5.33333V10.6667H21.3333V5.33333H0Z"
                          fill="white"
                        />
                        <path
                          d="M0 6.43333V9.63333H21.3333V6.43333H0ZM9.1 0V16H12.3V0H9.1Z"
                          fill="#C8102E"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_206_19996">
                          <rect width="21.3333" height="16" rx="4" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                    <span>English</span>
                  </a>
                  <a className="lang-box__link" href="#">
                    <svg
                      width="22"
                      height="16"
                      viewBox="0 0 22 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clipPath="url(#clip0_206_19999)">
                        <path
                          d="M0 10.6667H21.3333V16.0001H0V10.6667Z"
                          fill="#FFCE00"
                        />
                        <path d="M0 0H21.3333V5.33333H0V0Z" fill="black" />
                        <path
                          d="M0 5.33325H21.3333V10.6666H0V5.33325Z"
                          fill="#DD0000"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_206_19999">
                          <rect width="21.3333" height="16" rx="4" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                    <span>Deutsch</span>
                  </a>
                  <a className="lang-box__link" href="#">
                    <svg
                      width="22"
                      height="16"
                      viewBox="0 0 22 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clipPath="url(#clip0_206_20002)">
                        <path d="M0 0H21.3333V16H0V0Z" fill="#AA151B" />
                        <path d="M0 4H21.3333V12H0V4Z" fill="#F1BF00" />
                        <path
                          d="M4.24318 7.10994L4.21651 7.1066L4.18318 7.07327L4.15985 7.05994L4.13985 7.03327C4.13985 7.03327 4.11651 6.9966 4.12651 6.9666C4.13651 6.9366 4.15651 6.9266 4.17318 6.9166C4.18946 6.90996 4.20617 6.90439 4.22318 6.89994L4.25651 6.8866L4.29985 6.8766L4.31651 6.8666C4.32318 6.8666 4.33985 6.8666 4.34985 6.85994L4.38318 6.85327L4.43651 6.8566H4.59651C4.60985 6.8566 4.63651 6.8666 4.64318 6.86994C4.66516 6.87839 4.6874 6.88617 4.70985 6.89327C4.72651 6.8966 4.76318 6.90327 4.78318 6.91327C4.79985 6.92327 4.81318 6.9366 4.81985 6.9466L4.83651 6.97994V7.0166L4.81985 7.04327L4.79985 7.0766L4.77318 7.0966C4.77318 7.0966 4.75651 7.11327 4.73985 7.10994C4.72651 7.10994 4.57985 7.08327 4.48651 7.08327C4.39318 7.08327 4.24318 7.11327 4.24318 7.11327"
                          fill="#AD1519"
                        />
                        <path
                          d="M4.24318 7.10994L4.21651 7.1066L4.18318 7.07327L4.15985 7.05994L4.13985 7.03327C4.13985 7.03327 4.11651 6.9966 4.12651 6.9666C4.13651 6.9366 4.15651 6.9266 4.17318 6.9166C4.18946 6.90996 4.20617 6.90439 4.22318 6.89994L4.25651 6.8866L4.29985 6.8766L4.31651 6.8666C4.32318 6.8666 4.33985 6.8666 4.34985 6.85994L4.38318 6.85327L4.43651 6.8566H4.59651C4.60985 6.8566 4.63651 6.8666 4.64318 6.86994C4.66516 6.87839 4.6874 6.88617 4.70985 6.89327C4.72651 6.8966 4.76318 6.90327 4.78318 6.91327C4.79985 6.92327 4.81318 6.9366 4.81985 6.9466L4.83651 6.97994V7.0166L4.81985 7.04327L4.79985 7.0766L4.77318 7.0966C4.77318 7.0966 4.75651 7.11327 4.73985 7.10994C4.72651 7.10994 4.57985 7.08327 4.48651 7.08327C4.39318 7.08327 4.24318 7.11327 4.24318 7.11327V7.10994Z"
                          stroke="black"
                          strokeWidth="0.0375"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M4.44336 6.89991C4.44336 6.85658 4.46336 6.82324 4.48669 6.82324C4.51336 6.82324 4.53336 6.85658 4.53336 6.90324C4.53336 6.94658 4.51336 6.98324 4.48669 6.98324C4.46003 6.98324 4.44336 6.94658 4.44336 6.89991Z"
                          fill="#C8B100"
                        />
                        <path
                          d="M4.44336 6.89991C4.44336 6.85658 4.46336 6.82324 4.48669 6.82324C4.51336 6.82324 4.53336 6.85658 4.53336 6.90324C4.53336 6.94658 4.51336 6.98324 4.48669 6.98324C4.46003 6.98324 4.44336 6.94658 4.44336 6.89991Z"
                          stroke="black"
                          strokeWidth="0.0375"
                        />
                        <path
                          d="M4.4668 6.90008C4.4668 6.86008 4.4768 6.83008 4.49013 6.83008C4.50013 6.83008 4.51013 6.86341 4.51013 6.90008C4.51013 6.94341 4.50013 6.97341 4.49013 6.97341C4.4768 6.97341 4.47013 6.94008 4.47013 6.90008"
                          fill="#C8B100"
                        />
                        <path
                          d="M4.4668 6.90008C4.4668 6.86008 4.4768 6.83008 4.49013 6.83008C4.50013 6.83008 4.51013 6.86341 4.51013 6.90008C4.51013 6.94341 4.50013 6.97341 4.49013 6.97341C4.4768 6.97341 4.47013 6.94008 4.47013 6.90008H4.4668Z"
                          stroke="black"
                          strokeWidth="0.0375"
                        />
                        <path
                          d="M4.45996 6.81671C4.45996 6.80337 4.47329 6.79004 4.48663 6.79004C4.49996 6.79004 4.51996 6.80337 4.51996 6.81671C4.51996 6.83337 4.50329 6.84671 4.48663 6.84671C4.46996 6.84671 4.45996 6.83337 4.45996 6.81671Z"
                          fill="#C8B100"
                        />
                        <path
                          d="M4.50988 6.80665V6.82665H4.46321V6.80665H4.47988V6.76665H4.45654V6.74665H4.47988V6.72998H4.49654V6.74665H4.51654V6.76665H4.49654V6.80665H4.50988Z"
                          fill="#C8B100"
                        />
                        <path
                          d="M4.50988 6.80665V6.82665H4.46321V6.80665H4.47988V6.76665H4.45654V6.74665H4.47988V6.72998H4.49654V6.74665H4.51654V6.76665H4.49654V6.80665H4.50988Z"
                          stroke="black"
                          strokeWidth="0.0375"
                        />
                        <path
                          d="M4.53011 6.80665V6.82665H4.44678V6.80665H4.48011V6.76665H4.45678V6.74665H4.48011V6.72998H4.49678V6.74665H4.51678V6.76665H4.49678V6.80665H4.53011Z"
                          fill="#C8B100"
                        />
                        <path
                          d="M4.53011 6.80665V6.82665H4.44678V6.80665H4.48011V6.76665H4.45678V6.74665H4.48011V6.72998H4.49678V6.74665H4.51678V6.76665H4.49678V6.80665H4.53011Z"
                          stroke="black"
                          strokeWidth="0.0375"
                        />
                        <path
                          d="M4.49654 6.79004C4.50988 6.79337 4.51654 6.80337 4.51654 6.81671C4.51654 6.83337 4.50321 6.84671 4.48988 6.84671C4.47654 6.84671 4.45654 6.83337 4.45654 6.81671C4.45654 6.80337 4.46654 6.79337 4.47988 6.79004"
                          stroke="black"
                          strokeWidth="0.0375"
                        />
                        <path
                          d="M4.49021 7.10673H4.33355V7.07006L4.32355 7.03006L4.31688 6.98006C4.27355 6.9234 4.23355 6.88673 4.22021 6.89673C4.22355 6.88673 4.22688 6.87673 4.23688 6.8734C4.27355 6.85006 4.35355 6.90673 4.41022 6.9934L4.42688 7.01673H4.55355L4.56688 6.9934C4.62688 6.9034 4.70355 6.85006 4.74021 6.8734C4.75021 6.87673 4.75355 6.88673 4.75688 6.89673C4.74355 6.88673 4.70355 6.9234 4.66022 6.98006L4.65355 7.03006L4.64688 7.07006L4.64355 7.10673H4.48688"
                          fill="#C8B100"
                        />
                        <path
                          d="M4.49021 7.10673H4.33355V7.07006L4.32355 7.03006L4.31688 6.98006C4.27355 6.9234 4.23355 6.88673 4.22021 6.89673C4.22355 6.88673 4.22688 6.87673 4.23688 6.8734C4.27355 6.85006 4.35355 6.90673 4.41022 6.9934L4.42688 7.01673H4.55355L4.56688 6.9934C4.62688 6.9034 4.70355 6.85006 4.74021 6.8734C4.75021 6.87673 4.75355 6.88673 4.75688 6.89673C4.74355 6.88673 4.70355 6.9234 4.66022 6.98006L4.65355 7.03006L4.64688 7.07006L4.64355 7.10673H4.48688H4.49021Z"
                          stroke="black"
                          strokeWidth="0.0375"
                        />
                        <path
                          d="M4.22656 6.89343C4.2599 6.87676 4.32656 6.93009 4.3799 7.01343M4.74656 6.89343C4.7199 6.87676 4.65323 6.93009 4.59656 7.01343"
                          stroke="black"
                          strokeWidth="0.0375"
                        />
                        <path
                          d="M4.25983 7.17655L4.24316 7.14322C4.40343 7.09842 4.5729 7.09842 4.73316 7.14322L4.7165 7.16989C4.7125 7.17851 4.70916 7.18743 4.7065 7.19655C4.63485 7.17701 4.56074 7.16803 4.4865 7.16989C4.39983 7.16989 4.31316 7.17989 4.26983 7.19655L4.25983 7.17655Z"
                          stroke="black"
                          strokeWidth="0.0375"
                        />
                        <path
                          d="M4.48643 7.25659C4.56643 7.25659 4.6531 7.24326 4.6831 7.23659C4.7031 7.22992 4.71643 7.21992 4.71643 7.20992C4.71643 7.20326 4.70977 7.19992 4.7031 7.19659C4.65643 7.17992 4.56977 7.16992 4.48643 7.16992C4.4031 7.16992 4.31977 7.17992 4.2731 7.19659C4.26643 7.19659 4.2631 7.20325 4.25977 7.20659C4.25977 7.21992 4.26977 7.22992 4.2931 7.23659C4.32643 7.24326 4.40977 7.25659 4.48643 7.25659Z"
                          stroke="black"
                          strokeWidth="0.0375"
                        />
                        <path
                          d="M4.7369 7.10656L4.72023 7.08989C4.72023 7.08989 4.70023 7.09989 4.6769 7.09656C4.6569 7.09656 4.6469 7.06322 4.6469 7.06322C4.6469 7.06322 4.62357 7.08656 4.60357 7.08656C4.58023 7.08656 4.57023 7.06656 4.57023 7.06656C4.57023 7.06656 4.5469 7.08322 4.5269 7.07989C4.5069 7.07989 4.4869 7.05322 4.4869 7.05322C4.4869 7.05322 4.4669 7.07989 4.4469 7.07989C4.4269 7.08322 4.41357 7.06322 4.41357 7.06322C4.41357 7.06322 4.40023 7.08322 4.3769 7.08656C4.35357 7.08989 4.33023 7.06656 4.33023 7.06656C4.33023 7.06656 4.31357 7.08989 4.2969 7.09989C4.28023 7.09989 4.2569 7.08656 4.2569 7.08656L4.25023 7.10322L4.24023 7.10656L4.2469 7.12322C4.32519 7.10247 4.40592 7.09238 4.4869 7.09322C4.5869 7.09322 4.67023 7.10656 4.73357 7.12656L4.74023 7.10656H4.7369Z"
                          stroke="black"
                          strokeWidth="0.0375"
                        />
                        <path
                          d="M4.49009 7.02344H4.49676C4.49586 7.02784 4.49586 7.03237 4.49676 7.03677C4.49676 7.05677 4.51009 7.0701 4.53009 7.0701C4.53744 7.07044 4.5447 7.06833 4.55073 7.06411C4.55676 7.05989 4.56122 7.05379 4.56342 7.04677L4.57009 7.03677V7.0501C4.57342 7.06677 4.59009 7.07677 4.60676 7.07677C4.62676 7.07677 4.64009 7.06344 4.64009 7.04344V7.0401L4.65342 7.02677L4.66009 7.04344C4.65796 7.04756 4.65682 7.05213 4.65676 7.05677C4.65676 7.06561 4.66027 7.07409 4.66652 7.08034C4.67277 7.08659 4.68125 7.0901 4.69009 7.0901C4.70342 7.0901 4.71342 7.08344 4.72009 7.07344L4.72676 7.06677V7.07677C4.72676 7.08677 4.73009 7.09677 4.74009 7.1001C4.74009 7.1001 4.75342 7.1001 4.77342 7.08677L4.79676 7.06344V7.07677C4.79676 7.07677 4.78009 7.10344 4.76342 7.1101C4.75676 7.11677 4.74676 7.12344 4.73676 7.1201C4.72676 7.1201 4.71676 7.1101 4.71342 7.1001C4.70676 7.10677 4.70009 7.10677 4.69009 7.10677C4.67009 7.10677 4.65009 7.09677 4.64342 7.0801C4.63342 7.0901 4.62009 7.09677 4.60676 7.09677C4.59904 7.09653 4.59147 7.09462 4.58456 7.09117C4.57765 7.08771 4.57158 7.0828 4.56676 7.07677C4.55752 7.08493 4.54574 7.08965 4.53342 7.0901C4.52514 7.09036 4.51692 7.08869 4.5094 7.08522C4.50187 7.08175 4.49526 7.07657 4.49009 7.0701C4.48558 7.07622 4.47981 7.0813 4.47317 7.08501C4.46653 7.08871 4.45918 7.09096 4.4516 7.09159C4.44403 7.09222 4.4364 7.09123 4.42925 7.08867C4.42209 7.08611 4.41555 7.08206 4.41009 7.07677C4.40527 7.0828 4.39919 7.08771 4.39229 7.09117C4.38538 7.09462 4.37781 7.09653 4.37009 7.09677C4.36316 7.09669 4.35632 7.09516 4.35001 7.09229C4.34369 7.08942 4.33805 7.08527 4.33342 7.0801C4.32676 7.09677 4.30676 7.10677 4.28676 7.10677C4.28009 7.10677 4.27009 7.10677 4.26342 7.1001C4.26009 7.1101 4.25009 7.1201 4.24009 7.1201C4.23009 7.1201 4.22009 7.1201 4.21009 7.11344L4.17676 7.0801L4.18009 7.06344L4.20676 7.08677C4.22342 7.1001 4.23676 7.1001 4.23676 7.1001C4.24676 7.1001 4.25009 7.08677 4.25009 7.07677V7.06677L4.25676 7.07344C4.26342 7.08344 4.27342 7.0901 4.28676 7.0901C4.2956 7.0901 4.30408 7.08659 4.31033 7.08034C4.31658 7.07409 4.32009 7.06561 4.32009 7.05677C4.32109 7.05238 4.32109 7.04783 4.32009 7.04344V7.02677L4.33342 7.0401C4.33334 7.04121 4.33334 7.04233 4.33342 7.04344C4.33342 7.06344 4.35009 7.07677 4.36676 7.07677C4.38676 7.07677 4.40009 7.06677 4.40342 7.04677V7.03677L4.41009 7.04677C4.41676 7.0601 4.43009 7.0701 4.44342 7.0701C4.46676 7.0701 4.48009 7.05677 4.48009 7.03677C4.48059 7.03346 4.48059 7.03009 4.48009 7.02677H4.49009"
                          fill="#C8B100"
                        />
                        <path
                          d="M4.49009 7.02344H4.49676C4.49586 7.02784 4.49586 7.03237 4.49676 7.03677C4.49676 7.05677 4.51009 7.0701 4.53009 7.0701C4.53744 7.07044 4.5447 7.06833 4.55073 7.06411C4.55676 7.05989 4.56122 7.05379 4.56342 7.04677L4.57009 7.03677V7.0501C4.57342 7.06677 4.59009 7.07677 4.60676 7.07677C4.62676 7.07677 4.64009 7.06344 4.64009 7.04344V7.0401L4.65342 7.02677L4.66009 7.04344C4.65796 7.04756 4.65682 7.05213 4.65676 7.05677C4.65676 7.06561 4.66027 7.07409 4.66652 7.08034C4.67277 7.08659 4.68125 7.0901 4.69009 7.0901C4.70342 7.0901 4.71342 7.08344 4.72009 7.07344L4.72676 7.06677V7.07677C4.72676 7.08677 4.73009 7.09677 4.74009 7.1001C4.74009 7.1001 4.75342 7.1001 4.77342 7.08677L4.79676 7.06344V7.07677C4.79676 7.07677 4.78009 7.10344 4.76342 7.1101C4.75676 7.11677 4.74676 7.12344 4.73676 7.1201C4.72676 7.1201 4.71676 7.1101 4.71342 7.1001C4.70676 7.10677 4.70009 7.10677 4.69009 7.10677C4.67009 7.10677 4.65009 7.09677 4.64342 7.0801C4.63342 7.0901 4.62009 7.09677 4.60676 7.09677C4.59904 7.09653 4.59147 7.09462 4.58456 7.09117C4.57765 7.08771 4.57158 7.0828 4.56676 7.07677C4.55752 7.08493 4.54574 7.08965 4.53342 7.0901C4.52514 7.09036 4.51692 7.08869 4.5094 7.08522C4.50187 7.08175 4.49526 7.07657 4.49009 7.0701C4.48558 7.07622 4.47981 7.0813 4.47317 7.08501C4.46653 7.08871 4.45918 7.09096 4.4516 7.09159C4.44403 7.09222 4.4364 7.09123 4.42925 7.08867C4.42209 7.08611 4.41555 7.08206 4.41009 7.07677C4.40527 7.0828 4.39919 7.08771 4.39229 7.09117C4.38538 7.09462 4.37781 7.09653 4.37009 7.09677C4.36316 7.09669 4.35632 7.09516 4.35001 7.09229C4.34369 7.08942 4.33805 7.08527 4.33342 7.0801C4.32676 7.09677 4.30676 7.10677 4.28676 7.10677C4.28009 7.10677 4.27009 7.10677 4.26342 7.1001C4.26009 7.1101 4.25009 7.1201 4.24009 7.1201C4.23009 7.1201 4.22009 7.1201 4.21009 7.11344L4.17676 7.0801L4.18009 7.06344L4.20676 7.08677C4.22342 7.1001 4.23676 7.1001 4.23676 7.1001C4.24676 7.1001 4.25009 7.08677 4.25009 7.07677V7.06677L4.25676 7.07344C4.26342 7.08344 4.27342 7.0901 4.28676 7.0901C4.2956 7.0901 4.30408 7.08659 4.31033 7.08034C4.31658 7.07409 4.32009 7.06561 4.32009 7.05677C4.32109 7.05238 4.32109 7.04783 4.32009 7.04344V7.02677L4.33342 7.0401C4.33334 7.04121 4.33334 7.04233 4.33342 7.04344C4.33342 7.06344 4.35009 7.07677 4.36676 7.07677C4.38676 7.07677 4.40009 7.06677 4.40342 7.04677V7.03677L4.41009 7.04677C4.41676 7.0601 4.43009 7.0701 4.44342 7.0701C4.46676 7.0701 4.48009 7.05677 4.48009 7.03677C4.48059 7.03346 4.48059 7.03009 4.48009 7.02677H4.49009"
                          fill="#C8B100"
                        />
                      </g>
                    </svg>
                    <span>Español</span>
                  </a>
                </div>
              </div>
              <form className="header__search search" action="#">
                <button className="search__btn" type="button">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M11 19C15.4182 19 19 15.4183 19 11C19 6.58172 15.4182 3 11 3C6.58169 3 2.99997 6.58172 2.99997 11C2.99997 15.4183 6.58169 19 11 19Z"
                      stroke="white"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M21 21L16.65 16.65"
                      stroke="white"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
                <input
                  className="search__input"
                  type="text"
                  placeholder="Search..."
                />
              </form>
              <div className="header__user-nav user-nav">
                <a className="user-nav__link" href="">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7.99997 10H16M7.99997 14H12M21 12C21 16.9706 16.9705 21 12 21C10.843 21 9.73698 20.7817 8.72092 20.384C8.33906 20.2345 7.92595 20.1704 7.52157 20.2385L3.69273 20.8833C3.35371 20.9404 3.05954 20.6463 3.11664 20.3072L3.76144 16.4784C3.82954 16.074 3.76544 15.6609 3.61598 15.279C3.21829 14.263 2.99997 13.157 2.99997 12C2.99997 7.02944 7.02941 3 12 3C16.9705 3 21 7.02944 21 12Z"
                      stroke="white"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                  <span>1</span>
                </a>
                <div
                  className="user-nav__link cursor-pointer relative"
                  onClick={handleNotifClick}
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M5.99997 8C5.99997 6.4087 6.63211 4.88258 7.75733 3.75736C8.88255 2.63214 10.4087 2 12 2C13.5913 2 15.1174 2.63214 16.2426 3.75736C17.3678 4.88258 18 6.4087 18 8C18 15 21 17 21 17H2.99997C2.99997 17 5.99997 15 5.99997 8Z"
                      stroke="white"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M10.3 21C10.4673 21.3044 10.7134 21.5583 11.0124 21.7352C11.3115 21.912 11.6525 22.0053 12 22.0053C12.3474 22.0053 12.6884 21.912 12.9875 21.7352C13.2865 21.5583 13.5326 21.3044 13.7 21"
                      stroke="white"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span>7</span>
                  <NotificationPopover
                    anchorEl={notifAnchorEl}
                    onClose={handleNotifClose}
                  />
                </div>

                <a className="user-nav__link" href="#">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M8.99998 10V6C8.99998 4.34315 10.3431 3 12 3C13.6568 3 15 4.34315 15 6V10M4.99998 18H19M6.14793 22H17.852C19.0127 22 19.9296 21.0152 19.8469 19.8575L19.1327 9.8575C19.0579 8.81089 18.187 8 17.1377 8H6.86222C5.81294 8 4.94206 8.81089 4.8673 9.85751L4.15301 19.8575C4.07032 21.0152 4.98725 22 6.14793 22Z"
                      stroke="white"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                  <span>4</span>
                </a>
              </div>
            </div>
            {/* Wallet Section with Random Avatar Support */}
            {account ? (
              <div
                className="wallet-connected"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 15px",
                  minWidth: "160px",
                  height: "45px",
                  color: "white",
                  cursor: "pointer",
                }}
                onClick={() => {
                  setProfileDrawerOpen(true);
                }}
              >
                {/* Avatar - Using random assigned avatar */}
                <div
                  style={{
                    width: "45px",
                    height: "45px",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    overflow: "hidden",
                    backgroundColor: "#f3f4f6",
                  }}
                >
                  {userAvatar ? (
                    <img
                      src={userAvatar}
                      alt="User avatar"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover"
                      }}
                      onError={(e) => {
                        // Fallback to initials if image fails to load
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                  ) : null}
                  {/* Fallback initials div (hidden by default) */}
                  <div
                    style={{
                      display: userAvatar ? 'none' : 'flex',
                      width: "100%",
                      height: "100%",
                      backgroundColor: "#4F46E5",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "white",
                      fontWeight: "bold",
                      fontSize: "14px"
                    }}
                  >
                    {account.slice(2, 4).toUpperCase()}
                  </div>
                </div>
              </div>
            ) : (
              <button
                onClick={connectWallet}
                className="connect-wallet-button"
                style={{
                  backgroundColor: "transparent",
                  color: "white",
                  padding: "10px 20px",
                  border: "2px solid white",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontSize: "16px",
                  fontWeight: "500",
                  margin: "0 15px",
                  transition: "all 0.3s ease",
                  boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  minWidth: "160px",
                  height: "40px",
                }}
                onMouseOver={(e) => {
                  e.target.style.backgroundColor = "white";
                  e.target.style.color = "black";
                }}
                onMouseOut={(e) => {
                  e.target.style.backgroundColor = "transparent";
                  e.target.style.color = "white";
                }}
                aria-label="Connect Wallet"
              >
                Connect Wallet
              </button>
            )}
            <button className="header__burger burger" type="button">
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
      </header>

      {/* Profile Drawer */}
      <ProfileDrawer
        open={profileDrawerOpen}
        onClose={() => setProfileDrawerOpen(false)}
        userAvatar={userAvatar}
        account={account}
        walletBalance={walletBalance}
      />
    </>
  );
}

export default Header;