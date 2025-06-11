'use client';

import { useState } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface TabProps {
  id: string;
  label: string;
  isActive: boolean;
  onClick: () => void;
}

function Tab({ id, label, isActive, onClick }: TabProps) {
  return (
    <button
      id={id}
      onClick={onClick}
      className={cn(
        "px-3 py-2 text-sm rounded-md transition-colors w-full text-left mb-1",
        isActive
          ? "bg-green-500/20 text-green-400 font-medium"
          : "text-gray-300 hover:bg-gray-700/50"
      )}
    >
      {label}
    </button>
  );
}

export default function AboutProject() {
  const [activeTab, setActiveTab] = useState<string>('vision');  const tabs = [
    { id: 'vision', label: 'Visión y Propósito' },
    { id: 'principios', label: 'Nuestros Principios' },
    { id: 'comunidad', label: '¿Para Quién es Hyppo?' },
    { id: 'marca', label: 'Sobre la Marca' },
    { id: 'fundamentos', label: 'Fundamentos' },
    { id: 'licencia', label: 'Derechos de Autor' },
  ];return (
    <div className="mt-20">
      <div id="sobre-proyecto" className="-mt-20 pt-20 invisible"></div>
      <section className="mb-24 border-t border-gray-800 pt-10">
      {/* Título oculto para SEO */}
      <h2 className="sr-only">Sobre el Proyecto</h2>{/* Contenido Estático Principal */}
      <div className="text-gray-200 mb-12">
        <div className="flex flex-col items-center gap-8 mb-8">
          <div className="w-full flex justify-center mb-6">
            <Image
              src="/Hyppo-txt-h-Prociono-blanco.png"
              alt="Logo de Hyppo"
              width={450}
              height={150}
              className="rounded-lg"
            />
          </div>

          <div className="w-full">
            <p className="mb-4 leading-relaxed text-center">
              Hyppo es un espacio digital donde el pensamiento crítico, la argumentación rigurosa
              y el intercambio respetuoso de ideas son el centro de todas las interacciones.
            </p>
            <p className="leading-relaxed text-center">
              A diferencia de las redes sociales tradicionales, Hyppo está diseñado para fomentar
              conversaciones profundas y significativas, priorizando la calidad sobre la cantidad,
              y la reflexión sobre la reacción inmediata.
            </p>
          </div>
        </div>
      </div>

      {/* Sistema de Tabs */}
      <div className="flex flex-col md:flex-row gap-6 bg-gray-800/50 rounded-lg p-6">
        {/* Sidebar con tabs */}
        <div className="md:w-1/4">
          <div className="flex flex-col">
            {tabs.map((tab) => (
              <Tab
                key={tab.id}
                id={tab.id}
                label={tab.label}
                isActive={activeTab === tab.id}
                onClick={() => setActiveTab(tab.id)}
              />
            ))}
          </div>
        </div>

        {/* Contenido dinámico */}
        <div className="md:w-3/4 border-l border-gray-700 pl-6 min-h-[300px]">
          {activeTab === 'vision' && (
            <div>
              <h2 className="text-2xl font-semibold mb-4 text-white">Visión y Propósito</h2>
              <p className="mb-4 leading-relaxed">
                  <span className="text-green-400 font-semibold">Nuestra Visión:</span> Impulsar un mundo donde el conocimiento colectivo avanza a través del diálogo razonado y la colaboración abierta.
              </p>
              <p className="leading-relaxed">
                  <span className="text-green-400 font-semibold">Nuestro Propósito:</span> Hyppo nace para cumplir una doble misión, creando un ecosistema para el pensamiento riguroso:
                </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><span className="font-semibold">Ser una Esfera Pública para el Debate:</span> Una infraestructura para el pensamiento colectivo que combate la polarización, la desinformación y el dogmatismo. Buscamos ser el lugar donde la sociedad pueda reflexionar sobre los grandes desafíos éticos, sociales y tecnológicos de nuestro tiempo, aplicando los principios de la democracia deliberativa para fomentar un entendimiento más profundo y soluciones consensuadas.</li>
                <li><span className="font-semibold">Actuar como un Laboratorio de Ideas</span>  Más allá del debate, Hyppo es un lugar para construir. Un espacio donde proponer, desarrollar y refinar ideas, hipótesis, análisis y observaciones de forma estructurada. Inspirados por el espíritu colaborativo de las 'Penny Universities', fomentamos que cualquier persona pueda aportar a la construcción del conocimiento, siguiendo una lógica rigurosa y transparente.</li>
              </ul>
            </div>
          )}

          {activeTab === 'principios' && (
            <div>
                <h2 className="text-2xl font-semibold mb-4 text-white">Nuestros Principios</h2>
                <p className="mb-4 leading-relaxed">La interacción en Hyppo se rige por los siguientes pilares, que definen la cultura y el ethos de la plataforma:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><span className="text-green-400 font-semibold">Rigor y Fundamentación:</span> Las ideas se evalúan por su solidez y la evidencia que las sustenta, no por la autoridad de quien las emite. Se espera que los argumentos estén construidos con claridad lógica y análisis crítico.</li>
                <li><span className="text-green-400 font-semibold">Apertura Intelectual:</span> El progreso del conocimiento requiere la disposición a cambiar de opinión. Esto implica la capacidad de analizar argumentos contrarios, reconocer las limitaciones del saber propio y aceptar una razón mejor fundamentada. El escepticismo constructivo es un motor; el dogmatismo, un freno.</li>
                <li><span className="text-green-400 font-semibold">Diálogo Respetuoso y Constructivo:</span> La crítica se aplica a los argumentos, no a los usuarios. El debate busca la comprensión mutua y el avance colectivo, no la victoria individual. La diversidad de perspectivas, expresada de forma respetuosa, es esencial para la riqueza de la discusión.</li>
                <li><span className="text-green-400 font-semibold">Transparencia Operativa:</span> El funcionamiento de la plataforma, incluyendo los criterios de moderación y promoción de contenidos, es público y explícito. La confianza se basa en la previsibilidad y la claridad de las reglas.</li>
                <li><span className="text-green-400 font-semibold">Construcción Colectiva:</span> Hyppo es una herramienta en desarrollo constante, moldeada por la comunidad. La plataforma y su contenido evolucionan a través de las aportaciones, sugerencias y la participación activa de sus usuarios.</li>
              </ul>
            </div>
          )}          {activeTab === 'comunidad' && (
            <div>
              <h2 className="text-2xl font-semibold mb-4 text-white">¿Para Quién es Hyppo?</h2>
              <p className="mb-4 leading-relaxed">
                  Hyppo se dirige a cualquier persona con curiosidad intelectual y un compromiso genuino con el diálogo riguroso. Es un espacio diseñado para pensadores, estudiantes, académicos, profesionales y todo individuo que busque un entorno para:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Compartir y desarrollar ideas con profundidad.</li>
                  <li>Participar en debates estructurados basados en la evidencia.</li>
                  <li>Exponerse a perspectivas diversas para enriquecer el propio entendimiento.</li>
                  <li>Aprender y fortalecer habilidades de pensamiento crítico, lógica y argumentación.</li>
                </ul>
                <br />
                <p className="leading-relaxed">
              La plataforma está abierta a cualquier nivel de experiencia o formación. Si bien el conocimiento especializado enriquece el debate, el requisito fundamental es la actitud. Es un lugar para quien tiene la voluntad de razonar, la humildad para escuchar y la disposición para poner a prueba sus propias convicciones.</p>
              </div>

          )}          {activeTab === 'marca' && (
            <div>
              <h2 className="text-2xl font-semibold mb-4 text-white">Sobre la Marca</h2>
              <p className="mb-4 leading-relaxed">
                La identidad de Hyppo es una fusión deliberada de etimología, mitología y simbolismo natural. Cada elemento está diseñado para reflejar la misión fundamental de la plataforma.
              </p>

              <h3 className="text-xl font-semibold mb-3 text-white">El Nombre: Hyppo</h3>
              <p className="mb-3">El nombre nace de la combinación de dos conceptos clave:</p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li><span className="font-semibold">Hypo-:</span> Prefijo derivado del griego hypo (ὑπό), que significa "debajo de" o "subyacente". Se encuentra en la raíz de "hipótesis" y captura la función de Hyppo como el sustrato o cimiento donde las ideas pueden germinar, desarrollarse y encontrar un fundamento sólido.</li>
                <li><span className="font-semibold">Hippo:</span> Abreviación de hipopótamo, el animal que actúa como símbolo central de la plataforma, aportando una profunda carga simbólica.</li>
              </ul>
              <br />

              <h3 className="text-xl font-semibold mb-3 text-white">El Logotipo: Símbolos en Sinergia</h3>
              <p className="mb-4">El logotipo representa la relación simbiótica entre un hipopótamo y un picabuey, dos seres que se benefician mutuamente y que, en conjunto, encapsulan el proceso intelectual que Hyppo busca fomentar.</p>
                <div className="flex flex-col md:flex-row gap-6 mb-4">
                <div className="md:w-2/3">
                  <h4 className="text-lg font-semibold mb-2 text-white">El Hipopótamo: El Espacio Protector y Fértil</h4>
                  <p className="mb-4">En las culturas del antiguo Nilo, y especialmente en la mitología egipcia, el hipopótamo es un poderoso símbolo de protección y fertilidad. La diosa Taweret, con cuerpo de hipopótamo, era la guardiana de los nacimientos y la nueva vida. En Hyppo, el hipopótamo representa un entorno seguro y nutritivo: un espacio donde las ideas pueden nacer y ser desarrolladas sin temor, protegidas por una estructura de diálogo riguroso.</p>
                </div>
                <div className="md:w-1/3 flex items-start justify-center">
                  <Image
                    src="/Taweret.svg"
                    alt="Taweret - Diosa egipcia con cuerpo de hipopótamo"
                    width={150}
                    height={150}
                    className="rounded-lg"
                  />
                </div>
              </div>

              <div className="mb-6">
                <h4 className="text-lg font-semibold mb-2 text-white">El Picabuey: La Idea en Evolución</h4>
                <p className="mb-4">El picabuey, el ave que se posa sobre el hipopótamo, representa la idea misma. Su rol en la simbiosis es limpiar y mantener sano al hipopótamo, eliminando parásitos. En nuestra plataforma, simboliza el proceso de refinamiento intelectual: la eliminación de "parásitos argumentales" (como falacias o desinformación) y la clarificación del pensamiento a través de la colaboración. Es la idea que "se posa" para ser analizada, se nutre del debate y, finalmente, "alza el vuelo", enriquecida y fortalecida.</p>
                <div className="flex justify-center mt-4">
                  <Image
                    src="/oxpecker-on-hippo.jpg"
                    alt="Picabuey sobre hipopótamo - Representación de la simbiosis"
                    width={300}
                    height={300}
                    className="rounded-lg"
                  />
                </div>
              </div>
            </div>
          )}          {activeTab === 'fundamentos' && (
            <div>
              <h2 className="text-2xl font-semibold mb-4 text-white">Fundamentos Conceptuales</h2>
              <p className="mb-4 leading-relaxed">
                Hyppo no nace en un vacío, sino que se construye sobre una rica tradición de pensamiento filosófico y social. Estos son algunos de nuestros pilares conceptuales más importantes:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><span className="text-green-400 font-semibold">La Esfera Pública y el Diálogo Racional (Jürgen Habermas):</span> Nuestra inspiración principal es la idea de una "esfera pública" donde los ciudadanos pueden debatir libremente para formar opinión a través de la razón. Hyppo está diseñado para ser una encarnación digital de este ideal, promoviendo una acción comunicativa orientada al entendimiento mutuo, no a la confrontación.</li>
                <li><span className="text-green-400 font-semibold">Las 'Penny Universities' y el Espíritu de la Ilustración:</span> Nos inspira el ambiente de los cafés europeos del siglo XVIII, donde por el precio de un café se accedía a un universo de debate sobre ciencia, política y filosofía. Queremos recuperar ese espíritu de intercambio abierto y meritocrático, donde el valor de una idea no depende del estatus de quien la propone.</li>
                <li><span className="text-green-400 font-semibold">La Sabiduría Colectiva (Wisdom of the Crowd):</span> Creemos en el principio de que un grupo diverso e independiente puede alcanzar soluciones y conocimientos más precisos que un único experto. La estructura de Hyppo está pensada para agregar y sintetizar las aportaciones individuales, buscando construir una inteligencia colectiva que sea mayor que la suma de sus partes.</li>
                <li><span className="text-green-400 font-semibold">Los Métodos de la Democracia Deliberativa:</span> Más allá de la teoría, Hyppo busca implementar prácticas concretas de la democracia deliberativa. Esto se traduce en formatos de debate que priorizan la reflexión sobre la inmediatez, mecanismos para asegurar la inclusión de diversas voces y un énfasis en alcanzar consensos razonados a través del intercambio de argumentos, en lugar de una simple agregación de votos o preferencias.</li>
              </ul>
            </div>
          )}          {activeTab === 'licencia' && (
            <div>
              <h2 className="text-2xl font-semibold mb-4 text-white">Derechos de Autor y Licencia</h2>
              <p className="mb-4 leading-relaxed">
                En Hyppo, fomentamos la libre circulación del conocimiento y el avance colectivo. Para garantizarlo, tanto el contenido que generas como el software que hace posible la plataforma tienen un enfoque de licenciamiento abierto.
              </p>

              <h3 className="text-xl font-semibold mb-3 text-white">Contenido de los Usuarios (Textos, ideas, argumentos):</h3>              <p className="mb-4 leading-relaxed">
                Todo el contenido que publicas en Hyppo (hipótesis, análisis, debates, comentarios, etc.) está protegido bajo la licencia <a href="https://creativecommons.org/licenses/by/4.0/" target="_blank" rel="noopener noreferrer" className="text-green-400 font-semibold hover:text-green-300">Creative Commons Attribution 4.0 International (CC BY 4.0)</a>.
              </p>

              <h4 className="text-lg font-semibold mb-2 text-white">¿Qué significa esto para tu contenido?</h4>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li><span className="font-semibold">Libre para compartir:</span> Otros usuarios y el público en general pueden copiar y redistribuir tu material en cualquier medio o formato.</li>
                <li><span className="font-semibold">Libre para adaptar:</span> Pueden remezclar, transformar y construir sobre tu material para cualquier propósito, incluso comercial.</li>
                <li><span className="font-semibold">Atribución obligatoria:</span> Siempre se debe dar crédito a tu autoría, enlazar a la licencia y, si se han hecho cambios, indicarlo. La atribución se hará referenciando tu usuario y la plataforma (ej: "Idea de @UsuarioHyppo en Hyppo").</li>
              </ul>
              <p className="mb-4 leading-relaxed">
                Esto asegura que tus ideas contribuyan activamente al conocimiento global, garantizando que siempre se reconozca tu autoría.
              </p>
              <br />

              <h3 className="text-xl font-semibold mb-3 text-white">El Software de Hyppo:</h3>              <p className="mb-4 leading-relaxed">
                El código fuente de la plataforma Hyppo es Open Source y está licenciado bajo la <a href="https://www.gnu.org/licenses/gpl-3.0.html" target="_blank" rel="noopener noreferrer" className="text-green-400 font-semibold hover:text-green-300">GNU General Public License v3 (GPLv3)</a>. Esto promueve la transparencia, la colaboración y asegura que Hyppo siempre pertenecerá a la comunidad.
              </p>
            </div>
          )}</div>
      </div>
    </section>
  </div>
  );
}
