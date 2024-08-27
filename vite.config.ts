import { defineConfig } from 'vite';
import pkg from './package.json';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  base: process.env.NODE_ENV === 'production' ? `/${pkg.name}` : '/',
  plugins: [react()],
});
