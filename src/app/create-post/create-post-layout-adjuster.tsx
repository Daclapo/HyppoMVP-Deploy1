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

      // Para controlar la visibilidad del sidebar
      const sidebarElement = document.querySelector('.hide-duplicate-sidebar');

      if (contentElement) {
        // Guardar el valor original del paddingLeft
        const originalPadding = contentElement.getAttribute('data-original-padding') ||
          window.getComputedStyle(contentElement).paddingLeft;

        // Guardar el valor original si no se ha guardado aún
        if (!contentElement.getAttribute('data-original-padding')) {
          contentElement.setAttribute('data-original-padding', originalPadding);
        }

        // Aplicar el nuevo valor de padding según el ancho de pantalla
        if (window.innerWidth < COLLAPSE_BREAKPOINT) {
          // Cuando es menor que nuestro breakpoint personalizado, colapsar el sidebar
          (contentElement as HTMLElement).style.paddingLeft = '0px';

          // Hacer que el contenido se centre correctamente
          const maxWidthContent = document.querySelector('.max-w-4xl');
          if (maxWidthContent) {
            (maxWidthContent as HTMLElement).style.width = '90%';
            (maxWidthContent as HTMLElement).style.maxWidth = '800px'; // Reducir ancho máximo
            (maxWidthContent as HTMLElement).style.marginLeft = 'auto';
            (maxWidthContent as HTMLElement).style.marginRight = 'auto';
          }

          // Forzar el estado colapsado del sidebar
          if (sidebarElement) {
            sidebarElement.classList.add('force-mobile-view');
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

          // Restaurar el estado normal del sidebar
          if (sidebarElement) {
            sidebarElement.classList.remove('force-mobile-view');
          }
        }
      }
    };

    // Añadir estilos para forzar el modo móvil
    const style = document.createElement('style');
    style.textContent = `
      .force-mobile-view .lg\\:block {
        display: none !important;
      }
      .force-mobile-view .lg\\:hidden {
        display: block !important;
      }
    `;
    document.head.appendChild(style);

    // Aplicar los ajustes inmediatamente
    adjustLayout();

    // Aplicar los ajustes cuando cambie el tamaño de la ventana
    window.addEventListener('resize', adjustLayout);

    // Limpiar cuando el componente se desmonte
    return () => {
      document.body.classList.remove('create-post-page');
      document.head.removeChild(style);
      window.removeEventListener('resize', adjustLayout);

      // Restaurar el padding original
      const contentElement = document.querySelector('.content-with-sidebar');
      if (contentElement) {
        const originalPadding = contentElement.getAttribute('data-original-padding');
        if (originalPadding) {
          (contentElement as HTMLElement).style.paddingLeft = originalPadding;
        }
      }

      // Eliminar cualquier clase de forzado de modo móvil
      const sidebarElement = document.querySelector('.hide-duplicate-sidebar');
      if (sidebarElement) {
        sidebarElement.classList.remove('force-mobile-view');
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
