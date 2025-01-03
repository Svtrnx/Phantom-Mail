import React, { useState, useCallback } from 'react'
import { AnimatePresence } from 'framer-motion'
import { Toast } from './Toast'

type ToastType = "default" | "primary" | "secondary" | "success" | "warning" | "danger"

interface ToastMessage {
  id: number
  message: string
  description: string
  type: ToastType
}

let showToastFunction: ((message: string, description: string, type: ToastType) => void) | null = null

// Функция для отображения тоста, доступная глобально
export const showToast = (message: string, description: string, type: ToastType) => {
  if (showToastFunction) {
    showToastFunction(message, description, type)
  }
}

export const ToastManager: React.FC = () => {
  const [toasts, setToasts] = useState<ToastMessage[]>([])

  // Храним глобальную функцию для отображения тостов
  showToastFunction = useCallback((message: string, description: string, type: ToastType) => {
    const id = Date.now()
    setToasts((prevToasts) => [...prevToasts, { id, message, description, type }])
    setTimeout(() => {
      setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id))
    }, 7000)
  }, [])

  return (
    <div className="fixed bottom-4 left-4 space-y-2" style={{ position: 'absolute', bottom: 0, margin: '10px 10px' }}>
      <AnimatePresence>
        {toasts.map((toast) => (
          <Toast
            key={toast.id}
            message={toast.message}
            description={toast.description}
            type={toast.type}
            onClose={() => setToasts((prevToasts) => prevToasts.filter((t) => t.id !== toast.id))}
          />
        ))}
      </AnimatePresence>
    </div>
  )
}
