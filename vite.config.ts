import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';

export default defineConfig(() => {
  // Configuração inteligente de base para GitHub Pages e subpastas de repositórios:
  // 1. Variável explícita: VITE_BASE, BASE_PATH ou VITE_BASE_PATH
  // 2. CI do GitHub Actions (detecta automaticamente GITHUB_REPOSITORY = 'usuario/repositorio')
  // 3. Fallback universal './' para garantir que os arquivos JS/CSS/assets resolvam na subpasta
  const repoFromEnv = process.env.GITHUB_REPOSITORY
    ? `/${process.env.GITHUB_REPOSITORY.split('/')[1]}/`
    : '';

  const base =
    process.env.VITE_BASE ||
    process.env.BASE_PATH ||
    process.env.VITE_BASE_PATH ||
    repoFromEnv ||
    './';

  return {
    base,
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      host: '0.0.0.0',
      port: 3000,
      allowedHosts: true as const,
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
