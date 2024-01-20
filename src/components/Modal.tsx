import { PropsWithChildren, ReactNode } from 'react'

interface ModalProps extends PropsWithChildren {
  title: string
  body: ReactNode
  confirmText?: string
  cancelText?: string
  showModal?: boolean
  onConfirm?: () => void
  onCancel?: () => void
  onClose?: () => void
}

const DEFAULT_CONFIRM_TEXT = 'OK'
const DEFAULT_CANCEL_TEXT = 'Close'

export default function Modal({
  title,
  body,
  showModal,
  confirmText,
  cancelText,
  onConfirm,
  onCancel,
  onClose,
}: ModalProps) {
  const className = showModal && `modal-open`

  const closeModal = () => {
    if (onClose) {
      return onClose()
    }
  }

  const handleCancel = () => {
    if (onCancel) {
      onCancel()
    }
    closeModal()
  }

  const handleConfirm = () => {
    if (onConfirm) {
      onConfirm()
    }
    closeModal()
  }

  return (
    <dialog id="" className={`${className} modal`}>
      <div className="modal-box">
        <h3 className="font-bold text-lg">{title}</h3>
        {body}
        <div className="modal-action">
          <form method="dialog">
            <div className="join flex flex-row justify-end">
              <button className="join-item btn" onClick={handleCancel}>
                {cancelText || DEFAULT_CANCEL_TEXT}
              </button>
              {onConfirm && (
                <button
                  className="join-item btn btn-primary"
                  onClick={handleConfirm}
                >
                  {confirmText || DEFAULT_CONFIRM_TEXT}
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </dialog>
  )
}
