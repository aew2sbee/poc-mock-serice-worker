// src/components/UserProfile.test.tsx
import { render, screen, waitFor } from '@testing-library/react'
import { expect, test } from 'vitest'

import { http, HttpResponse } from 'msw'
import { UserProfile } from '@/client/components/UserProfile'
import { server } from '../../mocks/node'

test('正常系：APIから取得したユーザー名が表示されること', async () => {
  render(<UserProfile />)

  // 読み込み状態の確認
  expect(screen.getByText('読み込み中...')).toBeDefined()

  // MSW経由でデータが返ってくるのを待つ
  await waitFor(() => {
    expect(screen.getByText('こんにちは、Johnさん')).toBeDefined()
  })
})

test('異常系：APIエラー時にエラーメッセージが表示されること', async () => {
  // 特定のテストだけレスポンスを上書き（エラーをシミュレート）
  server.use(
    http.get('https://api.example.com/user', () => {
      return new HttpResponse(null, { status: 500 })
    })
  )

  render(<UserProfile />)

  await waitFor(() => {
    expect(screen.getByText('エラーが発生しました')).toBeDefined()
  })
})
