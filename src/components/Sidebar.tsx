"use client";

import { usePathname } from 'next/navigation';
import Link from 'next/link';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();

  // Determina si un enlace está activo
  const isActive = (path: string) => {
    if (path === '/') {
      return pathname === '/' || pathname === '/home';
    }
    return pathname === path || (path !== '/' && pathname.startsWith(path));
  };
  // Cierra el sidebar en pantallas pequeñas al hacer clic en un enlace
  const handleLinkClick = () => {
    // Solo cerrar en pantallas pequeñas
    const isSmallScreen = window.innerWidth < 1024;
    if (isSmallScreen) {
      onClose();
    }
  };    return (    <aside
      className={`fixed top-0 left-0 z-40 h-screen pt-32 transition-transform bg-black text-white lg:translate-x-0 ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:w-60 w-72 shadow-none`}
    >      <div className="flex flex-col h-full px-4 py-2 overflow-y-auto">
        <div className="flex-1 space-y-2 mt-2">
          {/* Enlaces principales */}          <Link
            href="/"
            onClick={handleLinkClick}
            className={`flex items-center px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors ${
              isActive('/') && !isActive('/debates') && !isActive('/tags') && !isActive('/all-posts') && !isActive('/weekly') && !isActive('/library')
                ? 'bg-gray-800 text-green-500'
                : 'text-white'
            }`}
          >
            <span>Inicio</span>
          </Link>          <Link
            href="/all-posts"
            onClick={handleLinkClick}
            className={`flex items-center px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors ${
              isActive('/all-posts') ? 'bg-gray-800 text-green-500' : 'text-white'
            }`}
          >
            <span>Todo</span>
          </Link>          <Link
            href="/tags"
            onClick={handleLinkClick}
            className={`flex items-center px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors ${
              isActive('/tags') ? 'bg-gray-800 text-green-500' : 'text-white'
            }`}
          >
            <span>Etiquetas</span>
          </Link>          <Link
            href="/debates"
            onClick={handleLinkClick}
            className={`flex items-center px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors ${
              isActive('/debates') ? 'bg-gray-800 text-green-500' : 'text-white'
            }`}
          >
            <span>Debates</span>
          </Link>          <Link
            href="/weekly"
            onClick={handleLinkClick}
            className={`flex items-center px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors ${
              isActive('/weekly') ? 'bg-gray-800 text-green-500' : 'text-white'
            }`}
          >
            <span>Semanal</span>
          </Link>          <Link
            href="/library"
            onClick={handleLinkClick}
            className={`flex items-center px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors ${
              isActive('/library') ? 'bg-gray-800 text-green-500' : 'text-white'
            }`}
          >
            <span>Biblioteca</span>
          </Link>        </div>          {/* Enlaces de pie de página - en el orden correcto */}        <div className="mt-auto pt-8 pb-16 space-y-2">          <Link
            href="/home#crear-publicacion"
            onClick={handleLinkClick}
            className="flex items-center px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors text-white"
          >
            <span>Crear Publicación</span>
          </Link><Link
            href="/home#sobre-proyecto"
            onClick={handleLinkClick}
            className="flex items-center px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors text-white"
          >
            <span>Sobre el Proyecto</span>
          </Link>          <Link
            href="/home#sugerencias"
            onClick={handleLinkClick}
            className="flex items-center px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors text-white"
          >
            <span>Sugerencias</span>
          </Link>
        </div>
      </div>
    </aside>
  );
}
