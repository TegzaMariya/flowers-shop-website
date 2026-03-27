import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import istanbul from 'vite-plugin-istanbul'; 

const isCypress = process.env.CYPRESS;

export default defineConfig(({ mode }) => {
  const plugins = [
    react(),
  ];

  if (isCypress || mode === 'test') {
    plugins.push(
      istanbul({
        include: 'src/**/*.{js,jsx,ts,tsx}', 
        
        exclude: ['node_modules', 'cypress/', 'src/main.jsx', 'src/contexts/**', 'src/hooks/**'], 

        extension: ['.js', '.jsx', '.ts', '.tsx'],

        cypress: true, 
        
        forceBuildInstrument: true,
      })
    );
  }

  return {
    plugins: plugins,
    resolve: {
        alias: {
            '~': '/src',
        },
    },
    css: {
        modules: {
            scopeBehaviour: 'local', 
        },
    },
  };
});