"use client"

import { useState, useEffect, useCallback } from "react"
import { createClient } from "@/lib/supabase/client"
import Link from "next/link"
import Image from "next/image"
import { Star } from "lucide-react"
import { useAuth } from "@/context/AuthContext"

// Función para formatear fechas
function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const yesterday = new Date(now);
  yesterday.setDate(yesterday.getDate() - 1);

  // Si es hoy
  if (date.toDateString() === now.toDateString()) {
    return "Hoy";
  }

  // Si es ayer
  if (date.toDateString() === yesterday.toDateString()) {
    return "Ayer";
  }

  // Para cualquier otra fecha
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return date.toLocaleDateString("es-ES", options);
}

export default function AllPostsPage() {
  const [groupedPosts, setGroupedPosts] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const supabase = createClient();
  const { user } = useAuth();

  // Función para obtener el tiempo transcurrido
  const getTimeAgo = useCallback((date: string) => {
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - new Date(date).getTime()) / 1000);

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
  }, []);
  // Función para agrupar publicaciones por fecha
  const groupPostsByDate = useCallback((posts: {
    id: string;
    title: string;
    upvote_count: number;
    created_at: string;
    author: { username: string };
    timeAgo: string;
    isStarred: boolean;
  }[]) => {
    const grouped: Record<string, typeof posts> = {};

    posts.forEach(post => {
      const date = new Date(post.created_at);
      const dateStr = formatDate(date);

      if (!grouped[dateStr]) {
        grouped[dateStr] = [];
      }

      grouped[dateStr].push(post);
    });

    return grouped;
  }, []);

  // Efecto para cargar las publicaciones
  useEffect(() => {
    async function fetchAllPosts() {
      setLoading(true);

      try {
        // Obtener todas las publicaciones ordenadas por fecha (más recientes primero)
        const { data, error: fetchError } = await supabase
          .from('posts')
          .select(`
            id,
            title,
            content,
            created_at,
            upvote_count,
            user_id,
            profiles!posts_user_id_fkey (
              id,
              username
            )
          `)
          .order('created_at', { ascending: false });

        if (fetchError) {
          throw fetchError;
        }

        // Transformar los datos para incluir autor y timeAgo
        const formattedPosts = data.map(post => ({
          id: post.id,
          title: post.title || "",
          upvote_count: post.upvote_count || 0,
          created_at: post.created_at || new Date().toISOString(),
          author: {
            username: post.profiles?.username || "Usuario desconocido"
          },
          timeAgo: getTimeAgo(new Date(post.created_at || new Date().toISOString())),
          isStarred: false // Por ahora, no implementamos la funcionalidad de destacados
        }));

        // Agrupar por fecha
        const grouped = groupPostsByDate(formattedPosts);
        setGroupedPosts(grouped);
      } catch (err) {
        console.error("Error al cargar las publicaciones:", err);
        setError("No se pudieron cargar las publicaciones");
      } finally {
        setLoading(false);
      }
    }
    fetchAllPosts();
  }, [supabase, getTimeAgo, groupPostsByDate]);  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-12 pt-8 text-center">Todas las Publicaciones</h1>

      {/* Lista de publicaciones */}
      <div className="space-y-8 mt-16">
        {loading ? (
          <div className="text-center py-8 text-gray-400">Cargando publicaciones...</div>
        ) : error ? (
          <div className="text-center py-8 text-red-400">{error}</div>
        ) : Object.keys(groupedPosts).length === 0 ? (
          <div className="text-center py-8 text-gray-400">
            No hay publicaciones disponibles.
          </div>
        ) : (
          <div className="space-y-6">
            {Object.entries(groupedPosts).map(([date, postsForDate]) => (
              <div key={date} className="border-t border-gray-700 pt-4">
                <h2 className="text-xl font-semibold mb-3 text-gray-300">{date}</h2>
                <div className="space-y-2">
                  {postsForDate.map((post) => (
                    <div
                      key={post.id}
                      className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors border border-gray-700 shadow-sm"
                    >
                      {/* Upvotes */}
                      <div className="flex flex-col items-center text-gray-400 min-w-[40px]">
                        <div className="flex items-center">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-1">
                            <path d="M12 4L3 15H21L12 4Z" fill="green" />
                          </svg>
                          <span className="text-sm font-medium">{post.upvote_count}</span>
                        </div>
                      </div>

                      {/* Star */}
                      <div className="min-w-[20px]">
                        {post.isStarred && <Star className="w-4 h-4 text-yellow-500 fill-current" />}
                      </div>

                      {/* Title */}
                      <div className="flex-1">
                        <Link href={`/post/${post.id}`}>
                          <h3 className="text-white hover:text-gray-300 cursor-pointer text-lg">{post.title}</h3>
                        </Link>
                      </div>

                      {/* Author and Meta */}
                      <div className="flex items-center gap-4 text-gray-400 text-sm min-w-[200px] justify-end">
                        <Link href={`/profile/${post.author.username}`} className="hover:text-white">
                          {post.author.username}
                        </Link>
                        <span>{post.timeAgo}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
