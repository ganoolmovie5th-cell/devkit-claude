'use client'

import { useEffect, useState } from 'react'

interface BIPEvent extends Event {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: string }>
}

export default function PwaPrompt() {
  const [deferred, setDeferred] = useState<BIPEvent | null>(null)
  const [offline, setOffline] = useState(false)

  useEffect(() => {
    const onPrompt = (e: Event) => {
      e.preventDefault()
      if (localStorage.getItem('pwa-dismissed')) return
      setDeferred(e as BIPEvent)
    }
    window.addEventListener('beforeinstallprompt', onPrompt)

    const setOn = () => setOffline(false)
    const setOff = () => setOffline(true)
    window.addEventListener('online', setOn)
    window.addEventListener('offline', setOff)
    setOffline(!navigator.onLine)

    return () => {
      window.removeEventListener('beforeinstallprompt', onPrompt)
      window.removeEventListener('online', setOn)
      window.removeEventListener('offline', setOff)
    }
  }, [])

  const install = async () => {
    if (!deferred) return
    await deferred.prompt()
    await deferred.userChoice
    setDeferred(null)
  }

  const dismiss = () => {
    setDeferred(null)
    localStorage.setItem('pwa-dismissed', '1')
  }

  return (
    <>
      {offline && (
        <div className="fixed top-14 left-1/2 -translate-x-1/2 z-[95] px-3 py-1.5 bg-amber-500 text-white text-xs rounded-full shadow-lg">
          Offline — cached tools still work
        </div>
      )}
      {deferred && (
        <div className="fixed bottom-6 left-6 z-[90] max-w-xs bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg p-4">
          <button onClick={dismiss} className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 text-lg leading-none">&times;</button>
          <p className="font-semibold text-gray-900 dark:text-white text-sm">Install DevKit</p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Add DevKit to your home screen for offline access and faster launches.</p>
          <button onClick={install} className="mt-3 w-full px-3 py-1.5 text-xs bg-blue-600 text-white rounded-lg hover:bg-blue-700">Install</button>
        </div>
      )}
    </>
  )
}
