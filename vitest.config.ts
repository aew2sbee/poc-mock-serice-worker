// vitest.config.ts
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./vitest.setup.ts'],
    // 1. エイリアスの解決を確実にする
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
    // 2. CSS関連のパースエラーを防ぎ、テスト速度を向上させる
    css: true,
  },
  // 必要に応じてNext.jsの挙動に寄せるための設定
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})