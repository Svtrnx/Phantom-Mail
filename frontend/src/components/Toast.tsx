import { motion } from 'framer-motion'
import { Alert } from '@nextui-org/react'

type ToastType = "default" | "primary" | "secondary" | "success" | "warning" | "danger"

interface ToastProps {
  message: string
  description: string
  type: ToastType
  onClose: () => void
}

export const Toast: React.FC<ToastProps> = ({ message, description, type, onClose }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -100, scale: 0.3 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
      className='mb-2 cursor-pointer'
      onClick={onClose}
    >
      <Alert
        color={type}
        title={message}
        variant="faded"
        description={description}
      />
    </motion.div>
  )
}
