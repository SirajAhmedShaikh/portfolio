import React from 'react';
import { IconCheck } from './Icons';

interface ToastProps {
  message: string | null;
  onClose?: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message }) => {
  if (!message) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="toast-container"
    >
      <div className="toast-box glass-card">
        <span className="toast-icon">
          <IconCheck size={18} />
        </span>
        <span className="toast-text">{message}</span>
      </div>
    </div>
  );
};
