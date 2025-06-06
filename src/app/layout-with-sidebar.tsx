"use client"

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import UserMenuNew from '@/components/UserMenuNew';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import Sidebar from '@/components/Sidebar';

export default function LayoutWithSidebar({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  // Effect para detectar tamaño de pantalla
  useEffect(() => {
    const checkScreenSize = () => {
      setIsSmallScreen(window.innerWidth < 1024); // Aumentamos el breakpoint a 1024px
    };

    // Comprobar al cargar
    checkScreenSize();

    // Listener para cambios de tamaño
    window.addEventListener('resize', checkScreenSize);

    // Cleanup
    return () => window.removeEventListener('resize', checkScreenSize);  }, []);

  return (
    <div className="min-h-screen bg-black text-white hide-duplicate-sidebar">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center p-6 bg-black">        <div className="flex items-center">          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className={`text-white mr-4 focus:outline-none ${!isSmallScreen && 'lg:hidden'}`}
            aria-label="Toggle menu"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </button>
          <Link href="/">
            <Image src="/logo1-Oscuro.png" alt="Logo" width={48} height={48} className="rounded-lg mr-2" />
          </Link>
        </div>

        <div className="flex gap-3">
          {!user ? (
            <>
              <Link href="/login">
                <Button
                  variant="outline"
                  className="bg-gray-700 text-white border-gray-600 hover:bg-gray-600 rounded-full px-6"
                >
                  Iniciar sesión
                </Button>
              </Link>
              <Link href="/signup">
                <Button className="bg-gray-700 text-white hover:bg-gray-600 rounded-full px-6">
                  Registrarse
                </Button>
              </Link>
            </>
          ) : (
            <UserMenuNew />
          )}
        </div>
      </nav>

      {/* Sidebar usando el componente global */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Overlay para cerrar el sidebar en pantallas pequeñas */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}      {/* Main Content */}
      <div className={`flex-1 mt-[88px] content-with-sidebar ${isSmallScreen ? 'pl-0' : 'pl-60'}`}>
        <main className="p-6 overflow-hidden">
          {children}
        </main>
      </div>
    </div>
  );
}
