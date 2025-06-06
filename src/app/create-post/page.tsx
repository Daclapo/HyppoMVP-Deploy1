"use client"
import Link from "next/link"
import Image from "next/image"
import UserMenuNew from "@/components/UserMenuNew"
import CreatePostForm from "@/components/CreatePostForm"
import { useAuth } from "@/context/AuthContext"

export default function CreatePostPage() {
  const { user } = useAuth()

  // Si no está autenticado, mostrar un mensaje o redirigir
  if (!user) {
    return null // No renderizar nada mientras verifica o redirige
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* Navbar básico */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center p-6 bg-black">
        <Link href="/">
          <div className="flex items-center">
            <Image src="/logo1-Oscuro.png" alt="Logo" width={48} height={48} className="rounded-lg mr-2" />
          </div>
        </Link>
        <UserMenuNew />
      </nav>

      <div className="flex">
        {/* Sidebar */}
        <aside className="fixed top-20 left-0 w-64 p-6 h-screen bg-black pt-[88px]">
          {/* Navigation Links - Top Section */}
          <nav className="space-y-4 mb-16">
            <Link href="/" className="block text-white hover:text-gray-300 text-lg">
              Inicio
            </Link>
            <Link href="/all-posts" className="block text-white hover:text-gray-300 text-lg">
              Todo
            </Link>
            <Link href="/tags" className="block text-white hover:text-gray-300 text-lg">
              Etiquetas
            </Link>
            <Link href="/debates" className="block text-white hover:text-gray-300 text-lg">
              Debates
            </Link>
            <Link href="/weekly" className="block text-white hover:text-gray-300 text-lg">
              Semanal
            </Link>
            <Link href="/library" className="block text-white hover:text-gray-300 text-lg">
              Biblioteca
            </Link>
          </nav>

          {/* Bottom Navigation */}
          <nav className="space-y-4 absolute bottom-46">
            <Link href="/create-post" className="block text-green-500 hover:text-green-400 text-lg font-medium">
              Crear Publicación
            </Link>
            <Link href="/home#sugerencias" className="block text-white hover:text-gray-300 text-lg">
              Sugerencias
            </Link>
            <Link href="/home#sobre-proyecto" className="block text-white hover:text-gray-300 text-lg">
              Sobre el Proyecto
            </Link>
          </nav>        </aside>        {/* Main Content */}
        <div className="flex-1 mt-[88px] pl-64 flex justify-center">
          <main className="max-w-4xl w-full p-6">
            <div className="flex items-center mb-6">
              <Link href="/" className="text-gray-400 hover:text-white flex items-center mr-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mr-1"
                >
                  <path d="M19 12H5M12 19l-7-7 7-7" />
                </svg>
                Volver
              </Link>
              <h1 className="text-2xl font-bold">Crear publicación</h1>
            </div>
            <CreatePostForm />
          </main>
        </div>
      </div>
    </div>
  )
}
