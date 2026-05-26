import React from 'react';
import { Outlet, useLocation } from 'react-router';
import { Navbar } from './Navbar';
import { Footer } from './Footer';

export const RootLayout = () => {
  const location = useLocation();
  // We can hide navbar/footer on specific pages if needed, but requirements say they should be consistent.
  // Exception: the actual login page might have a minimal header, but let's keep it consistent.
  // Re-reading requirements: "PÁGINA DE LOGIN - Logo arriba (vuelve a la home) - Título 'Iniciar sesión'..."
  // This implies the standard navbar might not be needed on login, or it's a specific simple navbar.
  // I'll make a custom layout for Login if needed, or just use RootLayout for everything.
  // Let's use RootLayout for everything as it simplifies.

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-50 transition-colors">
      <Navbar />
      <main className="flex-1 flex flex-col">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
