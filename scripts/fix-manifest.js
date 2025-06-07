/**
 * Este script elimina específicamente las referencias al directorio (home)
 * en los archivos de manifiesto de cliente que causan errores en Vercel
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Obtener __dirname equivalente en ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🔍 EJECUTANDO FIX-MANIFEST: Buscando y eliminando referencias a (home) en el manifiesto de cliente...');

// Función para verificar si un directorio existe
function directoryExists(dirPath) {
  try {
    return fs.existsSync(dirPath) && fs.statSync(dirPath).isDirectory();
  } catch (err) {
    return false;
  }
}

// Función para crear un respaldo de un archivo
function backupFile(filePath) {
  if (!fs.existsSync(filePath)) return false;

  const backupPath = `${filePath}.bak`;
  try {
    fs.copyFileSync(filePath, backupPath);
    console.log(`✅ Backup creado: ${backupPath}`);
    return true;
  } catch (err) {
    console.error(`❌ Error al crear backup de ${filePath}:`, err);
    return false;
  }
}

// Función para buscar y eliminar líneas con patrón en un archivo
function removePatternFromFile(filePath, pattern) {
  if (!fs.existsSync(filePath)) return false;

  try {
    // Crear respaldo
    backupFile(filePath);

    // Leer contenido
    const content = fs.readFileSync(filePath, 'utf8');
    const lines = content.split('\n');

    // Filtrar líneas que contienen el patrón
    const filteredLines = lines.filter(line => !line.includes(pattern));

    // Si no hubo cambios, no hacer nada
    if (filteredLines.length === lines.length) {
      console.log(`No se encontraron referencias a "${pattern}" en ${filePath}`);
      return false;
    }

    // Escribir contenido filtrado
    fs.writeFileSync(filePath, filteredLines.join('\n'));
    console.log(`✅ Se eliminaron ${lines.length - filteredLines.length} líneas con "${pattern}" de ${filePath}`);
    return true;
  } catch (err) {
    console.error(`❌ Error al procesar ${filePath}:`, err);
    return false;
  }
}

// Función para buscar todos los archivos de manifiesto de cliente en .next
function findManifestFiles(dirPath, pattern = '_client-reference-manifest.js') {
  if (!directoryExists(dirPath)) return [];

  let results = [];

  try {
    const entries = fs.readdirSync(dirPath, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(dirPath, entry.name);

      if (entry.isDirectory()) {
        // Buscar recursivamente en subdirectorios
        results = results.concat(findManifestFiles(fullPath, pattern));
      } else if (entry.name.includes(pattern)) {
        // Encontrado un archivo de manifiesto
        results.push(fullPath);
      }
    }
  } catch (err) {
    console.error(`Error al buscar en ${dirPath}:`, err);
  }

  return results;
}

// Directorio .next
const nextDir = path.join(process.cwd(), '.next');

// Verificar si existe el directorio .next
if (!directoryExists(nextDir)) {
  console.log(`✅ El directorio .next no existe. Esto es normal durante el prebuild.`);
  console.log(`\n✨ ¡Proceso completado sin cambios!`);
  process.exit(0); // Salir con éxito
}

// Buscar archivos de manifiesto
console.log(`Buscando archivos de manifiesto en ${nextDir}...`);
const manifestFiles = findManifestFiles(nextDir);

if (manifestFiles.length === 0) {
  console.log(`❌ No se encontraron archivos de manifiesto de cliente.`);
} else {
  console.log(`✅ Se encontraron ${manifestFiles.length} archivos de manifiesto de cliente.`);

  // Procesar cada archivo de manifiesto
  let fixedCount = 0;
  for (const file of manifestFiles) {
    console.log(`Procesando ${file}...`);
    const wasFixed = removePatternFromFile(file, '(home)');
    if (wasFixed) fixedCount++;
  }

  console.log(`\n📝 Resumen:`);
  console.log(`- Total de archivos de manifiesto encontrados: ${manifestFiles.length}`);
  console.log(`- Archivos modificados: ${fixedCount}`);
}

// También eliminar cualquier archivo o directorio con (home) en la ruta
console.log(`\n🔍 Buscando archivos y directorios con (home) en el nombre...`);

function removeItemsWithPattern(dirPath, pattern) {
  if (!directoryExists(dirPath)) return 0;

  let count = 0;

  try {
    const entries = fs.readdirSync(dirPath, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(dirPath, entry.name);

      // Si el nombre coincide con el patrón, eliminarlo
      if (entry.name.includes(pattern)) {
        console.log(`Eliminando ${fullPath}...`);
        try {
          if (entry.isDirectory()) {
            fs.rmSync(fullPath, { recursive: true, force: true });
          } else {
            fs.unlinkSync(fullPath);
          }
          count++;
          console.log(`✅ Eliminado: ${fullPath}`);
        } catch (err) {
          console.error(`❌ Error al eliminar ${fullPath}:`, err);
        }
      }

      // Si es un directorio, buscar recursivamente
      if (entry.isDirectory() && !entry.name.includes(pattern)) {
        count += removeItemsWithPattern(fullPath, pattern);
      }
    }
  } catch (err) {
    console.error(`Error al procesar ${dirPath}:`, err);
  }

  return count;
}

const removedCount = removeItemsWithPattern(nextDir, '(home)');
console.log(`✅ Se eliminaron ${removedCount} archivos/directorios con (home) en el nombre.`);

console.log(`\n✨ ¡Proceso completado!`);
process.exit(0);
