import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import CreateTrip from './create-tip/index.jsx';
import Header from './components/ui/custom/Header.jsx';
import Hero from './components/ui/custom/Hero.jsx';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Toaster } from './components/ui/sonner.jsx';
import ViewTrip from './view-trip/[tripid]/index.jsx';
import MyTrips from './my-trips/index.jsx';
import Footer from './view-trip/components/Footer.jsx';

const AppLayout = ({ children }) => (
  <div className='flex flex-col min-h-screen'>
    <Header />
    <main className='flex-grow'>{children}</main>
    <Footer />
  </div>
);

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout><App /></AppLayout>,
  },
  {
    path: '/create-trip',
    element: <AppLayout><CreateTrip /></AppLayout>,
  },
  {
    path: '/view-trip/:tripId',
    element: <AppLayout><ViewTrip /></AppLayout>,
  },
  {
    path: '/my-trips',
    element: <AppLayout><MyTrips /></AppLayout>,
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_AUTH_CLIENT_ID}>
      <Toaster />
      <RouterProvider router={router} />
    </GoogleOAuthProvider>
  </StrictMode>
);
