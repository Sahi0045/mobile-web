"use client"

import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

export default function TravelDashboard() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState("Upcoming")
  const [activeSidebarItem, setActiveSidebarItem] = useState("All Bookings")
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isGuest, setIsGuest] = useState(false)
  const [showLoginPopup, setShowLoginPopup] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    // Check if user is authenticated
    const authStatus = localStorage.getItem('isAuthenticated')
    if (authStatus !== 'true') {
      // Set as guest user instead of redirecting
      setIsGuest(true)
      // Show login popup after a short delay
      setTimeout(() => {
        setShowLoginPopup(true)
      }, 500)
    } else {
      setIsAuthenticated(true)
    }
  }, [navigate])

  const handleTabChange = (tab) => {
    setActiveTab(tab)
  }

  const handleSidebarItemChange = (item) => {
    setActiveSidebarItem(item)
    setIsMobileMenuOpen(false)
  }

  const handleLoginClick = () => {
    navigate('/login')
  }

  const closeLoginPopup = () => {
    setShowLoginPopup(false)
  }

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  // Allow rendering for both authenticated and guest users
  return (
    <div className="min-h-screen bg-[#f0f7fc]">
      {/* Enhanced Header */}
      <header className="sticky top-0 z-10 bg-white shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => navigate('/')}
                className="flex items-center text-[#006d92] hover:text-[#005a7a] transition"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 12H5M12 19l-7-7 7-7"/>
                </svg>
                <span className="ml-2 font-medium hidden sm:inline">Back to Home</span>
              </button>
              <h1 className="text-xl sm:text-2xl font-bold text-gray-800">My Trips</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              {isGuest && (
                <button
                  onClick={handleLoginClick}
                  className="px-4 py-1.5 rounded-md bg-[#0ea5e9] text-white hover:bg-[#0284c7] transition text-sm sm:text-base"
                >
                  Log In
                </button>
              )}
              <button
                onClick={toggleMobileMenu}
                className="md:hidden p-2 rounded-md hover:bg-gray-100"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
          {isGuest && (
            <p className="text-gray-600 mt-1 text-sm">You're viewing as a guest user</p>
          )}
        </div>
      </header>

      {/* Enhanced Filter tabs - Horizontal scroll on mobile */}
      <div className="sticky top-[73px] z-10 bg-white shadow-sm mb-4">
        <div className="container mx-auto px-4 sm:px-6 py-3">
          <div className="flex overflow-x-auto hide-scrollbar gap-2">
            {["Upcoming", "Cancelled", "Past", "Failed"].map((tab) => (
              <button
                key={tab}
                onClick={() => handleTabChange(tab)}
                className={`px-4 py-1.5 rounded-full text-sm whitespace-nowrap transition-all ${
                  activeTab === tab 
                    ? "bg-[#0ea5e9] text-white shadow-sm" 
                    : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row px-4 sm:px-6 gap-4 md:gap-6">
          {/* Enhanced Sidebar with mobile support */}
          <div className={`
            fixed md:relative inset-0 z-20 bg-white md:bg-transparent
            transition-transform duration-300 ease-in-out
            ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
          `}>
            <div className="w-64 bg-white rounded-lg p-4 shadow-sm h-full md:h-auto">
              <div className="flex items-center justify-between mb-6 pl-4">
                <div className="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                  <span className="text-lg font-semibold">My Trips</span>
                </div>
                <button 
                  onClick={toggleMobileMenu}
                  className="md:hidden p-2 hover:bg-gray-100 rounded-md"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <nav className="space-y-1">
                {["All Bookings", "Flights", "Cruise", "Packages"].map((item) => (
                  <button
                    key={item}
                    onClick={() => handleSidebarItemChange(item)}
                    className={`w-full text-left px-4 py-2.5 rounded-md transition-colors
                      ${activeSidebarItem === item 
                        ? "bg-[#d9e9f1] text-[#006d92] font-medium" 
                        : "hover:bg-gray-50"
                      }`}
                  >
                    {item}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Overlay for mobile menu */}
          {isMobileMenuOpen && (
            <div 
              className="fixed inset-0 bg-black bg-opacity-50 z-10 md:hidden"
              onClick={toggleMobileMenu}
            />
          )}

          {/* Enhanced main content */}
          <div className="flex-1 bg-white rounded-lg shadow-sm">
            <div className="flex flex-col items-center justify-center p-6 sm:p-8 md:p-10">
              <div className="w-48 h-48 sm:w-64 sm:h-64 flex items-center justify-center">
                <img
                  src="/images/empty-trips.svg" 
                  alt="No bookings illustration"
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    e.target.onerror = null
                    e.target.src = "https://via.placeholder.com/300?text=No+Bookings"
                  }}
                />
              </div>
              <h2 className="text-xl sm:text-2xl font-semibold mt-6 text-center">
                No {activeTab} Bookings
              </h2>
              <p className="text-gray-500 mt-3 text-center max-w-md">
                {isGuest ? 
                  "Sign in to view your trips and bookings." :
                  `You don't have any ${activeTab.toLowerCase()} trips.\nWhen you book a trip, it will appear here.`
                }
              </p>
              <div className="mt-8">
                {isGuest ? (
                  <button 
                    onClick={handleLoginClick} 
                    className="px-8 py-3 bg-[#0ea5e9] text-white rounded-md hover:bg-[#0284c7] transition shadow-sm"
                  >
                    Sign In
                  </button>
                ) : (
                  <button 
                    onClick={() => navigate('/')} 
                    className="px-8 py-3 bg-[#0ea5e9] text-white rounded-md hover:bg-[#0284c7] transition shadow-sm"
                  >
                    Book a Trip
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Login Popup */}
      {showLoginPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 shadow-xl">
            <div className="flex justify-end">
              <button 
                onClick={closeLoginPopup}
                className="text-gray-500 hover:text-gray-700 p-1"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="text-center mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-[#0ea5e9]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <h2 className="text-2xl font-bold mt-4">Please Login</h2>
              <p className="text-gray-600 mt-2">
                You need to be logged in to view your trips and manage your bookings.
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <button
                onClick={handleLoginClick}
                className="w-full py-3 bg-[#0ea5e9] text-white rounded-md hover:bg-[#0284c7] transition font-medium"
              >
                Login Now
              </button>
              <button
                onClick={closeLoginPopup}
                className="w-full py-3 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition font-medium"
              >
                Continue as Guest
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  )
}
