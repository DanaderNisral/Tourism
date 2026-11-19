import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { TanStackRouterVite } from '@tanstack/router-plugin/vite'
import path from 'path'

// Vite configuration for Imbuto Safaris Theme (Jeskay Architecture)
// Supports TanStack Router file routes, React 19, Tailwind CSS v4,
// clean vendor chunking for mobile speed, and conditional Nitro Vercel preset.
export default defineConfig({
  plugins: [
    TanStackRouterVite({
      routesDirectory: './src/routes',
      generatedRouteTree: './src/routeTree.gen.ts',
      quoteStyle: 'single',
    }),
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom'],
          'vendor-router': ['@tanstack/react-router'],
          'vendor-query': ['@tanstack/react-query'],
          'vendor-radix': [
            '@radix-ui/react-dialog',
            '@radix-ui/react-accordion',
            '@radix-ui/react-popover',
            '@radix-ui/react-slider',
            '@radix-ui/react-checkbox',
            '@radix-ui/react-slot',
          ],
          'vendor-icons': ['lucide-react'],
        },
      },
    },
  },
  // Nitro preset configuration when deploying on Vercel
  ...(process.env.VERCEL
    ? {
        nitro: {
          preset: 'vercel',
        },
      }
    : {}),
})
