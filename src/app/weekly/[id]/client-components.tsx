"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import UserMenuNew from "@/components/UserMenuNew"
import MarkdownRenderer from "@/components/MarkdownRenderer"
import { createClient } from "@/lib/supabase/client"
import { useAuth } from "@/context/AuthContext"

// Tipos para los datos
interface WeeklyPost {
  id: string;
  title: string;
  content: string;
  weekLabel: string;
  year: number;
  week_number: number;
  created_at: string;
}

interface Reflection {
  id: string;
  title: string;
  content: string;
  created_at: string;
  author: string;
  comment_count: number;
}

export function ClientWeeklyPost({ postId }: { postId: string }) {
  const [post, setPost] = useState<WeeklyPost | null>(null);
  const [reflections, setReflections] = useState<Reflection[]>([]);
  const [loading, setLoading] = useState(true);
  const [reflectionsLoading, setReflectionsLoading] = useState(true);
  const supabase = createClient();
  const { user } = useAuth();

  // Cargar la publicación semanal
  useEffect(() => {
    const fetchWeeklyPost = async () => {
      setLoading(true);
      try {
        // Obtener la publicación semanal por ID
        const { data, error } = await supabase
          .from("weekly_posts")
          .select("*")
          .eq("id", postId)
          .single();

        if (error) {
          console.error("Error al cargar la publicación semanal:", error);
          return;
        }

        if (data) {
          // Generar etiqueta de semana
          const weekLabel = getWeekLabel(data.week_number, data.year);

          setPost({
            ...data,
            weekLabel
          });
        }
      } catch (err) {
        console.error("Error inesperado al cargar la publicación semanal:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchWeeklyPost();
  }, [postId, supabase]);

  // Cargar reflexiones asociadas a esta publicación semanal
  useEffect(() => {
    const fetchReflections = async () => {
      setReflectionsLoading(true);
      try {
        // Obtener reflexiones con información del autor
        const { data, error } = await supabase
          .from("weekly_reflections")
          .select(`
            id,
            title,
            content,
            created_at,
            profiles!weekly_reflections_user_id_fkey (
              username
            )
          `)
          .eq("weekly_post_id", postId)
          .order("created_at", { ascending: false });

        if (error) {
          console.error("Error al cargar reflexiones:", error);
          return;
        }

        // Obtener conteo de comentarios para cada reflexión
        const reflectionsWithComments = await Promise.all(data.map(async (reflection) => {
          const { count, error: countError } = await supabase
            .from("weekly_reflection_comments")
            .select("id", { count: "exact" })
            .eq("reflection_id", reflection.id);

          if (countError) {
            console.error("Error al contar comentarios:", countError);
          }

          return {
            id: reflection.id,
            title: reflection.title,
            content: reflection.content,
            created_at: formatDate(reflection.created_at),
            author: reflection.profiles?.username || "Usuario desconocido",
            comment_count: count || 0
          };
        }));

        setReflections(reflectionsWithComments);
      } catch (err) {
        console.error("Error inesperado al cargar reflexiones:", err);
      } finally {
        setReflectionsLoading(false);
      }
    };

    if (postId) {
      fetchReflections();
    }
  }, [postId, supabase]);

  // Función para generar etiqueta de semana con mayúsculas iniciales
  function getWeekLabel(weekNumber: number, year: number): string {
    const monthNames = [
      'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
      'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ];

    // Obtener fecha a partir del número de semana y año
    const date = getDateOfWeek(weekNumber, year);
    const month = date.getMonth();

    // Determinar ordinal de la semana en el mes
    const weekOfMonth = Math.ceil(date.getDate() / 7);
    const weekOrdinal = ["Primera", "Segunda", "Tercera", "Cuarta", "Quinta"][weekOfMonth - 1] || "Última";

    return `${weekOrdinal} Semana de ${monthNames[month]} de ${year}`;
  }

  // Función auxiliar para obtener fecha a partir de número de semana y año
  function getDateOfWeek(week: number, year: number): Date {
    const januaryFirst = new Date(year, 0, 1);
    const daysOffset = (week - 1) * 7;

    // Encontrar el primer día de la semana (lunes)
    const firstDayOfWeek = 1; // Lunes es 1, domingo es 0
    const firstDayOfYear = januaryFirst.getDay() || 7; // Convertir domingo (0) a 7
    const daysToFirstMonday = (firstDayOfWeek - firstDayOfYear + 7) % 7;

    const firstMonday = new Date(year, 0, 1 + daysToFirstMonday);
    const targetDate = new Date(firstMonday);
    targetDate.setDate(firstMonday.getDate() + daysOffset);

    return targetDate;
  }

  // Formatear fecha
  function formatDate(dateString: string): string {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    };

    return new Date(dateString).toLocaleDateString("es-ES", options);
  }
  return (
    <div className="min-h-screen bg-black text-white pt-24">
      <div className="max-w-3xl mx-auto px-4">
        {/* Botones de navegación */}
        <div className="mb-6 flex justify-between">
          <Link href="/weekly">
            <Button variant="outline" className="border-gray-600 hover:bg-gray-800 text-white">
              ← Volver a Publicaciones Semanales
            </Button>
          </Link>
          <a href="#reflexiones-comunidad">
            <Button
              variant="outline"
              className="border-gray-600 hover:bg-gray-700 text-white text-sm"
            >
              ↓ Ir a las Reflexiones de la Comunidad
            </Button>
          </a>
        </div>

        {loading ? (
          <div className="text-center py-12 text-gray-400">Cargando publicación semanal...</div>
        ) : !post ? (
          <div className="text-center py-12 text-gray-400">
            Publicación no encontrada.
          </div>
        ) : (
          <>            {/* Publicación semanal */}
            <div className="mb-10 bg-gray-800 rounded-lg p-6">
              <div className="text-green-500 font-medium mb-2">{post.weekLabel}</div>
              <h1 className="text-3xl font-bold text-white mb-6">{post.title}</h1>

              <div className="prose prose-invert max-w-none mb-8">
                <MarkdownRenderer content={post.content} />
              </div>

              {user && (
                <div className="mt-8">
                  <Link href={`/weekly/${post.id}/crear-reflexion`}>
                    <Button className="bg-green-600 hover:bg-green-700 text-white">
                      Añadir mi reflexión
                    </Button>
                  </Link>
                </div>
              )}
            </div>

            {/* Sección de reflexiones con mejor separación visual */}
            <div className="mt-20 mb-16">
              {/* Separador más visible */}
              <div className="border-t-2 border-gray-700 mb-16"></div>              {/* Sección de reflexiones con fondo diferenciado */}
              <section id="reflexiones-comunidad" className="bg-gray-900 rounded-lg p-6 border border-gray-800">
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-3xl font-bold text-white">Reflexiones de la Comunidad</h2>
                  <a href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({top: 0, behavior: 'smooth'}); }}>
                    <Button
                      variant="outline"
                      className="border-gray-600 hover:bg-gray-700 text-white text-sm"
                    >
                      ↑ Volver al Inicio de la Publicación
                    </Button>
                  </a>
                </div>

                {reflectionsLoading ? (
                  <div className="text-center py-8 text-gray-400">Cargando reflexiones...</div>
                ) : reflections.length === 0 ? (
                  <div className="text-center py-8 text-gray-400">
                    Aún no hay reflexiones para esta publicación semanal.
                    {user && (
                      <div className="mt-4">
                        <p className="mb-2">¿Quieres ser el primero en compartir tus ideas?</p>
                        <Link href={`/weekly/${post.id}/crear-reflexion`}>
                          <Button className="bg-green-600 hover:bg-green-700 text-white">
                            Añadir mi reflexión
                          </Button>
                        </Link>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="space-y-6">                    {reflections.map((reflection) => (
                      <Link key={reflection.id} href={`/weekly/reflexion/${reflection.id}`}>
                        <div className="p-4 bg-gray-800 rounded-lg transition-colors hover:bg-gray-700 border border-gray-700">
                          <h3 className="text-xl font-medium text-white mb-2">{reflection.title}</h3>
                          <div className="flex justify-between items-center text-sm text-gray-400">
                            <span>Por {reflection.author}</span>
                            <span>{reflection.created_at}</span>
                          </div>
                          <div className="mt-4 text-gray-300 line-clamp-3">
                            <MarkdownRenderer content={reflection.content.substring(0, 200) + (reflection.content.length > 200 ? "..." : "")} />
                          </div>
                          <div className="mt-4 text-sm text-gray-400">
                            {reflection.comment_count} {reflection.comment_count === 1 ? "comentario" : "comentarios"}
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </section>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
