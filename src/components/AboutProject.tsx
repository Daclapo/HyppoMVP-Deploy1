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
  const [activeTab, setActiveTab] = useState<string>('vision');

  const tabs = [
    { id: 'vision', label: 'Visión y Propósito' },
    { id: 'principios', label: 'Nuestros Principios' },
    { id: 'comunidad', label: 'Nuestra Comunidad' },
    { id: 'marca', label: 'Sobre la Marca' },
    { id: 'fundamentos', label: 'Fundamentos' },
  ];
  return (
    <section id="sobre-proyecto" className="mt-24 mb-24 border-t border-gray-800 pt-10">
      <h2 className="text-3xl font-bold text-white mb-8">Sobre el Proyecto</h2>

      {/* Contenido Estático Principal */}
      <div className="text-gray-200 mb-12">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8 mb-8">
          <div className="md:w-1/3">
            <Image
              src="/Logo1-Oscuro.png"
              alt="Logo de Hyppo"
              width={300}
              height={300}
              className="rounded-lg"
            />
          </div>

          <div className="md:w-2/3">
            <p className="mb-4 leading-relaxed">
              Hyppo es un espacio digital donde el pensamiento crítico, la argumentación rigurosa
              y el intercambio respetuoso de ideas son el centro de todas las interacciones.
            </p>
            <p className="leading-relaxed">
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
                Hyppo es un MVP (Producto Mínimo Viable) que representa el primer paso de un conjunto de ideas mucho más amplias.
                Buscamos crear un espacio digital donde el pensamiento crítico, la argumentación rigurosa y el intercambio respetuoso
                de ideas sean el centro de todas las interacciones.
              </p>
              <p className="leading-relaxed">
                A diferencia de las redes sociales tradicionales, Hyppo está diseñado para fomentar conversaciones
                profundas y significativas, priorizando la calidad sobre la cantidad, y la reflexión sobre la reacción inmediata.
              </p>
            </div>
          )}

          {activeTab === 'principios' && (
            <div>
              <h2 className="text-2xl font-semibold mb-4 text-white">Nuestros Principios</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li><span className="text-green-400 font-semibold">Pensamiento crítico:</span> Fomentamos el análisis riguroso y la evaluación de ideas basadas en evidencia.</li>
                <li><span className="text-green-400 font-semibold">Diálogo constructivo:</span> Creemos en la importancia del intercambio respetuoso de perspectivas diversas.</li>
                <li><span className="text-green-400 font-semibold">Transparencia:</span> Nuestros procesos y decisiones son abiertos y explicables.</li>
                <li><span className="text-green-400 font-semibold">Accesibilidad:</span> El conocimiento y las herramientas para el pensamiento crítico deben estar al alcance de todos.</li>
                <li><span className="text-green-400 font-semibold">Mejora continua:</span> Tanto la plataforma como nuestra comunidad están en constante evolución y aprendizaje.</li>
              </ul>
            </div>
          )}

          {activeTab === 'comunidad' && (
            <div>
              <h2 className="text-2xl font-semibold mb-4 text-white">Nuestra Comunidad</h2>
              <p className="mb-4 leading-relaxed">
                Hyppo está dirigido a personas interesadas en compartir y desarrollar ideas de manera rigurosa y respetuosa.
                Damos la bienvenida a estudiantes, académicos, profesionales y cualquier persona con curiosidad intelectual
                y disposición para participar en conversaciones constructivas.
              </p>
              <p className="leading-relaxed">
                Valoramos la diversidad de perspectivas y experiencias, reconociendo que el verdadero aprendizaje
                ocurre cuando nos exponemos a ideas diferentes a las nuestras.
              </p>
              <Image
                src="/globe.svg"
                alt="Comunidad global"
                width={200}
                height={200}
                className="mx-auto mt-6"
              />
            </div>
          )}

          {activeTab === 'marca' && (
            <div>
              <h2 className="text-2xl font-semibold mb-4 text-white">Sobre la Marca</h2>
              <p className="mb-4 leading-relaxed">
                El nombre "Hyppo" deriva de "hipótesis", un concepto fundamental en el método científico y el pensamiento crítico.
                Representa nuestra creencia en la importancia de formular, probar y refinar ideas a través del diálogo y la evidencia.
              </p>
              <p className="leading-relaxed">
                Nuestro logotipo simboliza la conexión entre ideas y personas, así como el proceso iterativo de refinamiento
                del pensamiento a través del intercambio constructivo.
              </p>
            </div>
          )}

          {activeTab === 'fundamentos' && (
            <div>
              <h2 className="text-2xl font-semibold mb-4 text-white">Fundamentos Conceptuales</h2>
              <p className="mb-4 leading-relaxed">
                Hyppo se inspira en conceptos como las "Penny Universities" del siglo XVII, espacios informales donde
                personas de diversos orígenes podían compartir ideas pagando un centavo por una taza de café.
              </p>
              <p className="mb-4 leading-relaxed">
                También nos basamos en el concepto de la "Sabiduría de la Multitud", que sostiene que las decisiones
                colectivas pueden ser más acertadas que las individuales bajo ciertas condiciones.
              </p>
              <p className="leading-relaxed">
                Las ideas de Jürgen Habermas sobre la esfera pública y la democracia deliberativa, que enfatizan
                el rol del diálogo racional en la formación de consensos, también son pilares conceptuales de nuestra plataforma.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
