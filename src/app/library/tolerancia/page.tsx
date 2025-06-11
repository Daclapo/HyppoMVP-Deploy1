import DocumentClient from "../DocumentClient"
import { documentosDelaBiblioteca } from "../documentos"

export const metadata = {
  title: "Tolerancia | Hyppo",
  description: "Cómo practicar y promover la tolerancia en los debates de Hyppo",
}

const contenido = `
# Tolerancia: El Marco Protector del Diálogo

### 1. Definición: La Tolerancia como Disciplina Intelectual

En el ecosistema de Hyppo, la tolerancia no es indiferencia, relativismo moral o una aceptación pasiva de cualquier idea. Se concibe como una **disciplina intelectual activa** y una condición necesaria para el diálogo productivo.

Inspirados por pensadores como Roger-Pol Droit, entendemos la tolerancia como el esfuerzo consciente por comprender y considerar seriamente perspectivas que desafían las nuestras, incluso si las encontramos profundamente erróneas. No se trata de abandonar las propias convicciones, sino de practicar lo que Hannah Arendt denominó un "pensamiento ampliado": la capacidad de "visitar" mentalmente otros puntos de vista para enriquecer y poner a prueba el propio.

La tolerancia, por tanto, no es un fin en sí mismo. Es el medio que nos permite criticar ideas de manera rigurosa sin degradar a las personas, y es el marco que protege la diversidad de pensamiento de la que depende el progreso del conocimiento.

### 2. El Principio de Reciprocidad: Los Límites de la Tolerancia

Una comunidad comprometida con el diálogo abierto debe, paradójicamente, ser intolerante con los intentos de destruir ese mismo diálogo. Como advirtió el filósofo Karl Popper, la tolerancia ilimitada conduce inevitablemente a la desaparición de la tolerancia. Si una sociedad tolerante no está dispuesta a defenderse de los intolerantes, será aniquilada por ellos.

Hyppo se adhiere a este principio de reciprocidad y autodefensa. No se puede ser tolerante con quien busca silenciar a otros, prohibir el debate o suprimir la libertad de expresión para imponer su propia visión. Por ello, **no existe tolerancia sin una definición clara de lo intolerable**.

En Hyppo, los límites se establecen de la siguiente manera:

*   **Se toleran todas las ideas, no todas las conductas.** Se puede argumentar a favor de cualquier posición, por controvertida que sea, siempre que se haga dentro de las normas del discurso racional. Lo que no se tolera son los ataques *ad hominem*, el acoso, la deshumanización del interlocutor o la mala fe argumentativa (como la desinformación deliberada).
*   **Se tolera el desacuerdo, no la obstrucción.** Se puede discrepar, criticar y refutar cualquier argumento. Lo que no se tolera es la conducta orientada a sabotear el diálogo, como el *spamming*, la interrupción sistemática o los intentos de coordinar campañas de silenciamiento.
*   **Se tolera la crítica social, no la incitación al odio.** Se puede criticar cualquier institución, ideología o grupo social. Lo que no se tolera es la promoción activa de la hostilidad o la violencia contra grupos de personas definidos por su identidad (origen étnico, religión, género, orientación sexual, etc.).

La moderación en Hyppo actuará con firmeza para proteger estos límites, garantizando que la plataforma siga siendo un espacio viable para el libre intercambio de ideas.

### 3. La Práctica Activa de la Tolerancia

Más allá de los límites, la tolerancia es una habilidad que se cultiva activamente. Se manifiesta en las siguientes prácticas:

*   **Principio de Caridad Interpretativa:** Antes de responder, haga el esfuerzo de interpretar el argumento de su interlocutor de la forma más fuerte, coherente y razonable posible. Esto asegura que la crítica se dirige al núcleo de la idea y no a una versión debilitada de la misma.
*   **Asunción de la Falibilidad Propia:** Recuerde que, así como otros pueden estar equivocados, usted también puede estarlo. Aborde cada debate con la humildad de saber que sus propias creencias son provisionales y están sujetas a revisión.
*   **Apertura Epistémica:** Esté genuinamente dispuesto a considerar evidencia y argumentos que contradigan sus convicciones más arraigadas. La apertura no implica una falta de convicción, sino la primacía de la verdad sobre el dogma.
*   **Curiosidad Genuina:** Acérquese a las perspectivas diferentes con la intención de comprender, no solo de refutar. Preguntas como "¿Qué te lleva a esa conclusión?" o "¿Puedes explicarme mejor este punto?" son herramientas poderosas para un diálogo genuino.

### 4. Conclusión: Una Virtud Robusta

La tolerancia en Hyppo no es una invitación a la pasividad, sino una virtud robusta y fundamental. Es el compromiso de mantener abierto el espacio de la razón, incluso cuando es difícil, y de defenderlo activamente de aquellos que intentarían cerrarlo. Al practicarla, no solo mejoramos la calidad de nuestras conversaciones, sino que sostenemos la estructura misma que hace posible el proyecto de Hyppo.
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
