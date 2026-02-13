import { http, HttpResponse } from 'msw'

export const handlers = [
  // 例: ユーザー情報を取得するGETリクエストをモック
  http.get('https://api.example.com/user', () => {
    return HttpResponse.json({
      id: 'c7b44dff-9135-4110-aa77-17ff4509fb37',
      firstName: 'John',
      lastName: 'Maverick',
    })
  }),
]
