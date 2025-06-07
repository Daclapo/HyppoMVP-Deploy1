"use client"

import React from "react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

interface MarkdownRendererProps {
  content: string;
}

/**
 * Componente para mostrar contenido en formato Markdown con características adicionales:
 * - Soporte para GFM (GitHub Flavored Markdown)
 * - Resaltado de sintaxis en bloques de código
 * - Soporte para HTML en línea
 * - Estilos mejorados para encabezados y otros elementos
 */
export default function MarkdownRenderer({ content }: MarkdownRendererProps) {
  if (!content) {
    return <div className="text-gray-400">No hay contenido disponible</div>;
  }
  return (
    <div className="prose prose-invert prose-sm sm:prose-base max-w-none">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
        components={{
          h1: ({node, ...props}) => <h1 className="text-3xl font-bold mt-6 mb-4 text-white" {...props} />,
          h2: ({node, ...props}) => <h2 className="text-2xl font-bold mt-6 mb-3 text-white" {...props} />,
          h3: ({node, ...props}) => <h3 className="text-xl font-bold mt-5 mb-3 text-white" {...props} />,
          h4: ({node, ...props}) => <h4 className="text-lg font-bold mt-4 mb-2 text-white" {...props} />,
          h5: ({node, ...props}) => <h5 className="text-base font-bold mt-4 mb-2 text-white" {...props} />,
          h6: ({node, ...props}) => <h6 className="text-sm font-bold mt-4 mb-2 text-white" {...props} />,
          p: ({node, ...props}) => <p className="mb-4 leading-relaxed" {...props} />,
          a: ({node, ...props}) => <a className="text-green-500 hover:text-green-400 underline" {...props} />,
          ul: ({node, ...props}) => <ul className="list-disc pl-6 mb-6" {...props} />,
          ol: ({node, ...props}) => <ol className="list-decimal pl-6 mb-6 ml-0" {...props} />,
          li: ({node, ...props}) => <li className="mb-2 pl-1" {...props} />,
          blockquote: ({node, ...props}) => (
            <blockquote className="border-l-4 border-green-500 pl-4 italic my-6" {...props} />
          ),          code({node, inline, className, children, ...props}: any) {
            const match = /language-(\w+)/.exec(className || '');
            return !inline && match ? (
              <SyntaxHighlighter
                style={vscDarkPlus}
                language={match[1]}
                PreTag="div"
                {...props}
              >
                {String(children).replace(/\n$/, '')}
              </SyntaxHighlighter>
            ) : (
              <code className={`${className} bg-gray-800 px-1 py-0.5 rounded text-sm`} {...props}>
                {children}
              </code>
            );
          }
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
