"use client"

import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { createClient } from "@/lib/supabase/client"
import Link from "next/link"
import { useAuth } from "@/context/AuthContext"
import CreatePostForm from "@/components/CreatePostForm"
import AboutProject from "@/components/AboutProject"
import SuggestionsList from "@/components/SuggestionsList"

// Definiciones de tipos básicos
interface Post {
  id: string;
  title: string;
  upvotes: number;
  author: string;
  timeAgo: string;
}

const filterTabs = [
  { name: "Recientes", active: true },
  { name: "Recomendadas", active: false },
]

export default function HomePage() {
  const [activeFilter, setActiveFilter] = useState("Recientes")
  const [posts, setPosts] = useState<Post[]>([]);
  const [allPosts, setAllPosts] = useState<Post[]>([]); // Almacenamos todos los posts cargados
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState(false); // Estado para controlar si la lista está expandida
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const supabase = createClient();

  // Usando el contexto de autenticación
  const { user } = useAuth();

  // Usando useCallback para prevenir la recreación de la función
  const loadPosts = useCallback(async (resetPage = false) => {
    setLoading(true);
    try {
      // Si es una nueva carga, resetear la página
      const currentPage = resetPage ? 0 : page;
      const limit = 20; // Siempre cargamos 20 posts
      const from = currentPage === 0 ? 0 : 10 + (currentPage - 1) * 20;

      console.log(`Cargando posts: Filtro=${activeFilter}, Página=${currentPage}, Desde=${from}, Límite=${limit}`);

      // Determinar el ordenamiento según el filtro activo
      const orderBy = activeFilter === "Recientes"
        ? { column: "created_at", ascending: false }
        : { column: "upvote_count", ascending: false };

      // Obtener los posts con información del autor
      const { data, error } = await supabase
        .from("posts")
        .select(`
          id,
          title,
          upvote_count,
          created_at,
          user_id,
          profiles!posts_user_id_fkey (
            id,
            username
          )
        `)
        .order(orderBy.column, { ascending: orderBy.ascending })
        .range(from, from + limit - 1);

      if (error) {
        console.error("Error al cargar posts:", error);
        return;
      }

      // Procesar los posts para el formato que necesitamos
      const formattedPosts = data.map((post) => {
        // Calcular tiempo relativo y manejar valores nulos
        const timeAgo = getTimeAgo(new Date(post.created_at || new Date().toISOString()));

        return {
          id: post.id,
          title: post.title || "",
          upvotes: post.upvote_count || 0,
          author: post.profiles?.username || "Usuario desconocido",
          timeAgo
        };
      });

      console.log(`Posts cargados: ${formattedPosts.length}`);

      // Guardar todos los posts cargados
      if (resetPage) {
        setAllPosts(formattedPosts);
      } else {
        setAllPosts(prev => [...prev, ...formattedPosts]);
      }

      // Actualizar la vista según si está expandido o no
      if (expanded) {
        if (resetPage) {
          setPosts(formattedPosts);
        } else {
          setPosts(prev => [...prev, ...formattedPosts]);
        }
      } else {
        // Si no está expandido, mostrar solo los primeros 10
        const postsToShow = resetPage 
          ? formattedPosts.slice(0, 10) 
          : [...allPosts, ...formattedPosts].slice(0, 10);
        
        setPosts(postsToShow);
      }

      // Actualizar la página
      if (!resetPage) {
        setPage(currentPage + 1);
      }
      
      // Determinar si hay más posts para cargar
      setHasMore(data.length === limit);
    } catch (err) {
      console.error("Error al cargar posts:", err);
    } finally {
      setLoading(false);
    }
  }, [page, activeFilter, supabase, expanded, allPosts]);
  // Cargar posts cuando cambia el filtro o al inicio
  useEffect(() => {
    // Función interna para evitar dependencia de loadPosts
    const initialLoad = async () => {
      // Resetear estado cuando cambia el filtro
      setPage(0);
      setPosts([]);
      setAllPosts([]);
      setExpanded(false);
      setLoading(true);
      await loadPosts(true);
    };
    
    initialLoad();
    // Solo recargar cuando cambia el filtro, no cuando cambia loadPosts
  }, [activeFilter]);

  // Función para calcular el tiempo relativo
  function getTimeAgo(date: Date): string {
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    const minute = 60;
    const hour = minute * 60;
    const day = hour * 24;
    const week = day * 7;
    const month = day * 30;
    const year = day * 365;

    if (diffInSeconds < minute) {
      return "ahora";
    } else if (diffInSeconds < hour) {
      const minutes = Math.floor(diffInSeconds / minute);
      return `${minutes}m`;
    } else if (diffInSeconds < day) {
      const hours = Math.floor(diffInSeconds / hour);
      return `${hours}h`;
    } else if (diffInSeconds < week) {
      const days = Math.floor(diffInSeconds / day);
      return `${days}d`;
    } else if (diffInSeconds < month) {
      const weeks = Math.floor(diffInSeconds / week);
      return `${weeks}sem`;
    } else if (diffInSeconds < year) {
      const months = Math.floor(diffInSeconds / month);
      return `${months}m`;
    } else {
      const years = Math.floor(diffInSeconds / year);
      return `${years}a`;
    }
  }
  // Función para expandir o colapsar la lista
  const handleExpandCollapse = useCallback(() => {
    if (expanded) {
      // Colapsar - mostrar solo los primeros 10
      setPosts(allPosts.slice(0, 10));
      setExpanded(false);
    } else {
      // Expandir - mostrar todos los posts cargados
      setPosts(allPosts);
      setExpanded(true);
    }
  }, [expanded, allPosts]);

  return (
    <div className="max-w-4xl mx-auto px-6">
      {/* Filtros */}
      <div className="flex mb-8 border-b border-gray-800 overflow-x-auto">
        {filterTabs.map((tab) => (
          <button
            key={tab.name}
            className={`px-4 py-2 mr-4 border-b-2 ${
              activeFilter === tab.name
                ? "border-green-500 text-green-500"
                : "border-transparent text-gray-400 hover:text-white"
            }`}
            onClick={() => {
              setActiveFilter(tab.name);
            }}
          >
            {tab.name}
          </button>
        ))}
      </div>

      {/* Lista de posts */}
      {loading && posts.length === 0 ? (
        <div className="text-center py-12 text-gray-400">Cargando publicaciones...</div>
      ) : posts.length === 0 ? (
        <div className="text-center py-12 text-gray-400">
          No hay publicaciones disponibles.
        </div>
      ) : (
        <div className="space-y-3 mb-6">
          {posts.map((post) => (
            <div
              key={post.id}
              className="p-3 bg-gray-800 rounded-lg transition-colors hover:bg-gray-700 border border-gray-700"
            >
              <Link href={`/post/${post.id}`}>
                <div className="flex items-center">
                  {/* Votos a la izquierda */}
                  <div className="w-10 text-center mr-4 flex flex-col items-center">
                    <div className="flex items-center">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-1">
                        <path d="M12 4L3 15H21L12 4Z" fill="green" />
                      </svg>
                      <span className="font-bold text-gray-300">{post.upvotes}</span>
                    </div>
                  </div>

                  {/* Título con espacio flexible */}
                  <div className="flex-1 min-w-0">
                    <h2 className="text-xl font-medium text-white truncate">{post.title}</h2>
                  </div>

                  {/* Autor y tiempo a la derecha con tamaño fijo */}
                  <div className="ml-4 flex flex-col items-end min-w-[120px]">
                    <span className="text-sm text-gray-300 truncate">{post.author}</span>
                    <span className="text-xs text-gray-400">{post.timeAgo}</span>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      )}      {/* Botón para cargar más o colapsar */}
      <div className="text-center py-4">
        {expanded ? (
          <Button
            className="bg-gray-800 hover:bg-gray-700 text-white"
            onClick={handleExpandCollapse}
            disabled={loading}
          >
            Colapsar
          </Button>
        ) : (
          allPosts.length > 10 && (
            <Button
              className="bg-gray-800 hover:bg-gray-700 text-white"
              onClick={handleExpandCollapse}
              disabled={loading}
            >
              Expandir listado
            </Button>
          )
        )}
        
        {!expanded && hasMore && (
          <Button
            className="bg-gray-800 hover:bg-gray-700 text-white ml-2"
            onClick={() => !loading && loadPosts(false)}
            disabled={loading}
          >
            {loading ? "Cargando..." : "Cargar más"}
          </Button>
        )}
      </div>{/* Sección para crear publicación */}
      <section id="crear-publicacion" className="mt-40 mb-40 border-t border-gray-800 pt-16">
        <h2 className="text-3xl font-bold text-white mb-8">Crea una nueva publicación</h2>
        <CreatePostForm compact={true} />
      </section>

      {/* Sección Sobre el Proyecto con tabs */}
      <AboutProject />      {/* Sección de Sugerencias */}
      <section id="sugerencias" className="mt-40 mb-40 border-t border-gray-800 pt-16">
        <h2 className="sr-only">Sugerencias</h2>
        <h3 className="text-2xl font-bold text-white mb-8 text-center">Envía tus sugerencias de mejora o adición</h3>
        <SuggestionsList />
      </section>
    </div>
  );
}
