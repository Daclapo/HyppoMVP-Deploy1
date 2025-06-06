"use client"

import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import Link from "next/link"
import { Tag } from "lucide-react"

interface TagData {
  id: number;
  name: string;
  category: string | null;
  post_count: number;
}

interface GroupedTags {
  [category: string]: TagData[];
}

interface Post {
  id: string;
  title: string;
  upvote_count: number;
  created_at: string;
  author: {
    username: string;
  };
  timeAgo: string;
  isStarred: boolean;
}

export default function TagsPage() {
  const [groupedTags, setGroupedTags] = useState<GroupedTags>({});
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingPosts, setLoadingPosts] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const supabase = createClient();

  useEffect(() => {
    async function fetchTags() {
      setLoading(true);

      try {
        // Obtener etiquetas con conteo de publicaciones
        const { data, error: fetchError } = await supabase
          .from('tags')
          .select('id, name, category');

        if (fetchError) {
          throw fetchError;
        }

        // Para cada etiqueta, obtenemos el conteo de publicaciones
        const tagsWithCounts = await Promise.all(
          data.map(async (tag) => {
            const { count, error: countError } = await supabase
              .from('post_tags')
              .select('*', { count: 'exact', head: true })
              .eq('tag_id', tag.id);

            if (countError) {
              console.error(`Error al obtener conteo para tag ${tag.name}:`, countError);
              return { ...tag, post_count: 0 };
            }

            return { ...tag, post_count: count || 0 };
          })
        );

        // Ordenar por número de publicaciones (descendente)
        const sortedTags = tagsWithCounts.sort((a, b) => b.post_count - a.post_count);

        // Agrupar por categoría
        const grouped = groupTagsByCategory(sortedTags);
        setGroupedTags(grouped);
      } catch (err) {
        console.error("Error al cargar las etiquetas:", err);
        setError("No se pudieron cargar las etiquetas");
      } finally {
        setLoading(false);
      }
    }

    fetchTags();
  }, [supabase]);

  // Función para agrupar etiquetas por categoría
  function groupTagsByCategory(tags: TagData[]): GroupedTags {
    const grouped: GroupedTags = {};

    // Primero, agrupamos los que tienen categoría
    tags.forEach(tag => {
      const category = tag.category || "Sin categoría";

      if (!grouped[category]) {
        grouped[category] = [];
      }

      grouped[category].push(tag);
    });

    return grouped;
  }

  // Función para cargar publicaciones por etiqueta
  async function fetchPostsByTag(tagName: string) {
    setSelectedTag(tagName);
    setLoadingPosts(true);
    setPosts([]);

    try {
      // Primero obtenemos los IDs de las publicaciones con esta etiqueta
      const { data: tagData, error: tagError } = await supabase
        .from('tags')
        .select('id')
        .eq('name', tagName)
        .single();

      if (tagError) {
        throw tagError;
      }

      const { data: postTagsData, error: postTagsError } = await supabase
        .from('post_tags')
        .select('post_id')
        .eq('tag_id', tagData.id);

      if (postTagsError) {
        throw postTagsError;
      }

      if (postTagsData.length === 0) {
        setLoadingPosts(false);
        return;
      }

      // Extraemos los IDs de las publicaciones
      const postIds = postTagsData.map(item => item.post_id);

      // Ahora obtenemos los detalles de cada publicación
      const { data: postsData, error: postsError } = await supabase
        .from('posts')
        .select(`
          id,
          title,
          created_at,
          upvote_count,
          profiles!posts_user_id_fkey (
            id,
            username
          )
        `)
        .in('id', postIds)
        .order('created_at', { ascending: false });

      if (postsError) {
        throw postsError;
      }

      // Transformamos los datos
      const formattedPosts = postsData.map(post => ({
        id: post.id,
        title: post.title || "",
        upvote_count: post.upvote_count || 0,
        created_at: post.created_at || new Date().toISOString(),
        author: {
          username: post.profiles?.username || "Usuario desconocido"
        },
        timeAgo: getTimeAgo(new Date(post.created_at || new Date().toISOString())),
        isStarred: false
      }));

      setPosts(formattedPosts);
    } catch (err) {
      console.error(`Error al cargar publicaciones para la etiqueta ${tagName}:`, err);
      setError(`No se pudieron cargar las publicaciones para la etiqueta ${tagName}`);
    } finally {
      setLoadingPosts(false);
    }
  }

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
  return (
    <div className="max-w-4xl mx-auto px-6 py-4">
      <h1 className="text-2xl font-bold mb-6">Explorar por etiquetas</h1>

      {loading ? (
        <div className="text-center py-8 text-gray-400">Cargando etiquetas...</div>
      ) : error ? (
        <div className="text-center py-8 text-red-400">{error}</div>
      ) : (
        <div className="w-full">
          {/* Lista de etiquetas en una sola fila con scroll horizontal */}
          <div className="mb-8 pb-4 border-b border-gray-700">
            <h2 className="text-lg font-semibold mb-3 text-gray-300">Etiquetas populares</h2>
            <div className="flex flex-wrap gap-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent">
              {Object.entries(groupedTags).flatMap(([_, tagsInCategory]) =>
                tagsInCategory.map((tag) => (
                  <button
                    key={tag.id}
                    className={`flex items-center whitespace-nowrap p-2 rounded-lg transition-colors ${
                      selectedTag === tag.name
                        ? "bg-green-500 text-white"
                        : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                    }`}
                    onClick={() => fetchPostsByTag(tag.name)}
                  >
                    <Tag className="w-4 h-4 mr-1" />
                    <span className="text-sm">{tag.name}</span>
                    <span className="text-xs bg-gray-700 text-gray-300 px-2 py-0.5 rounded-full ml-2">
                      {tag.post_count}
                    </span>
                  </button>
                ))
              )}
            </div>
          </div>

          {/* Lista de publicaciones para la etiqueta seleccionada */}
          <div className="w-full">
            {selectedTag ? (
              <>
                <h2 className="text-xl font-semibold mb-4">
                  Publicaciones con la etiqueta <span className="text-green-500">#{selectedTag}</span>
                </h2>

                {loadingPosts ? (
                  <div className="text-center py-8 text-gray-400">Cargando publicaciones...</div>
                ) : posts.length === 0 ? (
                  <div className="text-center py-8 text-gray-400">
                    No hay publicaciones con esta etiqueta.
                  </div>
                ) : (
                  <div className="space-y-4">
                    {posts.map((post) => (
                      <div
                        key={post.id}
                        className="flex items-center gap-4 p-4 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors border border-gray-700 shadow-sm"
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
                )}
              </>
            ) : (
              <div className="flex flex-col items-center justify-center h-64 text-gray-400">
                <Tag className="w-12 h-12 mb-4 opacity-50" />
                <p className="text-lg">Selecciona una etiqueta para ver las publicaciones</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
