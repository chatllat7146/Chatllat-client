import React from 'react'
import { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from 'react-router-dom'
import { Toaster } from "react-hot-toast"
import { WalletProvider } from '../context/WalletContext'
import "./styles/style.min.css";
import "./styles/swiper-bundle.min.css";
import "./styles/fancybox.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import AgreementPage from "./pages/AgreementPage";
import Home from "./pages/Home";
import CreateAgreementPage from "./components/CreateAgreementPage";
import ViewAgreementPage from "./components/ViewAgreementPage";
import EditAgreementPage from './components/EditAgreementPage';
import SwapPage from './pages/SwapPage'; // Import SwapPage with embedded SwapFormModal

const App = () => {
  const [account, setAccount] = useState('');
  const [walletAddress, setWalletAddress] = useState("");
  const [walletBalance, setWalletBalance] = useState(null);

  useEffect(() => {
    // Wait for DOM to be fully ready
    const initPlugins = () => {
      if (window.Swiper) {
        const groupsSwiper = new window.Swiper(".groups-section-swiper", {
          slidesPerView: 3,
          loop: true,
          spaceBetween: 20,
          navigation: {
            prevEl: ".groups-section__buttons-prev",
            nextEl: ".groups-section__buttons-next",
          },
          breakpoints: {
            300: {
              slidesPerView: 1,
              spaceBetween: 10,
            },
            551: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            951: {
              slidesPerView: 3,
              spaceBetween: 20,
            },
          },
        });

        const pagesSwiper = new window.Swiper(".pages-section-swiper", {
          slidesPerView: 4,
          loop: true,
          spaceBetween: 18,
          autoplay: true,
          navigation: {
            prevEl: ".pages-section__buttons-prev",
            nextEl: ".pages-section__buttons-next",
          },
          breakpoints: {
            300: {
              slidesPerView: 2,
              spaceBetween: 10,
            },
            551: {
              slidesPerView: 3,
              spaceBetween: 18,
            },
            951: {
              slidesPerView: 4,
              spaceBetween: 18,
            },
          },
        });

        const newCoursesSwiper = new window.Swiper(".new-courses-swiper", {
          slidesPerView: 2,
          loop: true,
          spaceBetween: 20,
          navigation: {
            prevEl: ".new-courses__buttons-prev",
            nextEl: ".new-courses__buttons-next",
          },
          breakpoints: {
            300: {
              slidesPerView: 1,
              spaceBetween: 10,
            },
            551: {
              slidesPerView: 1,
              spaceBetween: 20,
            },
            751: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
          },
        });

        const shopSwiper = new window.Swiper(".shop-section-swiper", {
          slidesPerView: 3,
          loop: true,
          spaceBetween: 20,
          navigation: {
            prevEl: ".shop-section__buttons-prev",
            nextEl: ".shop-section__buttons-next",
          },
          breakpoints: {
            300: {
              slidesPerView: 1,
              spaceBetween: 10,
            },
            551: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            951: {
              slidesPerView: 3,
              spaceBetween: 20,
            },
          },
        });

        const newsSwiper = new window.Swiper(".news-section-swiper", {
          slidesPerView: 2,
          loop: true,
          spaceBetween: 20,
          navigation: {
            prevEl: ".news-section__buttons-prev",
            nextEl: ".news-section__buttons-next",
          },
          breakpoints: {
            300: {
              slidesPerView: 1,
              spaceBetween: 10,
            },
            551: {
              slidesPerView: 1,
              spaceBetween: 20,
            },
            951: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
          },
        });

        const productSwiper = new window.Swiper(".product-swiper", {
          slidesPerView: 4,
          direction: "vertical",
          freeMode: true,
          loop: true,
          spaceBetween: 8,
          navigation: {
            prevEl: ".product-swiper__prev",
            nextEl: ".product-swiper__next",
          },
          breakpoints: {
            301: {
              slidesPerView: 3,
              direction: "horizontal",
              freeMode: true,
              loop: true,
              spaceBetween: 8,
            },
            551: {
              slidesPerView: 4,
              direction: "vertical",
              freeMode: true,
              loop: true,
              spaceBetween: 8,
            },
          },
        });

      }

      if (window.Fancybox) {
        window.Fancybox.bind("[data-fancybox]", {
          // Optional settings
          animated: true,
          showclassName: "fancybox-zoomIn",
          hideclassName: "fancybox-zoomOut",
        });
      }

      if (window.TweenMax) {
        // Example animation for cursor
        const cursor = document.querySelector(".cursor");
        if (cursor) {
          window.TweenMax.to(cursor, 1.5, {
            scale: 1.2,
            repeat: -1,
            yoyo: true,
          });
        }
      }
    };

    // Ensure plugins run after a slight delay (DOM and scripts fully loaded)
    const timeoutId = setTimeout(initPlugins, 500);

    // Cleanup function to clear the timeout if the component unmounts
    return () => clearTimeout(timeoutId);
  }, []);
  
  return (
    <WalletProvider>
      <div className="App">
        {/* Enhanced Toaster with custom styling */}
        <Toaster 
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#1a1d24',
              color: '#fff',
              border: '1px solid #4b515a',
              borderRadius: '8px',
              fontSize: '14px'
            },
            success: {
              iconTheme: {
                primary: '#10B981',
                secondary: '#fff',
              },
              style: {
                border: '1px solid #10B981'
              }
            },
            error: {
              iconTheme: {
                primary: '#ef4444',
                secondary: '#fff',
              },
              style: {
                border: '1px solid #ef4444'
              }
            },
            loading: {
              iconTheme: {
                primary: '#F9D442',
                secondary: '#000',
              },
              style: {
                border: '1px solid #F9D442'
              }
            }
          }}
        />

        {/* Header Component */}
        <Header 
          setAccount={setAccount} 
          setWalletAddress={setWalletAddress} 
          setWalletBalance={setWalletBalance} 
        />

        {/* Main Routes */}
        <Routes>
          {/* Home Route */}
          <Route 
            path='/' 
            element={<Home />}
          />
          
          {/* Agreements Routes */}
          <Route 
            path='/agreements' 
            element={
              <AgreementPage 
                account={account} 
                walletAddress={walletAddress}
                walletBalance={walletBalance}
              />
            }
          />
          <Route 
            path="/create-agreement" 
            element={<CreateAgreementPage />} 
          />
          <Route 
            path="/view-agreement" 
            element={<ViewAgreementPage />} 
          />
          <Route 
            path="/view-agreement/:id" 
            element={<ViewAgreementPage />} 
          />
          <Route 
            path="/edit-agreement" 
            element={<EditAgreementPage />}
          />
          <Route 
            path="/edit-agreement/:agreementId" 
            element={<EditAgreementPage />} 
          />
          
          {/* Swap Route - Primary SwapFormModal Interface */}
          <Route 
            path="/swap" 
            element={
              <SwapPage 
                account={account}
                walletAddress={walletAddress}
                walletBalance={walletBalance}
              />
            } 
          />
          
          {/* 404 Not Found Route */}
          <Route 
            path="*" 
            element={
              <div style={{
                minHeight: '100vh',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                backgroundColor: '#0a0e13',
                textAlign: 'center',
                padding: '40px',
                fontFamily: 'Arial, sans-serif'
              }}>
                <div style={{
                  fontSize: '120px',
                  marginBottom: '24px',
                  background: 'linear-gradient(135deg, #7F5EB7, #F9D441)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  fontWeight: 'bold'
                }}>
                  404
                </div>
                <h1 style={{ 
                  fontSize: '32px', 
                  marginBottom: '16px',
                  fontWeight: 'bold'
                }}>
                  Page Not Found
                </h1>
                <p style={{ 
                  fontSize: '18px', 
                  color: '#888', 
                  marginBottom: '32px',
                  maxWidth: '400px',
                  lineHeight: '1.5'
                }}>
                  The page you're looking for doesn't exist. It might have been moved, deleted, or you entered the wrong URL.
                </p>
                <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'center' }}>
                  <a 
                    href="/" 
                    style={{
                      backgroundColor: '#F9D442',
                      color: '#000',
                      padding: '14px 28px',
                      borderRadius: '8px',
                      textDecoration: 'none',
                      fontWeight: 'bold',
                      fontSize: '16px',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = '#E6C03C';
                      e.target.style.transform = 'translateY(-2px)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = '#F9D442';
                      e.target.style.transform = 'translateY(0)';
                    }}
                  >
                    🏠 Go Home
                  </a>
                  <a 
                    href="/swap" 
                    style={{
                      backgroundColor: 'transparent',
                      color: '#7F5EB7',
                      padding: '14px 28px',
                      borderRadius: '8px',
                      textDecoration: 'none',
                      fontWeight: 'bold',
                      fontSize: '16px',
                      border: '2px solid #7F5EB7',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = '#7F5EB7';
                      e.target.style.color = '#fff';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = 'transparent';
                      e.target.style.color = '#7F5EB7';
                    }}
                  >
                    🔄 Try Swap
                  </a>
                </div>
              </div>
            } 
          />
        </Routes>

        {/* Footer Component */}
        <Footer />
      </div>
    </WalletProvider>
  )
}

export default App;