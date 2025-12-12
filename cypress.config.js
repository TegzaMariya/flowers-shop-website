import { defineConfig } from 'cypress';
import react from '@vitejs/plugin-react'; 

export default defineConfig({
  e2e: {
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}', 
    baseUrl: 'http://localhost:5173', 
  },

  component: {
    specPattern: 'src/**/*.cy.{js,jsx,ts,tsx}', 
    
    devServer: {
      framework: 'react',
      bundler: 'vite',    
      
      viteConfig: {
        plugins: [
          react(), 
        ],

        assetsInclude: ['**/*.css', '**/*.scss', '**/*.sass', '**/*.less'],
        
        build: {
            rollupOptions: {
                external: [
                    '**/*.css', '**/*.scss', '**/*.sass', '**/*.less'
                ]
            }
        }
      },
    },
  },
});