import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './components/respo/responsive.css';
import AdherentOne from './views/adherentOne/AdherentOne';
import MembreView from './views/membres/MembreView';
import DashboardView from './views/dashboard/DashboardView';
import LivreView from './views/livres/LivreView';
import StatistiqueView from './views/StatistiqueView';
import ProfilView from './views/profile/ProfilView';
import LoginView from './views/LoginView';
import EmpruntView from './views/emprunt/EmpruntView';
import UserView from './views/user/UserView';
import InscriptionView from './views/inscrit/InscriptionView';
import CircularIntegration from './components/ProgressCirculaire';
import LivreDispo from './views/livres/LivreDispo';
import EmpruntEnCours from './views/emprunt/EmpruntEnCours';
import App from './App';
import NotificationView from './views/NotificationView';
import ReservationView from './views/ReservationView';
import ReservationAll from './views/ReservationAll';

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginView />
  },
  {
    path: "/accueil",
    element: <DashboardView />
  },
  {
    path: "/membre",
    element: <MembreView />
  },
  {
    path: "/livre",
    element: <LivreView />
  },
  {
    path: "/livredispo",
    element: <LivreDispo />
  },
  {
    path: "/statistique",
    element: <StatistiqueView />
  },
  {
    path: "/profile",
    element: <ProfilView />
  },
  {
    path: "/emprunt",
    element: <EmpruntView />
  },
  {
    path: "/empruntencours",
    element: <EmpruntEnCours />
  },
  {
    path: "/utilisateur",
    element: <UserView />
  },
  {
    path: "/inscription",
    element: <InscriptionView />
  },
  {
    path: "/adherentone",
    element: <AdherentOne />
  },
  {
    path: "/test2",
    element: <CircularIntegration />
  },
  {
    path: "/test",
    element: <App />
  },
  {
    path: "/notification",
    element: <NotificationView />
  },
  {
    path: "/reservation",
    element: <ReservationView />
  },
  {
    path: "/reservationall",
    element: <ReservationAll />
  },
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <RouterProvider router={router} />
);