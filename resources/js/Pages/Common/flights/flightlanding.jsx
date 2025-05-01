import React from "react"
import { useNavigate } from "react-router-dom"
import FlightSearchForm from "./flight-search-form"
import PopularDestinations from "./popular-destination"
import CheapestFlights from "./cheapest-flight"
import SubscribeSection from "./subscribe-section"
import Navbar from "../Navbar"
import Footer from "../Footer"
import axios from 'axios';
// Importing data from the data file
import { heroImage } from "./data.js"

export default function FlightLanding() {
  const navigate = useNavigate();

  // const handleSearch = (formData) => {

    
  //   // Navigate to search page with query parameters
  //   navigate('/flights/search', { state: { searchData: formData } });
  // };

  // const handleSearch = async (formData) => {
  //   // if (!validateForm()) return;
  
  //   try {
  //     const response = await fetch("http://localhost:5001/api/flights/search", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(formData),
  //     });
  
  //     const data = await response.json();
  
  //     if (onSearch) {
  //       navigate('/flights/search', { state: { searchData: data } });
  //       onSearch(data);
  //     } else {
  //       console.log("Flight search result:", data);
  //     }
  
  //   } catch (error) {
  //     console.error("Flight search failed:", error);
  //   }
  // };
  
  // 

  // Map city names to IATA codes
  const cityToIATACode = {
    // Indian Cities
    "New Delhi": "DEL",
    "Mumbai": "BOM",
    "Bangalore": "BLR",
    "Chennai": "MAA",
    "Hyderabad": "HYD",
    "Kolkata": "CCU",
    "Ahmedabad": "AMD",
    "Pune": "PNQ",
    "Goa": "GOI",
    "Jaipur": "JAI",
    "Lucknow": "LKO",
    "Kochi": "COK",
    "Thiruvananthapuram": "TRV",
    "Guwahati": "GAU",
    "Varanasi": "VNS",
    "Amritsar": "ATQ",
    "Bhopal": "BHO",
    "Indore": "IDR",
    "Patna": "PAT",
    "Bhubaneswar": "BBI",
    "Nagpur": "NAG",
    "Vadodara": "BDQ",
    "Surat": "STV",
    "Visakhapatnam": "VTZ",
    "Coimbatore": "CJB",
    "Mangalore": "IXE",
    "Madurai": "IXM",
    "Tiruchirappalli": "TRZ",
    "Dehradun": "DED",
    "Srinagar": "SXR",
    "Chandigarh": "IXC",
    "Aurangabad": "IXU",
    "Jammu": "IXJ",
    "Ranchi": "IXR",
    "Bagdogra": "IXB",
    "Port Blair": "IXZ",
    "Agartala": "IXA",
    "Allahabad": "IXD",
    "Belgaum": "IXG",
    "Kailashahar": "IXH",
    "Lilabari": "IXI",
    "Keshod": "IXK",
    "Leh": "IXL",
    "Khowai": "IXN",
    "Pathankot": "IXP",
    "Kamalpur": "IXQ",
    "Silchar": "IXS",
    "Pasighat": "IXT",
    "Along": "IXV",
    "Jamshedpur": "IXW",
    "Kandla": "IXY",

    // US Cities
    "New York": "JFK",
    "Los Angeles": "LAX",
    "Chicago": "ORD",
    "San Francisco": "SFO",
    "Miami": "MIA",
    "Dallas": "DFW",
    "Boston": "BOS",
    "Seattle": "SEA",
    "Washington DC": "IAD",
    "Atlanta": "ATL",
    "Houston": "IAH",
    "Las Vegas": "LAS",
    "Orlando": "MCO",
    "Denver": "DEN",
    "Philadelphia": "PHL",
    "Newark": "EWR",
    "Detroit": "DTW",
    "Minneapolis": "MSP",
    "Charlotte": "CLT",
    "Phoenix": "PHX",
    "Salt Lake City": "SLC",
    "Baltimore": "BWI",
    "San Diego": "SAN",
    "Tampa": "TPA",
    "Portland": "PDX",
    "Honolulu": "HNL",
    "Austin": "AUS",
    "Nashville": "BNA",
    "New Orleans": "MSY",
    "Pittsburgh": "PIT",

    // UK Cities
    "London": "LHR",
    "Manchester": "MAN",
    "Birmingham": "BHX",
    "Glasgow": "GLA",
    "Edinburgh": "EDI",
    "Bristol": "BRS",
    "Newcastle": "NCL",
    "Liverpool": "LPL",
    "Leeds": "LBA",
    "Belfast": "BFS",
    "London Luton": "LTN",
    "London Stansted": "STN",
    "London Gatwick": "LGW",
    "London City": "LCY",
    "East Midlands": "EMA",
    "Southampton": "SOU",
    "Aberdeen": "ABZ",
    "Belfast City": "BHD",
    "Cardiff": "CWL",
    "Doncaster": "DSA",
    "Exeter": "EXT",
    "Humberside": "HUY",
    "Inverness": "INV",
    "Norwich": "NWI",
    "Durham": "MME",

    // Middle East
    "Dubai": "DXB",
    "Abu Dhabi": "AUH",
    "Doha": "DOH",
    "Riyadh": "RUH",
    "Jeddah": "JED",
    "Muscat": "MCT",
    "Kuwait": "KWI",
    "Bahrain": "BAH",
    "Beirut": "BEY",
    "Amman": "AMM",

    // Asia Pacific
    "Singapore": "SIN",
    "Bangkok": "BKK",
    "Hong Kong": "HKG",
    "Tokyo": "HND",
    "Seoul": "ICN",
    "Shanghai": "PVG",
    "Beijing": "PEK",
    "Sydney": "SYD",
    "Melbourne": "MEL",
    "Auckland": "AKL",
    "Kuala Lumpur": "KUL",
    "Jakarta": "CGK",
    "Manila": "MNL",
    "Ho Chi Minh City": "SGN",
    "Hanoi": "HAN",
    "Taipei": "TPE",
    "Osaka": "KIX",
    "Nagoya": "NGO",
    "Fukuoka": "FUK",
    "Sapporo": "CTS",

    // Europe
    "Paris": "CDG",
    "Frankfurt": "FRA",
    "Amsterdam": "AMS",
    "Rome": "FCO",
    "Madrid": "MAD",
    "Istanbul": "IST",
    "Munich": "MUC",
    "Zurich": "ZRH",
    "Vienna": "VIE",
    "Brussels": "BRU",
    "Copenhagen": "CPH",
    "Stockholm": "ARN",
    "Oslo": "OSL",
    "Helsinki": "HEL",
    "Dublin": "DUB",
    "Lisbon": "LIS",
    "Barcelona": "BCN",
    "Milan": "MXP",
    "Venice": "VCE",
    "Prague": "PRG",
    "Budapest": "BUD",
    "Warsaw": "WAW",
    "Athens": "ATH",
    "Geneva": "GVA",
    "Lyon": "LYS",
    "Nice": "NCE",
    "Berlin": "BER",
    "Hamburg": "HAM",
    "Cologne": "CGN",
    "Düsseldorf": "DUS"
  };

  const handleSearch = async (formData) => {
    try {
      // Convert city names to IATA codes
      const fromCode = cityToIATACode[formData.from] || formData.from;
      const toCode = cityToIATACode[formData.to] || formData.to;

      console.log('Converting cities to IATA codes:', {
        from: `${formData.from} -> ${fromCode}`,
        to: `${formData.to} -> ${toCode}`
      });

      const searchData = {
        ...formData,
        from: fromCode,
        to: toCode
      };

      console.log('Sending search request with data:', searchData);

      // Save search data before making API request
      // This ensures we can navigate even if the API fails
      const requestData = {
        searchData: searchData
      };

      try {
        const response = await axios.post("https://jettter.vercel.app/api/flights/search", searchData, {
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          withCredentials: false,
          timeout: 10000 // 10 second timeout
        });
        
        console.log('Got response:', response);
        
        const data = response.data;
        if (data && data.success !== false) {
          console.log('Search successful, navigating to results with API response');
          navigate('/flights/search', { 
            state: { 
              searchData: searchData, // Original search parameters
              apiResponse: data // API response
            } 
          });
        } else {
          console.log("No flight results found or API error:", data?.error || 'Unknown error');
          // Navigate anyway, and let the search page handle it
          navigate('/flights/search', { state: requestData });
        }
      } catch (error) {
        console.error('Search API error:', error.message);
        // Navigate to search page even if API fails
        // The search page will retry the search
        navigate('/flights/search', { state: requestData });
      }
    } catch (error) {
      console.error('Search function error:', error.message);
      // If any other error occurs, still try to navigate
      navigate('/flights/search', { 
        state: { 
          searchData: {
            ...formData,
            from: cityToIATACode[formData.from] || formData.from,
            to: cityToIATACode[formData.to] || formData.to
          }
        } 
      });
    }
  };

  // Handle navigation to destination search
  const handleExploreDestinations = () => {
    // Navigate to search page with default search parameters
    navigate('/flights/search', { 
      state: { 
        searchData: {
          from: "New Delhi", // Default source
          to: "",  // Empty destination for exploring all
          tripType: "oneWay",
          departDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 1 week from today
          returnDate: "",
          travelers: "1"
        } 
      } 
    });
  };

  // Handle book flight for a specific destination
  const handleBookFlight = (destination) => {
    // Create a search request with the selected destination
    const searchData = {
      from: "New Delhi", // Default source
      to: destination,
      tripType: "oneWay",
      departDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 1 week from today
      returnDate: "",
      travelers: "1"
    };
    
    // Get IATA codes for the cities
    const fromCode = cityToIATACode[searchData.from] || searchData.from;
    const toCode = cityToIATACode[searchData.to] || searchData.to;
    
    // Add IATA codes to search data
    const searchRequestData = {
      ...searchData,
      from: fromCode,
      to: toCode
    };

    console.log('Booking flight to destination:', destination);
    console.log('Search data for booking:', searchRequestData);
    
    // Navigate directly to the search page with search parameters
    // This will trigger the search on the search page component
    navigate('/flights/search', { 
      state: { 
        searchData: searchRequestData
      } 
    });
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Enhanced Hero Section */}
      <section className="relative h-screen max-h-[800px] overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute top-1/3 right-1/3 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
        </div>
        
        <img
          src={heroImage || "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=2074&auto=format&fit=crop"}
          alt="Airplane wing view"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/50 via-indigo-900/40 to-black/60"></div>
        <div className="absolute inset-0 flex flex-col justify-center px-8 md:px-16 z-10">
          <div className="container mx-auto">
            <div className="max-w-[700px] animate-fade-in-up">
              {/* Hero/Header Section */}
              {typeof window !== 'undefined' && window.innerWidth < 768 ? (
                <div className="mb-6 mt-60">
                  <p className="text-white text-lg font-semibold italic text-center drop-shadow-md">Travel is the only thing you buy that makes you richer.</p>
                </div>
              ) : (
                <>
                  <div className="flex items-center mb-4">
                    <div className="h-0.5 w-16 bg-blue-400 mr-4"></div>
                    <h2 className="text-blue-300 text-xl font-light tracking-wider uppercase">
                      <span className="font-script">Explore the World</span>
                    </h2>
                  </div>
                  <h1 className="text-white text-5xl md:text-7xl font-bold mb-6 leading-tight">
                    Find Your <span className="text-blue-300">Perfect Flight</span> Today
                  </h1>
                  <p className="text-gray-200 text-lg mb-10 max-w-xl">
                    Discover amazing deals on flights to destinations worldwide. Book with confidence and travel with peace of mind.
                  </p>
                </>
              )}
              
              {/* <div className="bg-white/10 backdrop-blur-md p-8 rounded-xl shadow-2xl border border-white/20 transform hover:scale-[1.01] transition-transform duration-300"> */}
                <FlightSearchForm onSearch={handleSearch} />
              
            </div>
          </div>
        </div>
        
        {/* Decorative plane trail */}
        <div className="absolute bottom-10 right-10 z-10 opacity-60 hidden md:block">
          <svg width="250" height="80" viewBox="0 0 250 80" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10,40 Q60,20 120,40 T240,40" stroke="white" strokeWidth="2" strokeDasharray="4,4" fill="none"/>
            <path d="M240,40 l-8,-8 M240,40 l-8,8" stroke="white" strokeWidth="2" fill="none"/>
            <circle cx="10" cy="40" r="4" fill="white"/>
          </svg>
        </div>
      </section>

      {/* Popular Destinations Section with Enhanced UI */}
      <section className="py-20 bg-gradient-to-b from-white to-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-block bg-blue-100 text-blue-700 px-4 py-1 rounded-full text-sm font-medium mb-4 animate-bounce-subtle">
              Top Trending Destinations
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              Explore Popular Destinations
            </h2>
            <p className="text-gray-600 text-lg">
              Discover our carefully selected destinations loved by travelers worldwide. 
              Perfect places for your next adventure.
            </p>
          </div>
          
          <PopularDestinations onSelectDestination={handleBookFlight} />
          
          <div className="flex justify-center mt-12">
            <button 
              onClick={handleExploreDestinations}
              className="group relative px-8 py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-medium shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl"
            >
              <div className="absolute top-0 left-0 w-full h-full bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
              <span className="relative flex items-center">
                Explore More Destinations
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* Enhanced Cheapest Flights Section */}
      <section className="py-20 bg-blue-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between mb-16">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <div className="relative">
                <div className="absolute -top-6 -left-6 w-24 h-24 bg-yellow-400 rounded-full opacity-20"></div>
                <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-blue-500 rounded-full opacity-20"></div>
                <img
                  src="https://images.unsplash.com/photo-1583833005442-a186a4efe0f9?q=80&w=1470&auto=format&fit=crop"
                  alt="Airplane illustration"
                  className="w-full h-auto object-contain relative z-10 rounded-2xl shadow-2xl transform hover:scale-105 transition-transform duration-500"
                  style={{ filter: "drop-shadow(0px 4px 20px rgba(0, 0, 0, 0.15))" }}
                />
              </div>
            </div>
            <div className="md:w-1/2 md:pl-16">
              <div className="inline-block bg-indigo-100 text-indigo-700 px-4 py-1 rounded-full text-sm font-medium mb-4">
                Incredible Savings
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6 leading-tight">
                Find Our <span className="text-blue-600">Lowest Fares</span> to Popular Destinations
              </h2>
              <p className="text-gray-600 text-lg mb-8">
                Take advantage of our special deals and promotions to get the best value for your travel budget. 
                We're committed to finding you the most affordable flights without compromising on quality.
              </p>
              <div className="flex items-center text-gray-500 mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Price match guarantee</span>
              </div>
              <div className="flex items-center text-gray-500 mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>No hidden fees or charges</span>
              </div>
              <div className="flex items-center text-gray-500">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>24/7 customer support</span>
              </div>
            </div>
          </div>
          
          {/* Cheapest Flights Component */}
          <div className="transform hover:scale-[1.01] transition-transform duration-300">
            <CheapestFlights onBookFlight={handleBookFlight} />
          </div>
        </div>
      </section>

      {/* Features Section - NEW */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-6">
              Why Choose JetSetters
            </h2>
            <p className="text-gray-600 text-lg">
              We make your travel experience seamless and enjoyable from booking to arrival
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 flex items-center justify-center bg-blue-100 rounded-2xl text-blue-600 mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Best Price Guarantee</h3>
              <p className="text-gray-600">Find a lower price? We'll match it and give you an additional discount on your booking.</p>
            </div>
            
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 flex items-center justify-center bg-green-100 rounded-2xl text-green-600 mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Secure Booking</h3>
              <p className="text-gray-600">Your personal and payment information is always protected with the latest security protocols.</p>
            </div>
            
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 flex items-center justify-center bg-purple-100 rounded-2xl text-purple-600 mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">24/7 Support</h3>
              <p className="text-gray-600">Our customer service team is available around the clock to assist with any questions or issues.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Subscribe Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 py-20 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-20 bg-white" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 0)' }}></div>
        
        {/* Decorative elements */}
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-white rounded-full opacity-5"></div>
        <div className="absolute bottom-1/3 left-1/6 w-48 h-48 bg-white rounded-full opacity-5"></div>
        
        <SubscribeSection />
        
        <div className="absolute bottom-0 right-0 w-full h-20 bg-white" style={{ clipPath: 'polygon(0 100%, 100% 0, 100% 100%, 0 100%)' }}></div>
      </section>
      
      <Footer />
    </div>
  )
}
