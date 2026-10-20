/**
 * FlyKaaba - Vehicle Booking & Travel Agency Marketplace
 * Core Application Component meticulously reproducing the reference screenshots.
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection, SearchParams } from './components/HeroSection';
import { CarCategoriesSection } from './components/CarCategoriesSection';
import { VerifiedAgenciesSection } from './components/VerifiedAgenciesSection';
import { FeaturedVehiclesSection } from './components/FeaturedVehiclesSection';
import { WhyPilgrimsTrustSection } from './components/WhyPilgrimsTrustSection';
import { FaqSection } from './components/FaqSection';
import { BlogSection } from './components/BlogSection';
import { Footer } from './components/Footer';

// Modals & Supporting Views
import { SearchResultsModal } from './components/SearchResultsModal';
import { VehicleDetailsModal } from './components/VehicleDetailsModal';
import { AgencyDetailsModal } from './components/AgencyDetailsModal';
import { AllAgenciesModal } from './components/AllAgenciesModal';
import { AllVehiclesModal } from './components/AllVehiclesModal';
import { CompanyRegistrationModal } from './components/CompanyRegistrationModal';
import { RoutesModal } from './components/RoutesModal';
import { ZiyaratModal } from './components/ZiyaratModal';
import { BlogsPageView } from './components/BlogsPageView';
import { BlogPostDetailView } from './components/BlogPostDetailView';
import { AuthModal } from './components/AuthModal';
import { MyBookingsModal } from './components/MyBookingsModal';
import { HowItWorksModal } from './components/HowItWorksModal';
import { CategoryPageView } from './components/CategoryPageView';
import { BookingFlowView } from './components/BookingFlowView';
import { AllCompaniesPageView } from './components/AllCompaniesPageView';
import { CompanyProfilePageView } from './components/CompanyProfilePageView';
import { SearchVehiclesPageView } from './components/SearchVehiclesPageView';
import { HowItWorksPageView } from './components/HowItWorksPageView';
import { RoutesPageView } from './components/RoutesPageView';
import { RouteResultsPageView } from './components/RouteResultsPageView';
import { MakkahZiyaratPageView } from './components/MakkahZiyaratPageView';
import { MadinaZiyaratPageView } from './components/MadinaZiyaratPageView';
import { ListCompanyPageView } from './components/ListCompanyPageView';
import { CompanyLandingView } from './components/CompanyLandingView';
import { PrivacyPolicyPageView } from './components/PrivacyPolicyPageView';
import { BrandStoryPageView } from './components/BrandStoryPageView';
import { TermsConditionsPageView } from './components/TermsConditionsPageView';
import { HowVerificationWorksPageView } from './components/HowVerificationWorksPageView';
import { AboutUsPageView } from './components/AboutUsPageView';
import { ContactUsPageView } from './components/ContactUsPageView';
import { CitiesPageView } from './components/CitiesPageView';
import { AgencyDashboardView } from './components/AgencyDashboardView';
import { AdminDashboardView } from './components/AdminDashboardView';
import { CustomerDashboardView } from './components/CustomerDashboardView';
import { InsForgeConnectionModal } from './components/InsForgeConnectionModal';
import { insforgeService } from './lib/insforge';

// Mock Data
import {
  TRAVEL_AGENCIES,
  FEATURED_VEHICLES,
  BLOG_POSTS,
  TravelAgency,
  Vehicle,
  BlogPost,
  ZiyaratDestination,
  BookingRecord,
  agencyAlfaisalCover,
} from './data/mockData';

export default function App() {
  // Application Data States
  const [agencies, setAgencies] = useState<TravelAgency[]>(() => {
    const saved = localStorage.getItem('flykaaba_agencies');
    return saved ? JSON.parse(saved) : TRAVEL_AGENCIES;
  });

  const [vehicles, setVehicles] = useState<Vehicle[]>(() => {
    const saved = localStorage.getItem('flykaaba_vehicles');
    return saved ? JSON.parse(saved) : FEATURED_VEHICLES;
  });

  const [bookings, setBookings] = useState<BookingRecord[]>(() => {
    const saved = localStorage.getItem('flykaaba_bookings');
    if (saved) return JSON.parse(saved);
    // Initial sample booking to demonstrate functionality
    return [
      {
        id: 'book-init-1',
        referenceNumber: 'FK-839210',
        vehicleName: 'GMC Yukon 2023',
        vehicleCategory: 'SUV',
        companyName: 'Riyadh Fleet Co',
        pickupCity: 'Jeddah Airport (JED)',
        destinationCity: 'Makkah',
        travelDate: '2026-10-25',
        pickupTime: '14:30',
        tripType: 'one-way',
        passengers: 4,
        totalPriceSar: 450,
        customerName: 'Demo Pilgrim',
        customerPhone: '+966 50 123 4567',
        customerEmail: 'pilgrim@example.com',
        status: 'Confirmed',
        createdAt: 'Oct 17, 2026',
      },
    ];
  });

  const [currentUser, setCurrentUser] = useState<{ name: string; email: string; role: string } | null>(() => {
    const saved = localStorage.getItem('flykaaba_user');
    return saved ? JSON.parse(saved) : { name: 'Sara', email: 'sara@example.com', role: 'Verified Traveler' };
  });

  const [activeView, setActiveView] = useState<'home' | 'agencies' | 'routes' | 'route-results' | 'vehicles' | 'how-it-works' | 'how-it-works-companies' | 'list-company' | 'privacy-policy' | 'brand-story' | 'terms' | 'verification' | 'about-us' | 'contact-us' | 'cities' | 'ziyarat-makkah' | 'ziyarat-madina' | 'agency-dashboard' | 'admin-dashboard' | 'customer-dashboard' | 'blogs' | 'blog-detail'>('home');
  const [showInsForgeModal, setShowInsForgeModal] = useState(false);
  const [selectedCategoryPage, setSelectedCategoryPage] = useState<string | null>(null);
  const [selectedCityFilter, setSelectedCityFilter] = useState<string>('Makkah');
  const [bookingVehicle, setBookingVehicle] = useState<Vehicle | null>(null);
  const [bookingRouteDetails, setBookingRouteDetails] = useState<{
    pickupCity: string;
    destinationCity: string;
    travelDate: string;
    pickupTime: string;
    tripType: 'one-way' | 'round-trip';
    serviceType?: 'point-to-point' | 'hourly' | 'ziyarat';
    priceSar?: number;
    hours?: number;
  } | null>(null);
  const [searchResults, setSearchResults] = useState<SearchParams | null>(null);
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [vehicleModalStep, setVehicleModalStep] = useState<'details' | 'booking-form'>('details');
  const [selectedAgency, setSelectedAgency] = useState<TravelAgency | null>(null);
  const [selectedZiyarat, setSelectedZiyarat] = useState<ZiyaratDestination | null>(null);
  const [selectedBlogPost, setSelectedBlogPost] = useState<BlogPost | null>(null);
  
  const [showAllAgenciesModal, setShowAllAgenciesModal] = useState(false);
  const [showAllVehiclesModal, setShowAllVehiclesModal] = useState(false);
  const [initialCategoryFilter, setInitialCategoryFilter] = useState('All');
  const [showCompanyRegModal, setShowCompanyRegModal] = useState(false);
  const [showRoutesModal, setShowRoutesModal] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState<'login' | 'signup' | null>(null);
  const [showMyBookingsModal, setShowMyBookingsModal] = useState(false);
  const [showHowItWorksModal, setShowHowItWorksModal] = useState<string | null>(null);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('flykaaba_bookings', JSON.stringify(bookings));
  }, [bookings]);

  useEffect(() => {
    localStorage.setItem('flykaaba_agencies', JSON.stringify(agencies));
  }, [agencies]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('flykaaba_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('flykaaba_user');
    }
  }, [currentUser]);

  // Initial fetch from InsForge Database
  useEffect(() => {
    async function loadInsForgeData() {
      try {
        const [loadedAgencies, loadedVehicles, loadedBookings, authUser] = await Promise.all([
          insforgeService.getAgencies(),
          insforgeService.getVehicles(),
          insforgeService.getBookings(currentUser?.email),
          insforgeService.getCurrentUser(),
        ]);
        if (loadedAgencies && loadedAgencies.length > 0) {
          setAgencies(loadedAgencies);
        }
        if (loadedVehicles && loadedVehicles.length > 0) {
          setVehicles(loadedVehicles);
        }
        if (loadedBookings && loadedBookings.length > 0) {
          setBookings(loadedBookings);
        }
        if (authUser) {
          setCurrentUser(authUser);
        }
      } catch (err) {
        console.warn('[InsForge] Background data sync note:', err);
      }
    }
    loadInsForgeData();
  }, []);

  // URL Query Sync on mount and back/forward navigation
  const syncUrlToSearchState = () => {
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const pickup = urlParams.get('pickup') || urlParams.get('pickupCity');
      const destination = urlParams.get('destination') || urlParams.get('dropoffCity');
      const date = urlParams.get('date') || urlParams.get('travelDate') || '2026-10-25';
      const time = urlParams.get('time') || urlParams.get('pickupTime') || '13:30';
      const tripType = (urlParams.get('tripType') === 'round-trip' ? 'round-trip' : 'one-way') as 'one-way' | 'round-trip';
      const view = urlParams.get('view');

      if (pickup && destination) {
        setSearchResults({
          pickupCity: pickup,
          dropoffCity: destination,
          travelDate: date,
          pickupTime: time,
          tripType: tripType,
        });
        setActiveView('route-results');
      } else if (view && ['home', 'agencies', 'routes', 'vehicles', 'how-it-works', 'how-it-works-companies', 'list-company', 'privacy-policy', 'brand-story', 'terms', 'verification', 'about-us', 'contact-us', 'cities', 'blogs', 'blog'].includes(view)) {
        if (view === 'blog') {
          const slug = urlParams.get('slug');
          const matched = BLOG_POSTS.find(p => p.slug === slug);
          if (matched) {
            setSelectedBlogPost(matched);
            setActiveView('blog-detail');
          } else {
            setActiveView('blogs');
          }
        } else {
          if (view === 'vehicles') {
            const cityParam = urlParams.get('city');
            if (cityParam) setSelectedCityFilter(cityParam);
          }
          setActiveView(view as any);
        }
        setSearchResults(null);
      } else {
        setActiveView('home');
        setSearchResults(null);
      }
    } catch (err) {
      console.warn('URL parsing note:', err);
    }
  };

  useEffect(() => {
    syncUrlToSearchState();
    const handlePopState = () => syncUrlToSearchState();
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Handlers
  const handleSearch = (params: SearchParams) => {
    setSearchResults(params);
    setActiveView('route-results');
    setSelectedCategoryPage(null);
    setBookingVehicle(null);
    setSelectedAgency(null);

    // Dynamic Route Results URL generation matching Requirement 2
    const query = `?pickup=${encodeURIComponent(params.pickupCity)}&destination=${encodeURIComponent(params.dropoffCity)}&date=${encodeURIComponent(params.travelDate)}&time=${encodeURIComponent(params.pickupTime || '13:30')}&tripType=${encodeURIComponent(params.tripType)}`;
    window.history.pushState({ view: 'route-results', search: params }, '', query);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBookVehicleFromRoute = (vehicle: Vehicle, routeDetails?: any) => {
    setSelectedVehicle(null);
    setBookingRouteDetails(routeDetails || null);
    setBookingVehicle(vehicle);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectCategory = (categoryTitle: string) => {
    setBookingVehicle(null);
    setSelectedAgency(null);
    setActiveView('home');
    setSelectedCategoryPage(categoryTitle);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenAllCompanies = () => {
    setActiveView('agencies');
    setSelectedAgency(null);
    setSelectedCategoryPage(null);
    setBookingVehicle(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectAgency = (agency: TravelAgency) => {
    setSelectedAgency(agency);
    setActiveView('agencies');
    setSelectedCategoryPage(null);
    setBookingVehicle(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleGoHome = () => {
    setActiveView('home');
    setSelectedBlogPost(null);
    setSelectedCategoryPage(null);
    setBookingVehicle(null);
    setSelectedAgency(null);
    setBookingRouteDetails(null);
    setSearchResults(null);
    window.history.pushState(null, '', window.location.pathname);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenAllVehicles = (cat: string = 'All') => {
    setInitialCategoryFilter(cat);
    setActiveView('vehicles');
    setSelectedCategoryPage(null);
    setSelectedAgency(null);
    setBookingVehicle(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenHowItWorks = () => {
    setActiveView('how-it-works');
    setSelectedCategoryPage(null);
    setSelectedAgency(null);
    setBookingVehicle(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenRoutes = () => {
    setActiveView('routes');
    setSelectedCategoryPage(null);
    setSelectedAgency(null);
    setBookingVehicle(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenMakkahZiyarat = () => {
    setActiveView('ziyarat-makkah');
    setSelectedCategoryPage(null);
    setSelectedAgency(null);
    setBookingVehicle(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenMadinaZiyarat = () => {
    setActiveView('ziyarat-madina');
    setSelectedCategoryPage(null);
    setSelectedAgency(null);
    setBookingVehicle(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenListCompany = () => {
    setActiveView('list-company');
    setSelectedCategoryPage(null);
    setSelectedAgency(null);
    setBookingVehicle(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenAgencyDashboard = () => {
    setActiveView('agency-dashboard');
    setSelectedCategoryPage(null);
    setSelectedAgency(null);
    setBookingVehicle(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenAdminDashboard = () => {
    setActiveView('admin-dashboard');
    setSelectedCategoryPage(null);
    setSelectedAgency(null);
    setBookingVehicle(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenCustomerDashboard = () => {
    setActiveView('customer-dashboard');
    setSelectedCategoryPage(null);
    setSelectedAgency(null);
    setBookingVehicle(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenVehicleDetails = (vehicle: Vehicle) => {
    setSelectedVehicle(vehicle);
    setVehicleModalStep('details');
  };

  const handleOpenVehicleBooking = (vehicle: Vehicle) => {
    setSelectedVehicle(null);
    setBookingVehicle(vehicle);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleConfirmBooking = async (newBooking: BookingRecord) => {
    setBookings(prev => [newBooking, ...prev]);
    try {
      await insforgeService.createBooking(newBooking);
    } catch (err) {
      console.warn('Booking persisted to local session:', err);
    }
  };

  const handleCancelBooking = (bookingId: string) => {
    setBookings(prev => prev.filter(b => b.id !== bookingId));
  };

  const handleCompanyRegistered = (newCompanyName: string) => {
    // Optionally append newly registered agency
    const newAgency: TravelAgency = {
      id: 'agency-' + Date.now(),
      name: newCompanyName,
      slug: newCompanyName.toLowerCase().replace(/\s+/g, '-'),
      city: 'Makkah',
      isVerified: true,
      coverImage: agencyAlfaisalCover,
      avatarImage: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=100&auto=format&fit=crop&q=80',
      rating: 5.0,
      reviewCount: 1,
      phone: '+966 50 999 8888',
      whatsapp: '+966509998888',
      email: 'contact@' + newCompanyName.toLowerCase().replace(/\s+/g, '') + '.sa',
      description: 'Official licensed transportation provider with verified credentials across Saudi Arabia.',
      licenseNumber: 'KSA-MOT-PENDING',
      foundedYear: 2026,
      vehicleCount: 8,
      featuredVehicles: [],
    };
    setAgencies(prev => [newAgency, ...prev]);
  };

  const handleAddReview = (agencyId: string, rating: number, comment: string) => {
    setAgencies(prev => prev.map(a => {
      if (a.id === agencyId) {
        const newCount = a.reviewCount + 1;
        const currentTotal = a.rating * a.reviewCount;
        const newRating = (currentTotal + rating) / newCount;
        return {
          ...a,
          reviewCount: newCount,
          rating: Number(newRating.toFixed(1)),
        };
      }
      return a;
    }));
  };

  const handleSelectRoute = (fromCity: string, toCity: string) => {
    setShowRoutesModal(false);
    handleSearch({
      tripType: 'one-way',
      pickupCity: fromCity,
      dropoffCity: toCity,
      travelDate: new Date().toISOString().split('T')[0],
      pickupTime: '10:00',
    });
  };

  const handleBookZiyarat = (ziyarat: ZiyaratDestination) => {
    setSelectedZiyarat(null);
    // Open vehicle search for that city
    handleSearch({
      tripType: 'one-way',
      pickupCity: ziyarat.city,
      dropoffCity: ziyarat.title,
      travelDate: new Date().toISOString().split('T')[0],
      pickupTime: '08:30',
    });
  };

  const handleOpenBlogs = () => {
    setActiveView('blogs');
    setSelectedBlogPost(null);
    setSelectedCategoryPage(null);
    setSelectedAgency(null);
    setBookingVehicle(null);
    setSearchResults(null);
    window.history.pushState({ view: 'blogs' }, '', '?view=blogs');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectBlogPost = (post: BlogPost) => {
    setSelectedBlogPost(post);
    setActiveView('blog-detail');
    window.history.pushState({ view: 'blog-detail', slug: post.slug }, '', `?view=blog&slug=${post.slug}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectCity = (cityName: string) => {
    setSelectedCityFilter(cityName);
    setInitialCategoryFilter('All');
    setActiveView('vehicles');
    window.history.pushState({ view: 'vehicles', city: cityName }, '', `?view=vehicles&city=${encodeURIComponent(cityName)}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleQuickLink = (linkTitle: string) => {
    setSelectedCategoryPage(null);
    setSelectedAgency(null);
    setBookingVehicle(null);
    setSearchResults(null);

    if (linkTitle === 'Blogs') {
      handleOpenBlogs();
    } else if (linkTitle === 'Cities') {
      setActiveView('cities');
      window.history.pushState({ view: 'cities' }, '', '?view=cities');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (linkTitle === 'How It Works for Customers') {
      handleOpenHowItWorks();
    } else if (linkTitle === 'How It Works for Companies') {
      handleOpenListCompany();
    } else if (linkTitle === 'How Verification Works') {
      setActiveView('verification');
      window.history.pushState({ view: 'verification' }, '', '?view=verification');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (linkTitle === 'Privacy Policy') {
      setActiveView('privacy-policy');
      window.history.pushState({ view: 'privacy-policy' }, '', '?view=privacy-policy');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (linkTitle === 'Brand Story') {
      setActiveView('brand-story');
      window.history.pushState({ view: 'brand-story' }, '', '?view=brand-story');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (linkTitle === 'Terms and Conditions') {
      setActiveView('terms');
      window.history.pushState({ view: 'terms' }, '', '?view=terms');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (linkTitle === 'About Us') {
      setActiveView('about-us');
      window.history.pushState({ view: 'about-us' }, '', '?view=about-us');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (linkTitle === 'Contact Us') {
      setActiveView('contact-us');
      window.history.pushState({ view: 'contact-us' }, '', '?view=contact-us');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setShowHowItWorksModal(linkTitle);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#111111] font-sans selection:bg-[#C9A01B]/20 selection:text-[#111111]">
      
      {/* Sticky Header / Navigation Bar matching Screenshot 1 */}
      <Navbar
        onOpenAgencies={handleOpenAllCompanies}
        onOpenRoutes={handleOpenRoutes}
        onSelectZiyarat={(z) => setSelectedZiyarat(z)}
        onOpenMakkahZiyarat={handleOpenMakkahZiyarat}
        onOpenMadinaZiyarat={handleOpenMadinaZiyarat}
        onOpenListCompany={handleOpenListCompany}
        onOpenAgencyDashboard={handleOpenAgencyDashboard}
        onOpenAdminDashboard={handleOpenAdminDashboard}
        onOpenCustomerDashboard={handleOpenCustomerDashboard}
        onOpenInsForgeModal={() => setShowInsForgeModal(true)}
        onOpenLogin={() => setShowAuthModal('login')}
        onOpenSignup={() => setShowAuthModal('signup')}
        currentUser={currentUser}
        onLogout={async () => {
          await insforgeService.signOut();
          setCurrentUser(null);
        }}
        onOpenMyBookings={() => setShowMyBookingsModal(true)}
        activeView={activeView}
        onGoHome={handleGoHome}
      />

      {/* Main Page Body */}
      <main className="flex-1">
        {bookingVehicle ? (
          <BookingFlowView
            vehicle={bookingVehicle}
            agency={agencies.find(a => a.id === bookingVehicle.companyId)}
            onGoHome={handleGoHome}
            onBackToCategory={(category) => {
              setBookingVehicle(null);
              if (activeView === 'route-results' && searchResults) {
                // keep on route-results
              } else {
                setSelectedCategoryPage(category);
              }
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onConfirmBooking={(booking) => {
              handleConfirmBooking(booking);
            }}
            currentUser={currentUser}
            initialBookingDetails={bookingRouteDetails || (searchResults ? {
              pickupCity: searchResults.pickupCity,
              destinationCity: searchResults.dropoffCity,
              travelDate: searchResults.travelDate,
              pickupTime: searchResults.pickupTime,
              tripType: searchResults.tripType,
              priceSar: bookingVehicle.pricePerDay,
            } : undefined)}
          />
        ) : activeView === 'route-results' && searchResults ? (
          <RouteResultsPageView
            searchParams={searchResults}
            allVehicles={vehicles}
            agencies={agencies}
            onGoHome={handleGoHome}
            onGoToRoutes={handleOpenRoutes}
            onBookVehicle={handleBookVehicleFromRoute}
            onSelectVehicle={handleOpenVehicleDetails}
            onUpdateSearch={handleSearch}
          />
        ) : selectedCategoryPage ? (
          <CategoryPageView
            currentCategory={selectedCategoryPage}
            onSelectCategory={(cat) => {
              setSelectedCategoryPage(cat);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onGoHome={handleGoHome}
            vehicles={vehicles}
            agencies={agencies}
            onBookVehicle={handleOpenVehicleBooking}
            onSelectVehicle={handleOpenVehicleDetails}
            onOpenSearch={() => {
              setSelectedCategoryPage(null);
              window.scrollTo({ top: 120, behavior: 'smooth' });
            }}
            onViewAllCategories={() => {
              setSelectedCategoryPage(null);
              window.scrollTo({ top: 600, behavior: 'smooth' });
            }}
          />
        ) : activeView === 'agencies' ? (
          selectedAgency ? (
            <CompanyProfilePageView
              agency={selectedAgency}
              vehicles={vehicles}
              allAgencies={agencies}
              onBackToAgencies={() => {
                setSelectedAgency(null);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onGoHome={handleGoHome}
              onBookVehicle={handleOpenVehicleBooking}
              onSelectVehicle={handleOpenVehicleDetails}
              onSelectOtherAgency={(other) => {
                setSelectedAgency(other);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
          ) : (
            <AllCompaniesPageView
              agencies={agencies}
              vehicles={vehicles}
              onSelectAgency={handleSelectAgency}
              onGoHome={handleGoHome}
              onOpenListCompany={() => setShowCompanyRegModal(true)}
            />
          )
        ) : activeView === 'vehicles' ? (
          <SearchVehiclesPageView
            vehicles={vehicles}
            agencies={agencies}
            onSelectVehicle={handleOpenVehicleDetails}
            onBookVehicle={handleOpenVehicleBooking}
            onGoHome={handleGoHome}
            initialCategory={initialCategoryFilter}
            initialPickupCity={selectedCityFilter}
          />
        ) : activeView === 'how-it-works' ? (
          <HowItWorksPageView
            onGoHome={handleGoHome}
            onBrowseVehicles={() => handleOpenAllVehicles('All')}
          />
        ) : activeView === 'routes' ? (
          <RoutesPageView
            onGoHome={handleGoHome}
            onBrowseAllVehicles={() => handleOpenAllVehicles('All')}
            onSelectRoute={(fromCity, toCity) => {
              handleSelectRoute(fromCity, toCity);
            }}
          />
        ) : activeView === 'ziyarat-makkah' ? (
          <MakkahZiyaratPageView
            onGoHome={handleGoHome}
            onBookVehicle={handleOpenVehicleBooking}
            onSelectVehicle={handleOpenVehicleDetails}
            onSelectAgency={handleSelectAgency}
            allAgencies={agencies}
            allVehicles={vehicles}
          />
        ) : activeView === 'ziyarat-madina' ? (
          <MadinaZiyaratPageView
            onGoHome={handleGoHome}
            onBookVehicle={handleOpenVehicleBooking}
            onSelectVehicle={handleOpenVehicleDetails}
            onSelectAgency={handleSelectAgency}
            allAgencies={agencies}
            allVehicles={vehicles}
          />
        ) : activeView === 'list-company' || activeView === 'how-it-works-companies' ? (
          <CompanyLandingView
            onRegisterCompany={() => setShowCompanyRegModal(true)}
            onSeeHowItWorks={() => {
              setActiveView('verification');
              window.history.pushState({ view: 'verification' }, '', '?view=verification');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onContactUs={() => {
              setActiveView('contact-us');
              window.history.pushState({ view: 'contact-us' }, '', '?view=contact-us');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        ) : activeView === 'privacy-policy' ? (
          <PrivacyPolicyPageView
            onGoHome={handleGoHome}
            onContactUs={() => {
              setActiveView('contact-us');
              window.history.pushState({ view: 'contact-us' }, '', '?view=contact-us');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        ) : activeView === 'brand-story' ? (
          <BrandStoryPageView
            onGoHome={handleGoHome}
            onExploreVehicles={() => handleOpenAllVehicles('All')}
            onListCompany={handleOpenListCompany}
            onAboutUs={() => {
              setActiveView('about-us');
              window.history.pushState({ view: 'about-us' }, '', '?view=about-us');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onHowVerificationWorks={() => {
              setActiveView('verification');
              window.history.pushState({ view: 'verification' }, '', '?view=verification');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        ) : activeView === 'terms' ? (
          <TermsConditionsPageView
            onGoHome={handleGoHome}
            onContactSupport={() => {
              setActiveView('contact-us');
              window.history.pushState({ view: 'contact-us' }, '', '?view=contact-us');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        ) : activeView === 'verification' ? (
          <HowVerificationWorksPageView
            onGoHome={handleGoHome}
            onRegisterCompany={() => setShowCompanyRegModal(true)}
            onBrowseVehicles={() => handleOpenAllVehicles('All')}
          />
        ) : activeView === 'about-us' ? (
          <AboutUsPageView
            onGoHome={handleGoHome}
            onExploreVehicles={() => handleOpenAllVehicles('All')}
            onBrowseVehicles={() => handleOpenAllVehicles('All')}
            onListCompany={handleOpenListCompany}
            onContactUs={() => {
              setActiveView('contact-us');
              window.history.pushState({ view: 'contact-us' }, '', '?view=contact-us');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        ) : activeView === 'contact-us' ? (
          <ContactUsPageView
            onGoHome={handleGoHome}
            onViewPrivacyPolicy={() => {
              setActiveView('privacy-policy');
              window.history.pushState({ view: 'privacy-policy' }, '', '?view=privacy-policy');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onViewTerms={() => {
              setActiveView('terms');
              window.history.pushState({ view: 'terms' }, '', '?view=terms');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        ) : activeView === 'cities' ? (
          <CitiesPageView
            onSelectCity={handleSelectCity}
            onGoHome={handleGoHome}
          />
        ) : activeView === 'agency-dashboard' ? (
          <AgencyDashboardView
            agency={agencies[0] || { id: 'agency-1', name: 'Al Faisal Transport Co', slug: 'al-faisal', city: 'Madinah', isVerified: true, coverImage: '', avatarImage: '', rating: 5, reviewCount: 12, phone: '+966 50 123 4567', whatsapp: '+966501234567', email: 'info@alfaisal.sa', description: '', licenseNumber: 'KSA-MOT-44289', foundedYear: 2014, vehicleCount: 15, featuredVehicles: [] }}
            vehicles={vehicles}
            bookings={bookings}
            onGoHome={handleGoHome}
            onOpenInsForgeModal={() => setShowInsForgeModal(true)}
            onUpdateBookingStatus={(id, status) => {
              setBookings(prev => prev.map(b => b.id === id ? { ...b, status: status as 'Completed' | 'Confirmed' | 'Pending Confirmation' } : b));
            }}
            onToggleVehicleAvailability={(id) => {
              setVehicles(prev => prev.map(v => v.id === id ? { ...v, isAvailable: v.isAvailable === false ? true : false } : v));
            }}
            onAddNewVehicle={(newVeh) => {
              setVehicles(prev => [newVeh as Vehicle, ...prev]);
            }}
          />
        ) : activeView === 'admin-dashboard' ? (
          <AdminDashboardView
            agencies={agencies}
            vehicles={vehicles}
            bookings={bookings}
            onGoHome={handleGoHome}
            onOpenInsForgeModal={() => setShowInsForgeModal(true)}
            onApproveAgency={(agencyId) => {
              setAgencies(prev => prev.map(a => a.id === agencyId ? { ...a, isVerified: true } : a));
            }}
            onRejectAgency={(agencyId) => {
              setAgencies(prev => prev.filter(a => a.id !== agencyId));
            }}
          />
        ) : activeView === 'customer-dashboard' ? (
          <CustomerDashboardView
            currentUser={currentUser}
            bookings={bookings}
            onGoHome={handleGoHome}
            onOpenMakkahZiyarat={handleOpenMakkahZiyarat}
            onOpenMadinaZiyarat={handleOpenMadinaZiyarat}
            onOpenRoutes={handleOpenRoutes}
            onCancelBooking={handleCancelBooking}
            onOpenInsForgeModal={() => setShowInsForgeModal(true)}
          />
        ) : activeView === 'blogs' ? (
          <BlogsPageView
            posts={BLOG_POSTS}
            onSelectPost={handleSelectBlogPost}
            onGoHome={handleGoHome}
          />
        ) : activeView === 'blog-detail' && selectedBlogPost ? (
          <BlogPostDetailView
            post={selectedBlogPost}
            allPosts={BLOG_POSTS}
            onBackToBlogs={handleOpenBlogs}
            onGoHome={handleGoHome}
            onSelectPost={handleSelectBlogPost}
          />
        ) : (
          <>
            {/* 1. Hero Section matching Screenshot 1 */}
            <HeroSection
              onSearch={handleSearch}
              onNavigateToBlog={handleOpenBlogs}
            />

            {/* 2. Car Categories Section matching Screenshot 2 */}
            <CarCategoriesSection
              onSelectCategory={handleSelectCategory}
            />

            {/* 3. Verified Travel Agencies Section matching Screenshots 2 & 3 */}
            <VerifiedAgenciesSection
              agencies={agencies}
              onSelectAgency={handleSelectAgency}
              onViewAllAgencies={handleOpenAllCompanies}
            />

            {/* 4. Featured Vehicles Section matching Screenshots 3 & 4 */}
            <FeaturedVehiclesSection
              vehicles={vehicles}
              onSelectVehicle={handleOpenVehicleDetails}
              onBookVehicle={handleOpenVehicleBooking}
              onViewAllVehicles={() => handleOpenAllVehicles('All')}
            />

            {/* 5. Why Pilgrims Trust FlyKaaba Section matching Screenshots 4 & 5 */}
            <WhyPilgrimsTrustSection
              onHowItWorksClick={handleOpenHowItWorks}
            />

            {/* 6. Frequently Asked Questions Section matching Screenshot 6 */}
            <FaqSection />

            {/* 7. From Our Blog Section matching Screenshots 6 & 7 */}
            <div id="blog-section">
              <BlogSection
                posts={BLOG_POSTS}
                onSelectPost={(post) => handleSelectBlogPost(post)}
                onViewAllPosts={handleOpenBlogs}
              />
            </div>
          </>
        )}
      </main>

      {/* 8. Footer matching Screenshot 8 */}
      <Footer 
        onQuickLinkClick={handleQuickLink} 
        onOpenInsForgeModal={() => setShowInsForgeModal(true)} 
      />

      {/* ================= MODALS & ACTIVE OVERLAYS ================= */}

      {/* Vehicle Details & Booking Modal */}
      {selectedVehicle && (
        <VehicleDetailsModal
          vehicle={selectedVehicle}
          initialStep={vehicleModalStep}
          agency={agencies.find(a => a.id === selectedVehicle.companyId)}
          onClose={() => setSelectedVehicle(null)}
          onConfirmBooking={handleConfirmBooking}
          onProceedToBookingPage={handleOpenVehicleBooking}
          defaultPickupCity={searchResults?.pickupCity || 'Jeddah'}
          defaultDropoffCity={searchResults?.dropoffCity || 'Makkah'}
          defaultDate={searchResults?.travelDate}
          defaultTime={searchResults?.pickupTime}
        />
      )}

      {/* Agency Details Modal (used when inspecting agency from search or category) */}
      {selectedAgency && activeView !== 'agencies' && (
        <AgencyDetailsModal
          agency={selectedAgency}
          agencyVehicles={vehicles.filter(v => v.companyId === selectedAgency.id)}
          onClose={() => setSelectedAgency(null)}
          onSelectVehicle={handleOpenVehicleDetails}
          onAddReview={handleAddReview}
        />
      )}

      {/* All Agencies Directory Modal */}
      {showAllAgenciesModal && (
        <AllAgenciesModal
          agencies={agencies}
          onClose={() => setShowAllAgenciesModal(false)}
          onSelectAgency={(agency) => {
            setShowAllAgenciesModal(false);
            handleSelectAgency(agency);
          }}
        />
      )}

      {/* All Vehicles Catalog Modal */}
      {showAllVehiclesModal && (
        <AllVehiclesModal
          vehicles={vehicles}
          initialCategory={initialCategoryFilter}
          onClose={() => setShowAllVehiclesModal(false)}
          onSelectVehicle={(veh) => {
            setShowAllVehiclesModal(false);
            handleOpenVehicleDetails(veh);
          }}
          onBookVehicle={(veh) => {
            setShowAllVehiclesModal(false);
            handleOpenVehicleBooking(veh);
          }}
        />
      )}

      {/* List Your Company Registration Modal */}
      {showCompanyRegModal && (
        <CompanyRegistrationModal
          onClose={() => setShowCompanyRegModal(false)}
          onCompanyRegistered={handleCompanyRegistered}
        />
      )}

      {/* Routes Modal */}
      {showRoutesModal && (
        <RoutesModal
          onClose={() => setShowRoutesModal(false)}
          onSelectRoute={handleSelectRoute}
        />
      )}

      {/* Ziyarat Destination Modal */}
      {selectedZiyarat && (
        <ZiyaratModal
          destination={selectedZiyarat}
          onClose={() => setSelectedZiyarat(null)}
          onBookZiyarat={handleBookZiyarat}
        />
      )}

      {/* Login & Signup Modal */}
      {showAuthModal && (
        <AuthModal
          initialMode={showAuthModal}
          onClose={() => setShowAuthModal(null)}
          onLoginSuccess={(user) => setCurrentUser(user)}
        />
      )}

      {/* User Bookings Modal */}
      {showMyBookingsModal && (
        <MyBookingsModal
          bookings={bookings}
          onClose={() => setShowMyBookingsModal(false)}
          onCancelBooking={handleCancelBooking}
        />
      )}

      {/* How It Works & Transparency Modal */}
      {showHowItWorksModal && (
        <HowItWorksModal
          initialTopic={showHowItWorksModal}
          onClose={() => setShowHowItWorksModal(null)}
        />
      )}

      {/* InsForge Backend & Infrastructure Modal */}
      {showInsForgeModal && (
        <InsForgeConnectionModal
          onClose={() => setShowInsForgeModal(false)}
        />
      )}

    </div>
  );
}
