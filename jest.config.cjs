module.exports = {
  preset: "ts-jest",
  testEnvironment: "jest-environment-jsdom", // Asegúrate de configurar este entorno
  collectCoverage: true,
  coverageDirectory: "coverage",
  collectCoverageFrom: [
    "src/**/*.{js,jsx,ts,tsx}",
    "!src/**/*.d.ts",
    "!src/index.tsx"
  ],
  moduleNameMapper: {
    "\\.(css|scss)$": "identity-obj-proxy"
  }
};
