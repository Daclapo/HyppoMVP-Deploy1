import DocumentClient from "../DocumentClient"
import { documentosDelaBiblioteca } from "../documentos"

export const metadata = {
  title: "Tolerancia | Hyppo",
  description: "Cómo practicar y promover la tolerancia en los debates de Hyppo",
}

const contenido = `
# Tolerancia

## ¿Qué es la tolerancia?

En Hyppo, entendemos la tolerancia no como una mera indiferencia o relativismo, sino como una virtud activa que implica el respeto por la dignidad de las personas y la disposición a considerar seriamente ideas diferentes a las nuestras, incluso cuando las encontramos erróneas o problemáticas.

La filósofa política Hannah Arendt escribió sobre la importancia de "visitar" perspectivas ajenas, de intentar ver el mundo desde otros puntos de vista sin necesariamente renunciar al nuestro. Esta práctica de "pensamiento ampliado" es central para nuestra concepción de la tolerancia.

## Los límites de la tolerancia

La paradoja de la tolerancia, formulada por Karl Popper, plantea que la tolerancia ilimitada conduce a la desaparición de la tolerancia. En otras palabras, si somos tolerantes con la intolerancia sin restricciones, los intolerantes pueden acabar destruyendo a los tolerantes.

En Hyppo, establecemos límites claros:

- **Toleramos las ideas, no los ataques personales**: Criticar una idea es aceptable; degradar o deshumanizar a quienes la sostienen no lo es.
- **Toleramos el desacuerdo, no la mala fe**: Valoramos las discrepancias honestas, pero no las tácticas deliberadamente engañosas.
- **Toleramos la diversidad de perspectivas, no la promoción de la discriminación**: Las opiniones sobre cómo organizar la sociedad son bienvenidas; los llamamientos a la hostilidad contra grupos no lo son.

## Practicando la tolerancia en Hyppo

### 1. Principio de caridad interpretativa

Interpreta los argumentos de los demás de la forma más razonable posible. Antes de responder críticamente, pregúntate: "¿Estoy entendiendo realmente lo que esta persona intenta comunicar?"

### 2. Reconocimiento de la falibilidad compartida

Todos somos falibles. Mantén presente que, así como otros pueden estar equivocados, tú también puedes estarlo, incluso en temas donde te sientes seguro.

### 3. Apertura epistémica

Estar dispuesto a considerar evidencia que contradiga tus creencias actuales. La apertura no significa ausencia de convicciones, sino disposición a revisarlas a la luz de buenos argumentos.

### 4. Curiosidad genuina

Acércate a las perspectivas diferentes con curiosidad. Pregunta para comprender, no solo para refutar. Las preguntas sinceras como "¿Qué te lleva a esa conclusión?" pueden abrir espacios de diálogo genuino.

### 5. Pluralismo sin relativismo

Reconoce que la diversidad de perspectivas es valiosa sin caer en el relativismo que sostiene que todas las opiniones son igualmente válidas. Algunas posiciones están mejor fundamentadas que otras.

## Beneficios de la tolerancia

La práctica de la tolerancia en nuestros debates nos ofrece múltiples beneficios:

- **Aprendizaje colectivo**: Las ideas se refinan al enfrentarse a desafíos y perspectivas diferentes.
- **Mayor precisión**: La crítica nos ayuda a identificar errores y matizar nuestras posiciones.
- **Clima de respeto**: Un entorno donde las personas se sienten seguras expresando ideas, incluso minoritarias o controvertidas.
- **Fomento de la creatividad**: La diversidad de perspectivas estimula el pensamiento innovador y soluciones no evidentes.

En Hyppo creemos que la tolerancia bien entendida es una herramienta esencial para el progreso intelectual y social. Al practicarla, no solo mejoramos la calidad de nuestras conversaciones, sino que contribuimos a una cultura que valora tanto la verdad como la dignidad humana.
`

export default function ToleranciaPage() {
  return (
    <DocumentClient
      content={contenido}
      documentId="tolerancia"
      allDocuments={documentosDelaBiblioteca}
    />
  )
}
