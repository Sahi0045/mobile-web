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
  }

  const handleLoginClick = () => {
    navigate('/login')
  }

  const closeLoginPopup = () => {
    setShowLoginPopup(false)
  }

  // Allow rendering for both authenticated and guest users
  return (
    <div className="min-h-screen bg-[#f0f7fc]">
      {/* Header with back button */}
      <header className="container mx-auto px-4 sm:px-6 py-4">
        <div className="flex justify-between items-center mb-4">
          <button 
            onClick={() => navigate('/')}
            className="flex items-center text-[#006d92] hover:text-[#005a7a] transition"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
            <span className="ml-2 font-medium">Back to Home</span>
          </button>
          
          {isGuest && (
            <button
              onClick={handleLoginClick}
              className="px-4 py-1.5 rounded-md bg-[#0ea5e9] text-white hover:bg-[#0284c7] transition"
            >
              Log In
            </button>
          )}
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">My Trips</h1>
        {isGuest && (
          <p className="text-gray-600 mt-1">You're viewing as a guest user</p>
        )}
      </header>

      {/* Filter tabs */}
      <div className="flex justify-end px-4 sm:px-6 py-4 gap-2">
        {["Upcoming", "Cancelled", "Past", "Failed"].map((tab) => (
          <button
            key={tab}
            onClick={() => handleTabChange(tab)}
            className={`px-4 py-1.5 rounded-full text-sm ${
              activeTab === tab ? "bg-[#0ea5e9] text-white" : "bg-white border border-gray-300 text-gray-700"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="flex flex-col md:flex-row px-4 sm:px-6 gap-4 md:gap-6">
        {/* Sidebar */}
        <div className="w-full md:w-64 bg-white rounded-lg p-4 shadow-sm">
          <div className="flex items-center gap-2 mb-6 pl-4">
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

          <nav className="space-y-1">
            {["All Bookings", "Flights", "Cruise", "Packages"].map((item) => (
              <button
                key={item}
                onClick={() => handleSidebarItemChange(item)}
                className={`w-full text-left px-4 py-2 rounded-md ${
                  activeSidebarItem === item ? "bg-[#d9e9f1]" : ""
                }`}
              >
                {item}
              </button>
            ))}
          </nav>
        </div>

        {/* Main content */}
        <div className="flex-1 bg-white rounded-lg p-6 shadow-sm">
          <div className="flex flex-col items-center justify-center py-16">
            <div className="w-64 h-64 flex items-center justify-center">
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
            <h2 className="text-xl font-semibold mt-4">No {activeTab} Bookings</h2>
            <p className="text-gray-500 mt-2 text-center">
              {isGuest ? 
                "Sign in to view your trips and bookings." :
                `You don't have any ${activeTab.toLowerCase()} trips.
                \nWhen you book a trip, it will appear here.`
              }
            </p>
            <div className="mt-6 flex gap-4">
              {isGuest ? (
                <button 
                  onClick={handleLoginClick} 
                  className="px-6 py-2 bg-[#0ea5e9] text-white rounded-md hover:bg-[#0284c7] transition"
                >
                  Sign In
                </button>
              ) : (
                <button 
                  onClick={() => navigate('/')} 
                  className="px-6 py-2 bg-[#0ea5e9] text-white rounded-md hover:bg-[#0284c7] transition"
                >
                  Book a Trip
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Login Popup */}
      {showLoginPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 shadow-xl">
            <div className="flex justify-end">
              <button 
                onClick={closeLoginPopup}
                className="text-gray-500 hover:text-gray-700"
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
                className="w-full py-2 bg-[#0ea5e9] text-white rounded-md hover:bg-[#0284c7] transition font-medium"
              >
                Login Now
              </button>
              <button
                onClick={closeLoginPopup}
                className="w-full py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition font-medium"
              >
                Continue as Guest
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
