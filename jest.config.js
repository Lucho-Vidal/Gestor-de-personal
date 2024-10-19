/** @type {import('ts-jest').JestConfigWithTsJest} **/
export default {
  preset: 'ts-jest',
  testEnvironment: 'node', // Define que el entorno de pruebas es Node.js
  transform: {
    "^.+\\.tsx?$": "ts-jest", // Usa ts-jest para transformar archivos TypeScript
  },
  testMatch: ["**/*.test.ts", "**/*.spec.ts"], // Asegúrate de que Jest busca los archivos de prueba con estos sufijos
  moduleFileExtensions: ["ts", "tsx", "js"], // Extensiones de archivos que Jest reconocerá
};
