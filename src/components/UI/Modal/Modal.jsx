import './Modal.scss'

function Modal({ isOpen, onClose, children }) {
  if (!isOpen) {
    return null
  }

  return (
    <div className="modal" role="presentation" onClick={onClose}>
      <div
        className="modal__dialog"
        role="dialog"
        aria-modal="true"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          className="modal__close"
          type="button"
          aria-label="Закрити"
          onClick={onClose}
        >
          x
        </button>
        <div className="modal__content">{children}</div>
      </div>
    </div>
  )
}

export default Modal
