import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        category: resolve(__dirname, 'views/category.html'),
        login: resolve(__dirname, 'views/login.html'),
        passwordForget: resolve(__dirname, 'views/password-forgot.html'),
        passwordReset: resolve(__dirname, 'views/password-reset.html'),
        register: resolve(__dirname, 'views/register.html'),
        verifyEmail: resolve(__dirname, 'views/verify-email.html'),
      }
    }
  }
});
