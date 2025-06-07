'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import MarkdownRenderer from '@/components/MarkdownRenderer';

interface CompactSuggestionsListProps {
  limit?: number;
  className?: string;
}

export default function CompactSuggestionsList({ limit = 3, className = '' }: CompactSuggestionsListProps) {
  const [suggestions, setSuggestions] = useState<{
    id: string;
    content: string;
    created_at: string;
    profiles: {
      username: string;
    } | null;
  }[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user, session } = useAuth();
  const supabase = createClient();
  const router = useRouter();

  useEffect(() => {
    const loadSuggestions = async () => {
      setLoading(true);
      setError(null);

      try {
        const { data, error } = await supabase
          .from('suggestions')
          .select(`
            id,
            content,
            created_at,
            profiles:user_id (username)
          `)
          .order('created_at', { ascending: false })
          .limit(limit);

        if (error) {
          throw error;
        }

        setSuggestions(data || []);
      } catch (error) {
        console.error('Error al cargar sugerencias:', error);
        setError('No se pudieron cargar las sugerencias');
      } finally {
        setLoading(false);
      }
    };

    loadSuggestions();
  }, [supabase, limit]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!session) {
      alert('Debes iniciar sesión para enviar una sugerencia');
      return;
    }

    if (!content.trim()) {
      alert('La sugerencia no puede estar vacía');
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from('suggestions')
        .insert({
          user_id: session.user.id,
          content: content.trim()
        });

      if (error) {
        throw error;
      }

      setContent('');

      // Actualizar la lista de sugerencias
      const { data: newSuggestions } = await supabase
        .from('suggestions')
        .select(`
          id,
          content,
          created_at,
          profiles:user_id (username)
        `)
        .order('created_at', { ascending: false })
        .limit(limit);

      setSuggestions(newSuggestions || []);
      router.refresh();
    } catch (error) {
      console.error('Error al enviar la sugerencia:', error);
      alert('Error al enviar la sugerencia. Por favor, intenta de nuevo más tarde.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };
  return (
    <div className={`bg-gray-800 rounded-lg shadow-md p-4 ${className}`}>
      <h2 className="text-3xl font-bold text-white mb-6">Sugerencias</h2>

      {error && (
        <div className="bg-red-500/20 border border-red-500 text-red-200 p-3 rounded-md mb-6">
          {error}
        </div>
      )}

      {/* Formulario para enviar sugerencias */}
      {user ? (
        <form onSubmit={handleSubmit} className="mb-6">
          <textarea
            className="w-full p-3 border rounded-md bg-gray-700 border-gray-600 text-white mb-2"
            rows={2}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Escribe tu sugerencia aquí..."
            disabled={isSubmitting}
          />
          <div className="flex justify-end">
            <Button
              type="submit"
              className="bg-green-600 hover:bg-green-500"
              disabled={isSubmitting || !content.trim()}
            >
              {isSubmitting ? 'Enviando...' : 'Enviar'}
            </Button>
          </div>
        </form>
      ) : (
        <div className="text-center py-2 mb-4">
          <p className="text-gray-300 mb-2">Inicia sesión para enviar una sugerencia</p>
          <Link href="/login">
            <Button className="bg-green-600 hover:bg-green-500">
              Iniciar sesión
            </Button>
          </Link>
        </div>
      )}

      {/* Lista de sugerencias */}
      {loading ? (
        <div className="text-center py-4 text-gray-400">Cargando sugerencias...</div>
      ) : suggestions.length === 0 ? (
        <div className="text-center py-4 text-gray-400">No hay sugerencias aún</div>
      ) : (
        <div className="space-y-3 mb-4">
          {suggestions.map((suggestion) => (
            <details key={suggestion.id} className="bg-gray-700/50 rounded-lg group">
              <summary className="p-3 cursor-pointer list-none flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <span className="font-medium text-sm text-gray-300">{suggestion.profiles?.username}</span>
                  <span className="text-xs text-gray-400">
                    {formatDate(suggestion.created_at)}
                  </span>
                </div>
                <svg
                  className="w-4 h-4 transition-transform group-open:rotate-180 text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </summary>
              <div className="p-3 pt-2 text-sm">
                <div className="prose prose-sm dark:prose-invert max-w-none">
                  <MarkdownRenderer content={suggestion.content} />
                </div>
              </div>
            </details>
          ))}
        </div>
      )}

      {/* Botón para ver todas las sugerencias */}
      <div className="text-center">
        <Link href="/suggestions">
          <Button variant="outline" className="w-full border-gray-600 text-gray-300 hover:text-white hover:bg-gray-700">
            Ver todas las sugerencias
          </Button>
        </Link>
      </div>
    </div>
  );
}
