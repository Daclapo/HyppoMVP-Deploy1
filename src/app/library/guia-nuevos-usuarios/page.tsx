import DocumentClient from "../DocumentClient"
import { documentosDelaBiblioteca } from "../documentos"

export const metadata = {
  title: "Guía de nuevos usuarios | Hyppo",
  description: "Guía de introducción a la plataforma Hyppo para nuevos usuarios",
}

const contenido = `
# Guía para Nuevos Usuarios

### 1. Introducción: Propósito y Filosofía de Hyppo

Le damos la bienvenida a Hyppo. Esta plataforma ha sido concebida como una infraestructura para el diálogo razonado y la construcción colectiva del conocimiento. A diferencia de los foros de discusión convencionales y las redes sociales, Hyppo prioriza la calidad argumentativa, la profundidad del análisis y el rigor intelectual sobre la inmediatez de la reacción o la popularidad de una opinión.

El propósito de esta guía es doble: por un lado, ofrecer una orientación práctica sobre el funcionamiento de la plataforma; por otro, y de manera más fundamental, introducirle en la cultura y el ethos que definen a esta comunidad. La comprensión de estos principios es esencial para una participación fructífera y constructiva.

### 2. El Modelo de Hyppo: Un Ecosistema para el Pensamiento

Hyppo no es una entidad monolítica, sino un ecosistema con dos funciones interconectadas:

*   **Una Esfera Pública para la Deliberación:** Inspirada en el concepto de Jürgen Habermas, esta faceta de Hyppo funciona como un espacio para el debate riguroso sobre asuntos de interés general. Se busca trascender la mera agregación de preferencias individuales para fomentar un proceso de deliberación colectiva, donde las decisiones y consensos emergen del intercambio racional de argumentos.

*   **Un Laboratorio de Ideas y Análisis:** Hyppo también actúa como un repositorio estructurado para la formulación y el refinamiento de ideas, hipótesis y análisis. Siguiendo el espíritu colaborativo de las históricas *'Penny Universities'*, la plataforma permite que cualquier usuario, independientemente de sus credenciales, pueda contribuir a la construcción del conocimiento, siempre que lo haga siguiendo los estándares de rigor y lógica que se promueven.

### 3. El Perfil del Usuario: ¿A Quién se Dirige Hyppo?

Hyppo está diseñado para individuos que comparten un compromiso con la honestidad intelectual y el progreso del conocimiento. La plataforma es un entorno adecuado si usted:

*   Posee una curiosidad intelectual que le impulsa a explorar temas complejos y a buscar una comprensión profunda de los mismos.
*   Valora la coherencia lógica y la evidencia empírica como pilares de la argumentación.
*   Está dispuesto a someter sus propias creencias a un escrutinio crítico y a modificarlas ante la presentación de argumentos o datos superiores.
*   Concibe el diálogo no como una competición, sino como un método colaborativo para aproximarse a la verdad.
*   Se siente cómodo en un entorno que exige precisión conceptual y claridad expositiva.

La participación en Hyppo no está determinada por la afiliación académica o profesional, sino por la adhesión a esta actitud intelectual.

### 4. Navegación y Funcionalidades Principales

Para facilitar su integración, a continuación se describen las secciones fundamentales de la plataforma:

*   **Inicio:** Proporciona un flujo de las publicaciones más recientes y aquellas destacadas por su relevancia o calidad argumentativa. Es el punto de acceso principal a la actividad de la comunidad.
*   **Debates:** Esta es la sección central para la deliberación estructurada. Un debate se inicia a partir de una pregunta específica. Los usuarios pueden contribuir mediante **Argumentos** (a favor o en contra de la proposición inicial) y **Contraargumentos** (respuestas directas a un argumento existente). Este formato está diseñado para facilitar el seguimiento de las líneas de razonamiento.
*   **Semanal:** Un espacio dedicado a la reflexión en profundidad. Cada semana, se presenta un artículo extenso sobre un tema relevante. Se espera que las contribuciones en esta sección sean elaboradas y meditadas, funcionando como ensayos o análisis detallados en respuesta al texto principal.
*   **Etiquetas:** Sistema de clasificación temática del contenido. El uso de etiquetas permite una navegación precisa y la localización de todas las publicaciones relacionadas con un campo de interés específico.
*   **Biblioteca:** Archivo de documentos fundacionales sobre los principios, valores y metodologías de la plataforma. Este documento forma parte de ella.
*   **Sugerencias:** Canal oficial para que los usuarios propongan mejoras, reporten problemas o inicien discusiones sobre la propia plataforma.

### 5. Guía para la Contribución Intelectual

La calidad del ecosistema de Hyppo es un reflejo directo de la calidad de sus contribuciones. Para mantener un alto estándar de discurso, se recomienda seguir las siguientes directrices:

*   **Principio de Fundamentación:** Toda afirmación sustantiva debe ir acompañada de un razonamiento explícito, evidencia de soporte o una referencia a fuentes fiables. Las opiniones sin justificación tienen un valor limitado en este entorno.
*   **Distinción entre Persona e Idea:** La crítica es un pilar fundamental del avance intelectual, pero debe dirigirse exclusivamente a los argumentos, hipótesis o ideas presentadas, nunca al individuo que las expone. Se prohíben y moderarán activamente los ataques *ad hominem*.
*   **Humildad Epistémica:** Reconozca explícitamente las limitaciones de su propio conocimiento y el grado de incertidumbre de sus afirmaciones. La expresión de duda no es una debilidad, sino una marca de rigor intelectual.
*   **Precisión y Claridad:** Esfuércese por utilizar un lenguaje preciso y por estructurar sus textos de manera lógica y coherente. La claridad en la exposición es un prerrequisito para un debate productivo.
*   **Responsabilidad Intelectual:** Antes de publicar, considere si su contribución construye sobre el diálogo existente, introduce una nueva perspectiva relevante o clarifica un punto de confusión. Evite la repetición de argumentos ya expuestos sin añadir nuevo valor.

### 6. Formato de Publicaciones: Guía Completa de Uso de Markdown

La plataforma utiliza el lenguaje de marcado **Markdown** para la estructuración de textos. Su dominio es sencillo y permite una gran claridad visual. A continuación se presenta una guía de referencia con los comandos más comunes y útiles.

*   **Encabezados:** Se utilizan para estructurar el documento.
    \`\`\`
    # Encabezado Nivel 1 (Título principal)
    ## Encabezado Nivel 2 (Subtítulo)
    ### Encabezado Nivel 3 (Sección)
    \`\`\`

*   **Estilos de Texto:**
    \`\`\`
    *Texto en cursiva* o _Texto en cursiva_
    **Texto en negrita** o __Texto en negrita__
    ***Texto en negrita y cursiva***
    ~~Texto tachado~~
    \`\`\`

*   **Listas:**
    *   No ordenadas (con guiones o asteriscos):
        \`\`\`
        - Primer elemento
        - Segundo elemento
          - Subelemento anidado
        \`\`\`
    *   Ordenadas:
        \`\`\`
        1. Primer elemento
        2. Segundo elemento
        3. Tercer elemento
        \`\`\`

*   **Citas en Bloque:** Para referenciar las palabras de otro usuario o de una fuente externa.
    \`\`\`
    > Esta es una cita. Todo este párrafo será formateado como un bloque de cita.
    >
    > > También se pueden anidar citas dentro de otras.
    \`\`\`

*   **Enlaces:**
    \`\`\`
    [Texto visible del enlace](https://www.ejemplo.com)
    \`\`\`

*   **Imágenes:** Para insertar una imagen, necesita una URL pública de la misma. Puede subir la imagen a un servicio de alojamiento de imágenes (como Imgur, Postimage, etc.) y luego usar la URL directa.
    \`\`\`
    ![Texto alternativo para la imagen](https://www.ejemplo.com/ruta/a/la/imagen.jpg)
    \`\`\`
    *El texto alternativo es importante para la accesibilidad y se mostrará si la imagen no puede cargarse.*

*   **Código:**
    *   Código en línea: útil para mencionar una \`función()\` o una \`variable\` dentro de un párrafo.
        \`\`\`
        Mencionar la función \`miFuncion()\` en medio de una frase.
        \`\`\`
    *   Bloques de código: para fragmentos más largos. Puede especificar el lenguaje para el resaltado de sintaxis.
        \`\`\`
        \`\`\`javascript
        function saludo(nombre) {
          console.log("Hola, " + nombre);
        }
        \`\`\`
        \`\`\`

*   **Líneas Horizontales:** Para separar secciones de forma visual.
    \`\`\`
    ---
    ***
    ___
    \`\`\`
    *(Use tres o más guiones, asteriscos o guiones bajos en una línea separada).*

*   **Tablas:**
    \`\`\`
    | Encabezado 1 | Encabezado 2 | Encabezado 3 |
    |--------------|:------------:|-------------:|
    | Celda 1.1    |  Celda 1.2   |    Celda 1.3 |
    | Celda 2.1    |  Celda 2.2   |    Celda 2.3 |
    \`\`\`
    *Los dos puntos (:) en la línea de separación controlan la alineación de la columna (izquierda, centrada o derecha).*

*   **Notas al Pie (Footnotes):**
    \`\`\`
    Este es un texto con una nota al pie.[^1]

    [^1]: Y esta es la definición de la nota al pie, que aparecerá al final del documento.
    \`\`\`

### 7. Conclusión

Hyppo es una herramienta y una comunidad. Su éxito y utilidad dependen de la participación activa y responsable de sus miembros. Le invitamos a explorar, aprender y contribuir a la creación de un espacio de diálogo intelectualmente estimulante y socialmente relevante.
`

export default function GuiaNuevosUsuariosPage() {
  return (
    <DocumentClient
      content={contenido}
      documentId="guia-nuevos-usuarios"
      allDocuments={documentosDelaBiblioteca}
    />
  )
}
