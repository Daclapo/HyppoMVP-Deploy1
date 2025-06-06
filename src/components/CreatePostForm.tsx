'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Link from 'next/link'
import MarkdownEditor from '@/components/MarkdownEditor'
import { useAuth } from '@/context/AuthContext'

interface CreatePostFormProps {
  compact?: boolean;
  onSuccess?: () => void;
  className?: string;
}

export default function CreatePostForm({ compact = false, onSuccess, className = '' }: CreatePostFormProps) {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [tagInput, setTagInput] = useState("")
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [availableTags, setAvailableTags] = useState<{id: number; name: string; category: string | null}[]>([])
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  // Obtenemos la información de autenticación del contexto
  const { user, session } = useAuth()

  // Cargar tags disponibles
  useEffect(() => {
    const loadTags = async () => {
      // Si no está autenticado, no continuamos
      if (!user) {
        return
      }

      // Cargar tags disponibles
      const { data: tagsData, error: tagsError } = await supabase
        .from("tags")
        .select("id, name, category")
        .order("name")

      if (tagsError) {
        console.error("Error al cargar tags:", tagsError)
      } else {
        setAvailableTags(tagsData || [])
      }
    }

    loadTags()
  }, [supabase, user])

  const handleAddTag = () => {
    if (!tagInput.trim()) return

    // Normalizar etiqueta (convertir a minúsculas)
    const normalizedTag = tagInput.trim().toLowerCase()

    // Limitar a 4 tags
    if (selectedTags.length >= 4) {
      setError("Máximo 4 etiquetas permitidas")
      return
    }

    // Evitar duplicados
    if (selectedTags.includes(normalizedTag)) {
      setError("Esta etiqueta ya ha sido añadida")
      return
    }

    setSelectedTags([...selectedTags, normalizedTag])
    setTagInput("")
    setError(null)
  }

  const handleRemoveTag = (tag: string) => {
    setSelectedTags(selectedTags.filter(t => t !== tag))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!title.trim()) {
      setError("El título es obligatorio")
      return
    }

    if (!content.trim()) {
      setError("El contenido es obligatorio")
      return
    }

    if (!user || !session) {
      setError("Necesitas iniciar sesión para crear una publicación")
      router.push("/login")
      return
    }

    setLoading(true)
    setError(null)

    // Mostrar información sobre el tamaño del contenido
    console.log(`Tamaño del contenido: ${content.length} caracteres`)

    // Añadir un timeout para detectar si hay problemas de conexión
    const timeout = setTimeout(() => {
      console.log("La operación está tardando más de lo esperado (10 segundos)")
    }, 10000)

    try {
      // Crear la publicación usando el ID del usuario directamente del contexto
      console.log("Iniciando creación de publicación...")
      const { data: post, error: postError } = await supabase
        .from("posts")
        .insert({
          user_id: user.id,
          title,
          content,
          upvote_count: 0
        })
        .select()
        .single()

      clearTimeout(timeout)

      if (postError) {
        console.error("Error al crear la publicación:", postError)
        setError(`Error al crear la publicación: ${postError.message}`)
        setLoading(false)
        return
      }

      // Procesar tags
      console.log("Post creado con éxito, procesando tags...")
      if (selectedTags.length > 0) {
        try {
          for (const tagName of selectedTags) {
            // Verificar si el tag ya existe
            let tagId: number | null = null

            console.log(`Buscando tag: ${tagName}`)
            const { data: existingTag, error: tagSearchError } = await supabase
              .from("tags")
              .select("id")
              .eq("name", tagName)
              .maybeSingle()

            if (tagSearchError) {
              console.error(`Error al buscar tag ${tagName}:`, tagSearchError)
              continue
            }

            if (existingTag) {
              tagId = existingTag.id
              console.log(`Tag existente encontrado: ${tagName} (ID: ${tagId})`)
            } else {
              // Crear nuevo tag
              console.log(`Creando nuevo tag: ${tagName}`)
              const { data: newTag, error: newTagError } = await supabase
                .from("tags")
                .insert({ name: tagName })
                .select()
                .single()

              if (newTagError) {
                console.error(`Error al crear tag ${tagName}:`, newTagError)
                continue
              }

              tagId = newTag.id
              console.log(`Nuevo tag creado: ${tagName} (ID: ${tagId})`)
            }

            // Asociar tag con el post
            if (tagId && post) {
              console.log(`Asociando tag ${tagName} (ID: ${tagId}) con post ${post.id}`)
              const { error: linkError } = await supabase
                .from("post_tags")
                .insert({
                  post_id: post.id,
                  tag_id: tagId
                })

              if (linkError) {
                console.error(`Error al asociar tag ${tagName} con post:`, linkError)
              }
            }
          }
        } catch (tagError) {
          console.error("Error procesando tags:", tagError)
          // No bloqueamos la creación del post si falla algún tag
        }
      }

      console.log("Publicación creada con éxito, redirigiendo...")

      // Limpiar el formulario
      setTitle('')
      setContent('')
      setSelectedTags([])

      // Callback si se proporciona
      if (onSuccess) {
        onSuccess()
      }

      // Redirigir a la página principal o refrescar
      if (!compact) {
        router.push("/")
      }

      router.refresh()
    } catch (err) {
      clearTimeout(timeout)
      console.error("Error al crear la publicación:", err)

      // Mostrar más detalles del error
      let errorMessage = "Ocurrió un error al crear la publicación";
      if (err instanceof Error) {
        errorMessage += `: ${err.message}`;
        console.error("Stack:", err.stack);
      } else if (typeof err === 'object' && err !== null) {
        errorMessage += `: ${JSON.stringify(err)}`;
      }

      setError(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  // Si no está autenticado, mostrar mensaje de inicio de sesión
  if (!user) {
    return (
      <div className={`p-6 bg-gray-800 rounded-lg shadow-md ${className}`}>
        <h2 className="text-xl font-semibold mb-4">Crear publicación</h2>
        <div className="text-center py-6">
          <p className="text-gray-300 mb-4">Necesitas iniciar sesión para crear una publicación</p>
          <Link href="/login">
            <Button className="bg-green-600 hover:bg-green-500">
              Iniciar sesión
            </Button>
          </Link>
        </div>
      </div>
    )
  }
  return (
    <div className={`${compact ? 'p-4' : 'p-6'} bg-gray-800 rounded-lg shadow-md ${className}`}>
      {error && (
        <div className="bg-red-500/20 border border-red-500 text-red-200 p-3 rounded-md mb-6">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Título */}
        <div>
          <label htmlFor="title" className="block text-sm font-medium mb-1">
            Título
          </label>
          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="bg-gray-800 border-gray-700 text-white w-full"
            placeholder="Título de tu publicación"
            maxLength={100}
          />
        </div>

        {/* Contenido */}
        <div>
          <label htmlFor="content" className="block text-sm font-medium mb-1">
            Contenido (Markdown)
          </label>          <MarkdownEditor
            value={content}
            onChange={setContent}
            placeholder="Escribe el contenido de tu publicación usando Markdown..."
            minHeight={compact ? "200px" : "500px"}
            maxHeight={compact ? "400px" : "700px"}
          />
        </div>

        {/* Tags */}
        <div>
          <label htmlFor="tags" className="block text-sm font-medium mb-1">
            Etiquetas (máximo 4)
          </label>
          <div className="flex">
            <Input
              id="tags"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              className="bg-gray-800 border-gray-700 text-white flex-grow"
              placeholder="Añadir etiqueta"
              maxLength={20}
            />
            <Button
              type="button"
              onClick={handleAddTag}
              className="ml-2 bg-gray-700 hover:bg-gray-600"
              disabled={selectedTags.length >= 4}
            >
              Añadir
            </Button>
          </div>

          {/* Tags sugeridos */}
          {availableTags.length > 0 && (
            <div className="mt-2">
              <span className="text-sm text-gray-400">Etiquetas sugeridas:</span>
              <div className="flex flex-wrap gap-2 mt-1">
                {availableTags.slice(0, 8).map((tag) => (
                  <button
                    key={tag.id}
                    type="button"
                    onClick={() => {
                      if (selectedTags.length < 4 && !selectedTags.includes(tag.name)) {
                        setSelectedTags([...selectedTags, tag.name])
                      }
                    }}
                    className="text-xs px-2 py-1 rounded-full bg-gray-700 text-gray-300 hover:bg-gray-600"
                    disabled={selectedTags.length >= 4 || selectedTags.includes(tag.name)}
                  >
                    {tag.name}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Tags seleccionados */}
          {selectedTags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3">
              {selectedTags.map((tag) => (
                <div key={tag} className="flex items-center bg-green-600/30 text-green-200 px-3 py-1 rounded-full">
                  {tag}
                  <button
                    type="button"
                    onClick={() => handleRemoveTag(tag)}
                    className="ml-2 text-green-200 hover:text-white"
                  >
                    &times;
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Botones */}
        <div className="flex justify-between items-center">
          {compact && (
            <Link href="/create-post">
              <Button type="button" variant="outline" className="text-gray-300 hover:text-white border-gray-600">
                Abrir editor completo
              </Button>
            </Link>
          )}
          <div className={`${compact ? '' : 'ml-auto'}`}>
            <Button
              type="submit"
              className="bg-green-600 text-white hover:bg-green-500 transition-colors"
              disabled={loading}
            >
              {loading ? "Publicando..." : "Publicar"}
            </Button>
          </div>
        </div>
      </form>
    </div>
  )
}
