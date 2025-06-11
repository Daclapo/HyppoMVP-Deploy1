import DocumentClient from "../DocumentClient"
import { documentosDelaBiblioteca } from "../documentos"

export const metadata = {
  title: "Conductas deseadas | Hyppo",
  description: "Comportamientos que fomentan un diálogo constructivo en Hyppo",
}

const contenido = `
# Conductas Deseadas

### 1. Introducción: De los Principios a la Práctica

Mientras que el documento "Valores y Principios" define el *ethos* de Hyppo, este texto se enfoca en el *cómo*: las conductas y actitudes concretas que permiten que dichos valores se manifiesten en el día a día de la plataforma.

Estas no son reglas rígidas, sino un manual de estilo intelectual. Describen la disposición que se espera de cada miembro de la comunidad para asegurar que el diálogo sea productivo, riguroso y enriquecedor. Asumir estas conductas es el compromiso activo que cada usuario adquiere para contribuir a la calidad del ecosistema.

### 2. La Disposición Intelectual: Antes de Escribir

La calidad de una contribución comienza antes de teclear la primera palabra. Se fundamenta en una disposición mental específica.

*   **Curiosidad Proactiva:** No se limite a consumir contenido pasivamente. Explore temas fuera de su zona de confort, haga preguntas genuinas y tome la iniciativa para profundizar en las discusiones. La actitud deseada es la de un explorador, no la de un espectador.
*   **Escepticismo Metódico:** Cuestione las afirmaciones, especialmente aquellas que confirman sus propias creencias. El escepticismo en Hyppo no es cinismo, sino una herramienta para verificar la solidez de los argumentos. Pregúntese: "¿Qué evidencia refutaría esta idea? ¿Cuáles son los supuestos subyacentes?".
*   **Apertura a la Complejidad:** Rechace la tentación de las respuestas simples y las clasificaciones binarias. Muchos de los temas tratados aquí son inherentemente complejos y multifacéticos. Abrace la incertidumbre y los matices; es en ellos donde a menudo reside una comprensión más profunda.

### 3. La Práctica del Diálogo Constructivo

Durante la interacción, la forma es tan importante como el fondo.

*   **Escucha Activa y Caridad Interpretativa:** Antes de refutar, asegúrese de haber comprendido. Lea con atención el argumento de su interlocutor e intente reconstruirlo en su versión más fuerte y coherente (principio de caridad). Responda a esa versión, no a una caricatura de la misma.
*   **Argumentación, no Afirmación:** Distinga claramente entre una opinión personal y un argumento estructurado. Un argumento requiere premisas claras, un razonamiento lógico y, de ser posible, evidencia de soporte. El objetivo es persuadir mediante la razón, no imponer una creencia.
*   **Enfoque en la Síntesis, no en la Victoria:** El propósito de un debate en Hyppo no es "ganar" o demostrar la superioridad intelectual. El objetivo es avanzar colectivamente hacia una comprensión más precisa o una síntesis novedosa. Esté dispuesto a reconocer los puntos válidos de un argumento contrario e integrarlos en su propio pensamiento.

### 4. El Compromiso con la Autocorrección

La integridad intelectual se demuestra no en la infalibilidad, sino en la respuesta ante el error.

*   **Búsqueda Activa de la Refutación:** La conducta más valiosa en Hyppo es la voluntad de poner a prueba las propias convicciones. En lugar de buscar únicamente evidencia que confirme sus ideas, busque activamente contraargumentos y datos que puedan refutarlas. Como se ha dicho, "las personas que aciertan mucho, escuchan mucho y cambian mucho de opinión".
*   **Honestidad sobre la Incertidumbre:** Sea transparente sobre el grado de confianza que tiene en sus afirmaciones. Es perfectamente válido y deseable expresar dudas o señalar áreas de incertidumbre. Presentar una hipótesis como una certeza es intelectualmente deshonesto.
*   **Reconocimiento Explícito del Error:** Si un interlocutor le convence de un error en su razonamiento, reconózcalo abierta y claramente. Lejos de ser una derrota, es la culminación del proceso de aprendizaje y el mayor servicio que se puede hacer a la comunidad.

### 5. Conclusión: Una Aspiración Colectiva

Las conductas aquí descritas son exigentes. Requieren un esfuerzo consciente que va a contracorriente de muchas de las dinámicas del discurso digital actual. Nadie es perfecto en su aplicación, y los deslices son parte del proceso de aprendizaje.

Lo fundamental es el compromiso compartido de aspirar a este estándar. Al participar en Hyppo, cada usuario se convierte en guardián y cultivador de esta cultura. La salud y el éxito de esta plataforma dependen directamente de la voluntad colectiva de practicar estas conductas.
`

export default function ConductasDeseadas() {
  return (
    <DocumentClient
      content={contenido}
      documentId="conductas-deseadas"
      allDocuments={documentosDelaBiblioteca}
    />
  )
}
