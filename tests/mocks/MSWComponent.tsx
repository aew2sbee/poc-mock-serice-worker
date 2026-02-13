"use client"
import { useEffect, useState } from "react"

export const MSWProvider = ({ children }: { children: React.ReactNode }) => {
  const [mswReady, setMswReady] = useState(false)

  useEffect(() => {
    const init = async () => {
      if (process.env.NODE_ENV === 'development') {
        const { worker } = await import('./browser')
        await worker.start()
        setMswReady(true)
      }
    }
    init()
  }, [])

  if (!mswReady && process.env.NODE_ENV === 'development') {
    return null // 初期化まで何も表示しない、またはLoaderを表示
  }

  return <>{children}</>
}
