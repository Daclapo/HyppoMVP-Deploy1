import DocumentClient from "../DocumentClient"
import { documentosDelaBiblioteca } from "../documentos"

export const metadata = {
  title: "Valores y principios | Hyppo",
  description: "Los valores y principios fundamentales que guían la plataforma Hyppo",
}

const contenido = `
# Valores y Principios de la Plataforma

### 1. Introducción: El Ethos de Hyppo

Hyppo es más que un conjunto de herramientas; es un ecosistema diseñado con un propósito definido y regido por un ethos claro. Este documento articula los valores y principios fundamentales que constituyen ese ethos: el carácter normativo y la cultura intelectual que deben guiar toda interacción dentro de la plataforma.

Estos principios no son sugerencias, sino las **condiciones de posibilidad** para un diálogo racional, inclusivo y productivo. Su propósito es establecer un marco de confianza y legitimidad que permita a la comunidad cumplir con la misión de Hyppo: avanzar en el conocimiento colectivo y ofrecer un contrapunto riguroso a la degradación del discurso público contemporáneo. La adhesión a este marco es, por tanto, el requisito fundamental para la participación.

### 2. Pilares del Pensamiento y la Argumentación

La calidad del discurso en Hyppo se sostiene sobre tres pilares metodológicos.

**A. Racionalidad Comunicativa y Rigor Intelectual**

El núcleo de la plataforma es la búsqueda del entendimiento mutuo a través de la argumentación racional. Este principio se materializa en varias expectativas:

*   **Fundamentación de Afirmaciones:** Las ideas, hipótesis y argumentos deben estar sustentados por un razonamiento lógico explícito y, cuando sea aplicable, por evidencia empírica o referencias a fuentes fiables. Las aseveraciones no fundamentadas carecen de peso en el discurso.
*   **Claridad y Precisión:** Se espera un esfuerzo consciente por comunicar las ideas de manera clara, precisa y estructurada. La ambigüedad y la ofuscación son obstáculos para el diálogo. El lenguaje debe servir para iluminar, no para impresionar.
*   **Meritocracia Intelectual:** La evaluación de una contribución debe centrarse exclusivamente en la validez intrínseca y la solidez de su contenido, no en la identidad, reputación o autoridad de quien la emite.

**B. Escepticismo Constructivo y Anti-Dogmatismo**

La plataforma promueve una tensión saludable entre la apertura a nuevas ideas y el escrutinio riguroso de las mismas.

*   **El Deber del Cuestionamiento:** Se fomenta una actitud de cuestionamiento crítico hacia todas las ideas, incluidas las propias y las ampliamente aceptadas. El verdadero espíritu filosófico no consiste en tener ideas, sino en ponerlas a prueba.
*   **Rechazo a la Clasificación Rígida:** Se debe evitar la necesidad de encasillar cada idea dentro de una ideología o sistema preexistente. Las ideas deben ser evaluadas por sus méritos individuales. El pensamiento dogmático, que se aferra a conclusiones predeterminadas, es contrario al espíritu de indagación de la plataforma.

**C. Profundidad y Originalidad del Pensamiento**

En un entorno digital dominado por la economía de la atención y la superficialidad, Hyppo valora la reflexión genuina.

*   **Del Eco a la Síntesis:** El objetivo no es meramente repetir información, sino procesarla, analizarla críticamente y compartir el razonamiento propio que lleva a una conclusión. Se valora el pensamiento que conecta conceptos de forma novedosa o que extrae una nueva perspectiva de un conocimiento existente.
*   **Reflexión sobre Reacción:** La plataforma está diseñada para favorecer la deliberación meditada. Se espera que los usuarios se tomen el tiempo necesario para componer sus contribuciones, priorizando la profundidad sobre la velocidad y la inmediatez.

### 3. Principios de la Interacción y la Comunidad

Un diálogo productivo solo es posible en un entorno de seguridad psicológica y respeto intelectual.

**A. Ética del Discurso**

*   **Crítica a las Ideas, no a las Personas:** La crítica intelectual, por más severa que sea, es bienvenida y necesaria. Los ataques personales, descalificaciones *ad hominem* o cualquier forma de hostigamiento están estrictamente prohibidos y serán moderados con firmeza.
*   **Principio de Caridad Interpretativa:** Al responder a otro usuario, se debe hacer el esfuerzo de interpretar su argumento de la manera más fuerte y razonable posible antes de proceder a la crítica. Esto asegura que se está debatiendo con la mejor versión de la idea contraria, no con una caricatura.
*   **Inclusividad y Justicia Epistémica:** Todas las personas tienen derecho a participar en el debate en condiciones de igualdad. Se combatirá activamente cualquier forma de injusticia epistémica, donde se intenta desacreditar a un individuo por su origen, género o nivel educativo en lugar del contenido de su argumento.

**B. Humildad Epistémica**

El autoconocimiento es un prerrequisito para el pensamiento claro.

*   **Disposición al Cambio:** La máxima expresión de la honestidad intelectual es la voluntad de buscar activamente la refutación de las propias creencias y modificarlas cuando se presentan argumentos o evidencias superiores. La finalidad del diálogo en Hyppo no es "ganar", sino refinar el propio entendimiento.
*   **Conciencia de los Sesgos:** Se anima a los usuarios a ser conscientes de la influencia de las emociones y los sesgos cognitivos en el pensamiento. Reconocer las propias limitaciones es el primer paso para un razonamiento más objetivo.

### 4. Valores Operativos de la Plataforma

La confianza en Hyppo como infraestructura se basa en los siguientes compromisos operativos.

**A. Transparencia**

*   **Reglas Claras y Públicas:** Tanto las normas de la comunidad como los criterios de moderación y los mecanismos de promoción de contenidos son explícitos y accesibles para todos.
*   **Algoritmos Explicables:** Cualquier sistema de recomendación o clasificación de contenido se basará en principios simples y transparentes, alineados con los valores aquí descritos, evitando "cajas negras" que puedan ser percibidas como arbitrarias o manipuladoras.

**B. Construcción Colectiva**

*   **Desarrollo Comunitario:** Hyppo es una herramienta en constante evolución. Su naturaleza de código abierto (Open Source) permite que la comunidad participe directamente en su construcción técnica y conceptual a través del apartado de "Sugerencias".
*   **El Conocimiento como Bien Común:** El conocimiento generado dentro de Hyppo se considera un bien común, licenciado de forma abierta (ver documento sobre "Licencia y Derechos de Autor") para maximizar su difusión y utilidad social.
*   **Corresponsabilidad:** Cada miembro es corresponsable de mantener y mejorar la calidad del discurso, contribuyendo activamente a un entorno intelectualmente estimulante y respetuoso.
`

export default function ValoresPrincipios() {
  return (
    <DocumentClient
      content={contenido}
      documentId="valores-principios"
      allDocuments={documentosDelaBiblioteca}
    />
  )
}
