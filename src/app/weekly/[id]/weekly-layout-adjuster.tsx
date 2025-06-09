"use client"

import { useEffect } from 'react';

// Este componente aplica un estilo específico para ajustar el layout
// de la página weekly/[id] sin afectar otras páginas
export default function WeeklyLayoutAdjuster() {
  useEffect(() => {
    // Agregar una clase al body para identificar esta página específicamente
    document.body.classList.add('weekly-post-page');

    // Función para aplicar estilos específicos
    const adjustLayout = () => {
      // Seleccionar el elemento con la clase content-with-sidebar
      const contentElement = document.querySelector('.content-with-sidebar');
      if (contentElement) {
        // Guardar el valor original del paddingLeft
        const originalPadding = contentElement.getAttribute('data-original-padding') ||
          window.getComputedStyle(contentElement).paddingLeft;

        // Guardar el valor original si no se ha guardado aún
        if (!contentElement.getAttribute('data-original-padding')) {
          contentElement.setAttribute('data-original-padding', originalPadding);
        }

        // Aplicar el nuevo valor de padding
        (contentElement as HTMLElement).style.paddingLeft =
          window.innerWidth < 1024 ? '0px' : '30px';
      }
    };

    // Aplicar los ajustes inmediatamente
    adjustLayout();

    // Aplicar los ajustes cuando cambie el tamaño de la ventana
    window.addEventListener('resize', adjustLayout);

    // Limpiar cuando el componente se desmonte
    return () => {
      document.body.classList.remove('weekly-post-page');
      window.removeEventListener('resize', adjustLayout);

      // Restaurar el padding original
      const contentElement = document.querySelector('.content-with-sidebar');
      if (contentElement) {
        const originalPadding = contentElement.getAttribute('data-original-padding');
        if (originalPadding) {
          (contentElement as HTMLElement).style.paddingLeft = originalPadding;
        }
      }
    };
  }, []);

  // Este componente no renderiza nada visible
  return null;
}
