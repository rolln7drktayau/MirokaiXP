"use client";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

export function Modal({ open, onClose, title, children }: ModalProps) {
  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/70 p-4">
      <div className="glass-panel w-full max-w-lg rounded-2xl p-4">
        <div className="mb-3 flex items-center justify-between gap-2">
          {title ? <h3 className="text-lg">{title}</h3> : <span />}
          <button type="button" onClick={onClose} className="cta-secondary">
            Fermer
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
