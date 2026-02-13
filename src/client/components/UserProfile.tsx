// src/components/UserProfile.tsx
"use client"
import { useEffect, useState } from 'react'

export const UserProfile = () => {
  const [user, setUser] = useState<{ firstName: string } | null>(null)
  const [error, setError] = useState(false)

  useEffect(() => {
    fetch('https://api.example.com/user')
      .then((res) => {
        if (!res.ok) throw new Error()
        return res.json()
      })
      .then((data) => setUser(data))
      .catch(() => setError(true))
  }, [])

  if (error) return <div>エラーが発生しました</div>
  if (!user) return <div>読み込み中...</div>

  return <h1>こんにちは、{user.firstName}さん</h1>
}
