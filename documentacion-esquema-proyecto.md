# Esquema del Proyecto Hyppo

## Descripción General
Hyppo es una plataforma de pensamiento crítico diseñada para compartir y desarrollar ideas, hipótesis y argumentos de manera rigurosa. La aplicación está construida con Next.js 15, React 19, TypeScript y utiliza Supabase como backend.

## Estructura Técnica

### Frontend
- **Framework:** Next.js 15.3.2 (App Router)
- **UI:** React 19.0.0 con Tailwind CSS 4
- **Lenguaje:** TypeScript 5
- **Estilos:** Tailwind CSS con componentes personalizados
- **Tipografía:** Geist Sans y Geist Mono

### Backend
- **Base de datos:** PostgreSQL (a través de Supabase)
- **Autenticación:** Supabase Auth
- **Almacenamiento:** Supabase Storage
- **API:** API Routes de Next.js + API de Supabase

## Estructura de Directorios

```
src/
├── app/                    # Rutas y páginas (Next.js App Router)
│   ├── all-posts/          # Página de listado de todas las publicaciones
│   ├── create-post/        # Creación de publicaciones
│   ├── debates/            # Funcionalidad de debates
│   ├── home/               # Página principal
│   ├── post/               # Visualización de publicaciones individuales
│   ├── profile/            # Perfiles de usuario
│   ├── weekly/             # Publicaciones semanales
│   └── ...
├── components/             # Componentes reutilizables
│   ├── ui/                 # Componentes de UI básicos
│   ├── CreatePostForm.tsx  # Formulario de creación de publicaciones
│   ├── MarkdownEditor.tsx  # Editor de Markdown
│   ├── Sidebar.tsx         # Barra lateral de navegación
│   └── ...
├── context/                # Contextos de React
│   ├── AuthContext.tsx     # Contexto de autenticación
│   └── ThemeContext.tsx    # Contexto de tema (claro/oscuro)
└── lib/                    # Utilidades y configuraciones
    ├── supabase/           # Cliente y configuración de Supabase
    └── types/              # Definiciones de tipos TypeScript
```

## Modelo de Datos

### Tablas Principales
- **profiles**: Perfiles de usuario vinculados a auth.users
- **posts**: Publicaciones creadas por los usuarios
- **tags**: Etiquetas para categorizar publicaciones
- **comments**: Comentarios en las publicaciones
- **upvotes**: Registro de votos positivos

### Tablas de Funcionalidad Semanal
- **weekly_posts**: Publicaciones semanales (temas)
- **weekly_reflections**: Reflexiones de usuarios sobre temas semanales
- **weekly_reflection_comments**: Comentarios en las reflexiones semanales

### Tablas de Debates y Sugerencias
- **debates**: Preguntas para debates
- **debate_arguments**: Argumentos en debates
- **debate_counterarguments**: Contraargumentos en debates
- **suggestions**: Sugerencias de contenido

## Características Principales
- Publicación de contenido con formato Markdown
- Sistema de votación (upvotes)
- Debates estructurados con argumentos y contraargumentos
- Temas semanales con reflexiones
- Perfiles de usuario
- Etiquetado y categorización de contenido
- Autenticación y autorización
- Interfaz responsiva y temática oscura

## Dependencias Principales
- React y React DOM 19.0.0
- Next.js 15.3.2
- Supabase Auth y Cliente JS
- React Markdown para renderizado de contenido
- Lucide React para iconos
- Tailwind CSS para estilos
