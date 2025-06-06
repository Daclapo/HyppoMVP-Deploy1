"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { createClient } from "@/lib/supabase/client"
import { useAuth } from "@/context/AuthContext"

// Tipo para publicaciones semanales
interface WeeklyPost {
  id: string;
  title: string;
  weekLabel: string;
  year: number;
  week_number: number;
  created_at: string;
}

export default function SemanalPage() {
  const router = useRouter();
  const [weeklyPosts, setWeeklyPosts] = useState<WeeklyPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const supabase = createClient();
  const { user } = useAuth();

  // Cargar publicaciones al iniciar
  useEffect(() => {
    async function loadWeeklyPosts() {
      setLoading(true);
      setError(null);
      try {
        // Obtener publicaciones semanales ordenadas por año y semana
        const { data, error } = await supabase
          .from("weekly_posts")
          .select("id, title, year, week_number, created_at")
          .order("year", { ascending: false })
          .order("week_number", { ascending: false });

        if (error) {
          console.error("Error al cargar publicaciones semanales:", error.message || JSON.stringify(error));
          // Si el error es que la tabla no existe, mostramos un mensaje específico pero no bloqueamos la carga
          if (error.message && error.message.includes("relation") && error.message.includes("does not exist")) {
            setWeeklyPosts([]);
            setError("La tabla de publicaciones semanales no existe en la base de datos.");
          } else {
            setError(`Error al cargar publicaciones: ${error.message}`);
          }        } else if (data) {
          // Procesar datos: añadir etiqueta de semana en formato "primera semana de junio de 2025"
          const processedPosts = data.map(post => {
            // Calcular la fecha de la semana
            const firstDayOfYear = new Date(post.year, 0, 1);
            const daysOffset = (post.week_number - 1) * 7;
            const weekDate = new Date(firstDayOfYear);
            weekDate.setDate(firstDayOfYear.getDate() + daysOffset);
              // Obtener el mes en español con mayúscula inicial
            const months = [
              'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
              'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
            ];
            const month = months[weekDate.getMonth()];

            // Determinar el ordinal de la semana (Primera, Segunda, etc.)
            const weekOrdinals = [
              'Primera', 'Segunda', 'Tercera', 'Cuarta', 'Quinta'
            ];
            // Calcular qué semana del mes es (puede ser aproximado)
            const weekOfMonth = Math.ceil(weekDate.getDate() / 7);
            const weekOrdinal = weekOfMonth <= 5 ? weekOrdinals[weekOfMonth - 1] : 'Última';

            return {
              ...post,
              weekLabel: `${weekOrdinal} Semana de ${month} de ${post.year}`
            };
          });
          setWeeklyPosts(processedPosts);
        }
      } catch (err) {
        console.error("Error al cargar publicaciones semanales:", err);
        setError("Ocurrió un error al cargar las publicaciones semanales.");
      } finally {
        setLoading(false);
      }
    }

    loadWeeklyPosts();
  }, [supabase]);
  return (
    <div className="bg-gray-900 rounded-lg p-6 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-4">Publicaciones Semanales</h1>
        <p className="text-gray-300 text-lg">
          Cada semana publicamos un artículo o pregunta de reflexión. Los usuarios pueden
          compartir sus pensamientos y debatir sobre estos temas en un formato estructurado.
        </p>
      </div>

      {/* Lista de publicaciones semanales */}
      {loading ? (
        <div className="text-center py-12 text-gray-400">Cargando publicaciones semanales...</div>
      ) : weeklyPosts.length === 0 ? (
        <div className="text-center py-12 text-gray-400">
          No hay publicaciones semanales disponibles.
        </div>
      ) : (
        <div className="space-y-6 mb-8">
          {weeklyPosts.map((post) => (
            <div
              key={post.id}
              className="p-5 bg-gray-800 rounded-lg transition-colors hover:bg-gray-700 border border-gray-700 cursor-pointer relative"
            >
              <div className="space-y-2">
                <div className="text-green-500 font-medium">{post.weekLabel}</div>
                <h2
                  className="text-xl font-medium text-white hover:underline"
                  onClick={() => router.push(`/weekly/${post.id}`)}
                >{post.title}</h2>
                <div className="flex justify-between items-center pt-2 relative">
                  <div></div>
                  {/* Este div está absolutamente posicionado y aislado del padre */}
                  <div
                    className="button-container absolute right-0 bottom-0 z-30"
                    style={{ pointerEvents: 'auto' }}
                  >
                    <a
                      href={`/weekly/${post.id}#reflexiones-comunidad`}
                      style={{ pointerEvents: 'auto' }}
                      className="relative inline-block"
                    >
                      <Button
                        variant="outline"
                        className="text-sm border-gray-600 hover:bg-gray-500 hover:text-white"
                      >
                        Ver reflexiones
                      </Button>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Mensaje para administradores (agregar publicación semanal) */}
      {user && (
        <div className="mt-12 p-6 bg-gray-800 rounded-lg border border-gray-700">
          <h2 className="text-xl font-semibold text-white mb-2">¿Eres administrador?</h2>
          <p className="text-gray-300 mb-4">
            Si tienes permisos de administrador, puedes crear una nueva publicación semanal.
          </p>
          <Link href="/weekly/crear">
            <Button className="bg-green-600 hover:bg-green-700 text-white">
              Crear nueva publicación semanal
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
}
