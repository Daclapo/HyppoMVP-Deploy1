import BibliotecaClient from "./BibliotecaClient"
import { documentosDelaBiblioteca } from "./documentos"

export const metadata = {
  title: "Biblioteca | Hyppo",
  description: "Documentación y recursos sobre el pensamiento crítico en Hyppo",
}

export default function BibliotecaPage() {
  return <BibliotecaClient documentos={documentosDelaBiblioteca} />
}
