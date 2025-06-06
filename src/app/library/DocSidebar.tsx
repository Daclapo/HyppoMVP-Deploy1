"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

interface DocSidebarProps {
  documents: {
    id: string;
    title: string;
  }[];
  currentDocId?: string;
}

export default function DocSidebar({ documents, currentDocId }: DocSidebarProps) {
  const pathname = usePathname();

  return (
    <div className="w-64 bg-gray-800 p-4 rounded-lg border border-gray-700 sticky top-24">
      <h2 className="text-lg font-bold text-white mb-4 border-b border-gray-700 pb-2">Documentos</h2>
      <nav className="space-y-1">
        {documents.map((doc) => (
          <Link
            key={doc.id}
            href={`/library/${doc.id}`}
            className={`block px-3 py-2 rounded-md text-sm ${
              pathname.includes(doc.id)
                ? "bg-green-600 text-white font-medium"
                : "text-gray-300 hover:bg-gray-700 hover:text-white"
            }`}
          >
            {doc.title}
          </Link>
        ))}
      </nav>
      <div className="mt-6 pt-4 border-t border-gray-700">
        <Link
          href="/library"
          className="flex items-center text-sm text-gray-300 hover:text-white"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mr-2"
          >
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          Volver a la biblioteca
        </Link>
      </div>
    </div>
  );
}
