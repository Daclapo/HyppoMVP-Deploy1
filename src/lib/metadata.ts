// Define tipos para la metadata de páginas
import type { Metadata } from 'next';

interface PageMetadata {
  title: string;
  description: string;
}

// Función para generar el título dinámico
export const generatePageTitle = (pageName?: string): string => {
  if (!pageName) return 'Hyppo';
  return `${pageName} | Hyppo`;
};

// Objeto con metadata específica para cada ruta principal
export const pagesMetadata: Record<string, PageMetadata> = {
  home: {
    title: 'Hyppo',
    description: 'Un espacio para compartir y desarrollar ideas, hipótesis y argumentos de manera rigurosa.',
  },
  debates: {
    title: 'Debates | Hyppo',
    description: 'Participa en debates constructivos sobre diversos temas y desarrolla tu pensamiento crítico.',
  },
  semanal: {
    title: 'Semanal | Hyppo',
    description: 'Explora los temas semanales y reflexiones de la comunidad.',
  },
  biblioteca: {
    title: 'Biblioteca | Hyppo',
    description: 'Recursos y guías para mejorar tus habilidades de pensamiento crítico y argumentación.',
  },
  tags: {
    title: 'Etiquetas | Hyppo',
    description: 'Explora contenido por categorías y temas de interés.',
  },
  'all-posts': {
    title: 'Todas las publicaciones | Hyppo',
    description: 'Explora todas las publicaciones de la comunidad Hyppo.',
  },
  profile: {
    title: 'Perfil | Hyppo',
    description: 'Visualiza y gestiona tu perfil en Hyppo.',
  },
  login: {
    title: 'Iniciar sesión | Hyppo',
    description: 'Accede a tu cuenta en Hyppo.',
  },
  signup: {
    title: 'Crear cuenta | Hyppo',
    description: 'Únete a la comunidad de Hyppo.',
  },
  'create-post': {
    title: 'Crear publicación | Hyppo',
    description: 'Comparte tus ideas y reflexiones con la comunidad.',
  },
};

// Función para obtener la metadata de una página
export const getPageMetadata = (pageName: string): Metadata => {
  const metadata = pagesMetadata[pageName] || {
    title: generatePageTitle(pageName),
    description: 'Un espacio para compartir y desarrollar ideas, hipótesis y argumentos de manera rigurosa.',
  };
  return {
    title: metadata.title,
    description: metadata.description,
    icons: {
      icon: '/Hyppo-logo-blanco-v1.png',
      apple: '/Hyppo-logo-blanco-v1.png',
    },
  };
};
