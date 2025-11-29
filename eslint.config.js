import nextConfig from "eslint-config-next";

const config = [
  ...nextConfig,
  {
    ignores: [
      "tailwind.config.js",
      ".next/**",
      "node_modules/**",
    ],
  },
];

export default config;
