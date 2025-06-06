"use client"

import MarkdownRenderer from "@/components/MarkdownRenderer"
import DocSidebar from "./DocSidebar"
import Link from "next/link"

interface DocumentClientProps {
  content: string;
  documentId: string;
  allDocuments: {
    id: string;
    title: string;
    description: string;
  }[];
}

export default function DocumentClient({ content, documentId, allDocuments }: DocumentClientProps) {
  const currentDocument = allDocuments.find(doc => doc.id === documentId);

  return (
    <div className="py-6">
      <div className="flex gap-8">
        <DocSidebar documents={allDocuments} currentDocId={documentId} />

        <div className="flex-1">
          <div className="mb-6">
            <div className="flex items-center mb-2">
              <Link href="/library" className="text-green-500 hover:text-green-400 mr-2">
                Biblioteca
              </Link>
              <span className="text-gray-500 mx-2">/</span>
              <h1 className="text-2xl font-bold text-white">{currentDocument?.title || "Documento"}</h1>
            </div>
            <p className="text-gray-300">
              {currentDocument?.description || ""}
            </p>
          </div>

          <div className="prose prose-invert max-w-none bg-gray-800 p-6 rounded-lg border border-gray-700">
            <MarkdownRenderer content={content} />
          </div>
        </div>
      </div>
    </div>
  )
}
