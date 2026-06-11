import { createBrowserRouter } from 'react-router';
import { RootLayout } from './layouts/RootLayout';
import { LandingPage } from './pages/LandingPage';
import { HomePage } from './pages/HomePage';
import { SearchPage } from './pages/SearchPage';
import { PetDetailPage } from './pages/PetDetailPage';
import { LoginPage } from './pages/LoginPage';
import { ContactPage } from './pages/ContactPage';
import { ProtectedAdmin } from './components/ProtectedAdmin';
import { ProtectedUseCases } from './components/ProtectedUseCases';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: RootLayout,
    children: [
      { index: true, Component: LandingPage },
      { path: 'home', Component: HomePage },
      { path: 'search', Component: SearchPage },
      { path: 'pet/:id', Component: PetDetailPage },
      { path: 'login', Component: LoginPage },
      { path: 'contact', Component: ContactPage },
      { path: 'admin', Component: ProtectedAdmin },
      { path: 'use-cases', Component: ProtectedUseCases },
    ],
  },
]);
