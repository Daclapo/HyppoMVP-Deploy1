/**
 * Este script realiza la limpieza previa a la construcción para resolver problemas
 * con el directorio especial "(home)" en Next.js
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Ruta al directorio de la aplicación
const appDir = path.join(process.cwd(), 'src', 'app');
const nextCacheDir = path.join(process.cwd(), '.next');

// Función para verificar si existe un directorio
const directoryExists = (dirPath) => {
  try {
    return fs.existsSync(dirPath) && fs.statSync(dirPath).isDirectory();
  } catch (err) {
    return false;
  }
};

// Función para eliminar directorios recursivamente
const removeDirectory = (dirPath) => {
  if (directoryExists(dirPath)) {
    console.log(`Eliminando directorio: ${dirPath}`);
    try {
      fs.rmSync(dirPath, { recursive: true, force: true });
      console.log(`✅ Directorio eliminado: ${dirPath}`);
    } catch (err) {
      console.error(`❌ Error al eliminar directorio ${dirPath}:`, err);
    }
  } else {
    console.log(`Directorio ya no existe: ${dirPath}`);
  }
};

// Función para eliminar archivos que contienen cierto patrón
const removeFilesWithPattern = (dir, pattern) => {
  if (!directoryExists(dir)) return;

  try {
    const files = fs.readdirSync(dir, { withFileTypes: true });

    for (const file of files) {
      const fullPath = path.join(dir, file.name);

      if (file.isDirectory()) {
        // Recursivamente buscar en subdirectorios
        removeFilesWithPattern(fullPath, pattern);
      } else if (file.name.includes(pattern)) {
        // Eliminar archivo si contiene el patrón
        console.log(`Eliminando archivo: ${fullPath}`);
        fs.unlinkSync(fullPath);
      }
    }
  } catch (err) {
    console.error(`Error al procesar directorio ${dir}:`, err);
  }
};

// Función para crear página de inicio alternativa si no existe
const ensureHomePage = () => {
  const mainPagePath = path.join(appDir, 'page.tsx');
  const homePagePath = path.join(appDir, 'home', 'page.tsx');

  // Crear directorio 'home' si no existe
  if (!directoryExists(path.join(appDir, 'home'))) {
    console.log('Creando directorio home...');
    fs.mkdirSync(path.join(appDir, 'home'), { recursive: true });
  }

  // Si no existe page.tsx en /home pero existe en /app, copiarlo
  if (!fs.existsSync(homePagePath) && fs.existsSync(mainPagePath)) {
    console.log('Copiando página principal a home/page.tsx...');
    fs.copyFileSync(mainPagePath, homePagePath);
  }
};

// Principal función de limpieza
const cleanup = () => {
  console.log('🧹 Iniciando limpieza previa a la compilación...');

  // 1. Eliminar directorio (home) si existe
  const homeDir = path.join(appDir, '(home)');
  removeDirectory(homeDir);

  // 2. Limpiar cache de Next.js
  if (directoryExists(nextCacheDir)) {
    console.log('Limpiando caché de Next.js...');
    removeDirectory(nextCacheDir);
  }

  // 3. Eliminar archivos del manifiesto relacionados con (home)
  if (directoryExists(path.join(nextCacheDir, 'server'))) {
    removeFilesWithPattern(
      path.join(nextCacheDir, 'server'),
      '(home)'
    );
  }

  // 4. Asegurar que existe una página home alternativa
  ensureHomePage();

  console.log('✅ Limpieza completada con éxito');
};

// Ejecutar limpieza
cleanup();
