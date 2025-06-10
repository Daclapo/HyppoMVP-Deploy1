"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import CreatePostForm from "@/components/CreatePostForm"
import { useAuth } from "@/context/AuthContext"
import CreatePostLayoutAdjuster from "./create-post-layout-adjuster"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function CreatePostPage() {
  const { user } = useAuth()
  const router = useRouter()

  // Efecto para resetear el scroll cuando el componente se monta
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Si no está autenticado, mostrar un mensaje o redirigir
  if (!user) {
    return null // No renderizar nada mientras verifica o redirige
  }

  return (
    <>
      {/* Este componente ajusta el layout específico para esta ruta */}
      <CreatePostLayoutAdjuster />

      <div className="max-w-4xl mx-auto mt-14">
        {/* Botón para volver/salir similar al de post/[id] */}
        <div className="flex justify-between mb-6">
          <Button
            onClick={() => router.push('/home')}
            variant="outline"
            className="border-gray-600 hover:bg-gray-800 text-white text-sm"
          >
            ← Salir
          </Button>
        </div>

        <h1 className="text-2xl font-bold mb-6">Crear publicación</h1>
        <CreatePostForm />
      </div>
    </>
  )
}
