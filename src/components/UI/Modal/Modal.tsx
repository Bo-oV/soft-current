import type { MouseEvent, ReactNode } from "react";
import "./Modal.scss";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
};

function Modal({ isOpen, onClose, children }: ModalProps) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal" role="presentation" onClick={onClose}>
      <div
        className="modal__dialog"
        role="dialog"
        aria-modal="true"
        onClick={(event: MouseEvent<HTMLDivElement>) => event.stopPropagation()}
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
  );
}

export default Modal;
