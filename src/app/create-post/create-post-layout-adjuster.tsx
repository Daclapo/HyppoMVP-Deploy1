"use client"

import { useEffect } from 'react';

// Este componente aplica un estilo específico para ajustar el layout
// de la página create-post sin afectar otras páginas
export default function CreatePostLayoutAdjuster() {
  useEffect(() => {
    // Agregar una clase al body para identificar esta página específicamente
    document.body.classList.add('create-post-page');

    // Resetear el scroll a la parte superior de la página
    window.scrollTo(0, 0);

    const COLLAPSE_BREAKPOINT = 1350; // Nuevo breakpoint específico para esta página

    // Función para aplicar estilos específicos
    const adjustLayout = () => {
      // Seleccionar el elemento con la clase content-with-sidebar
      const contentElement = document.querySelector('.content-with-sidebar');

      // Para acceder al botón de hamburguesa
      const hamburgerButton = document.querySelector('button[aria-label="Toggle menu"]');

      // Para acceder al elemento que controla la visibilidad del sidebar
      const sidebarElement = document.querySelector('aside.fixed');

      if (contentElement) {
        // Guardar el valor original del paddingLeft
        const originalPadding = contentElement.getAttribute('data-original-padding') ||
          window.getComputedStyle(contentElement).paddingLeft;

        // Guardar el valor original si no se ha guardado aún
        if (!contentElement.getAttribute('data-original-padding')) {
          contentElement.setAttribute('data-original-padding', originalPadding);
        }

        if (window.innerWidth < COLLAPSE_BREAKPOINT) {
          // En pantallas menores a nuestro breakpoint personalizado

          // 1. Ajustar el contenido para quitar el padding lateral
          (contentElement as HTMLElement).style.paddingLeft = '0px';

          // 2. Centrar el contenido correctamente
          const maxWidthContent = document.querySelector('.max-w-4xl');
          if (maxWidthContent) {
            (maxWidthContent as HTMLElement).style.width = '90%';
            (maxWidthContent as HTMLElement).style.maxWidth = '800px';
            (maxWidthContent as HTMLElement).style.marginLeft = 'auto';
            (maxWidthContent as HTMLElement).style.marginRight = 'auto';
          }

          // 3. Forzar que el sidebar esté oculto por defecto
          if (sidebarElement) {
            // Forzar la clase que oculta el sidebar en pantallas pequeñas
            sidebarElement.classList.remove('lg:translate-x-0');
            sidebarElement.classList.add('-translate-x-full');
          }

          // 4. Asegurarnos de que el botón de hamburguesa esté visible
          if (hamburgerButton) {
            (hamburgerButton as HTMLElement).classList.remove('lg:hidden');
          }
        } else {
          // En pantallas más grandes
          (contentElement as HTMLElement).style.paddingLeft = '60px';

          // Ajustar el máximo ancho del contenido
          const maxWidthContent = document.querySelector('.max-w-4xl');
          if (maxWidthContent) {
            (maxWidthContent as HTMLElement).style.width = '85%';
            (maxWidthContent as HTMLElement).style.maxWidth = '900px';
            (maxWidthContent as HTMLElement).style.marginLeft = 'auto';
            (maxWidthContent as HTMLElement).style.marginRight = 'auto';
          }

          // Restaurar el comportamiento normal del sidebar
          if (sidebarElement) {
            sidebarElement.classList.add('lg:translate-x-0');
            sidebarElement.classList.remove('-translate-x-full');
          }

          // Restaurar la visibilidad normal del botón de hamburguesa
          if (hamburgerButton) {
            (hamburgerButton as HTMLElement).classList.add('lg:hidden');
          }
        }
      }
    };

    // Sobreescribir el punto de quiebre de Tailwind para lg
    const styleOverride = document.createElement('style');
    styleOverride.textContent = `
      @media (max-width: ${COLLAPSE_BREAKPOINT}px) {
        .create-post-page .lg\\:translate-x-0 {
          transform: translateX(-100%) !important;
        }
        .create-post-page .lg\\:hidden {
          display: block !important;
        }
        .create-post-page .lg\\:w-60 {
          width: 0 !important;
        }
      }
    `;
    document.head.appendChild(styleOverride);

    // Aplicar los ajustes inmediatamente
    adjustLayout();

    // Aplicar los ajustes cuando cambie el tamaño de la ventana
    window.addEventListener('resize', adjustLayout);

    // Limpiar cuando el componente se desmonte
    return () => {
      document.body.classList.remove('create-post-page');
      document.head.removeChild(styleOverride);
      window.removeEventListener('resize', adjustLayout);

      // Restaurar el padding original
      const contentElement = document.querySelector('.content-with-sidebar');
      if (contentElement) {
        const originalPadding = contentElement.getAttribute('data-original-padding');
        if (originalPadding) {
          (contentElement as HTMLElement).style.paddingLeft = originalPadding;
        }
      }

      // Restaurar los estilos normales
      const sidebarElement = document.querySelector('aside.fixed');
      if (sidebarElement) {
        sidebarElement.classList.add('lg:translate-x-0');
        if (window.innerWidth >= 1024) {
          sidebarElement.classList.remove('-translate-x-full');
        }
      }

      // Restaurar el botón de hamburguesa
      const hamburgerButton = document.querySelector('button[aria-label="Toggle menu"]');
      if (hamburgerButton && window.innerWidth >= 1024) {
        (hamburgerButton as HTMLElement).classList.add('lg:hidden');
      }

      // Restaurar los estilos del contenido
      const maxWidthContent = document.querySelector('.max-w-4xl');
      if (maxWidthContent) {
        (maxWidthContent as HTMLElement).style.width = '';
        (maxWidthContent as HTMLElement).style.maxWidth = '';
        (maxWidthContent as HTMLElement).style.marginLeft = '';
        (maxWidthContent as HTMLElement).style.marginRight = '';
      }
    };
  }, []);

  // Este componente no renderiza nada visible
  return null;
}
