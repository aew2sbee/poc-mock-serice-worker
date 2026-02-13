# poc-mock-serice-worker
Mock Serice Workerについて検証する

## 1. 環境構築・インストール
MSWのインストール
```bash
pnpm add -D msw
```
テスト環境 (Vitest / Testing Library) のインストール
```bash
pnpm add -D vitest @vitejs/plugin-react jsdom @testing-library/react @testing-library/jest-dom @testing-library/user-event
```
ブラウザ用サービスワーカーの初期化
ブラウザ実行時（開発環境）でモックを有効にするためのファイルを生成します。
```bash
pnpm msw init public/ --save
```

## 2. 設定ファイルの作成
Vitest 設定 (vitest.config.ts)
```ts
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./vitest.setup.ts'],
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
```

テストセットアップ (vitest.setup.ts)
```ts
import '@testing-library/jest-dom'
import { beforeAll, afterEach, afterAll } from 'vitest'
import { server } from './src/mocks/node'

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())
```

## 3. MSW の構成 (tests/mocks/)
以下の3ファイルを作成して、モックの挙動を定義します。
- handlers.ts: APIのパスとレスポンスの定義
- browser.ts: ブラウザ環境用のセットアップ
- node.ts: Node.js/テスト環境用のセットアップ

## 4. 実行コマンド
```bash
pnpm test
```
