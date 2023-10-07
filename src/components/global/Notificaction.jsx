'use client'
import ModalPortal from './Modal'
import { useModal } from '../CustomHooks/useModal'
import { useEffect } from 'react'
import '../../assets/NotificationStyles.css'
const Notification = ({ message, sucess, open }) => {
  const {
    isOpen,
    closeModal,
    openModal
  } = useModal(false)

  useEffect(() => {
    openModal()
  }, [open])

  return (
        <ModalPortal isOpen={isOpen} closeModal={closeModal}>
            <h3>{sucess ? 'Transacción exitosa' : 'ERROR'}</h3>
            <p className={(sucess === true) ? 'sucess' : 'err'}>{message}</p>
        </ModalPortal>
  )
}
export default Notification
