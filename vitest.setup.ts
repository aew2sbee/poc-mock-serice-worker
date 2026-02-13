// vitest.setup.ts
import '@testing-library/jest-dom'
import { beforeAll, afterEach, afterAll } from 'vitest'
import { server } from './tests/mocks/node'

// テスト開始前にサーバーを起動
beforeAll(() => server.listen())

// 各テスト終了後にハンドラーをリセット（テスト間の干渉を防ぐ）
afterEach(() => server.resetHandlers())

// 全てのテスト終了後にサーバーを停止
afterAll(() => server.close())
