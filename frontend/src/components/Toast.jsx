import { useCallback, useRef, useState } from 'react';

// small hook shared by pages that show a transient message
export function useToast(duration = 3000) {
  const [message, setMessage] = useState('');
  const timer = useRef(null);
  const show = useCallback(
    (msg) => {
      setMessage(msg);
      clearTimeout(timer.current);
      timer.current = setTimeout(() => setMessage(''), duration);
    },
    [duration]
  );
  return [message, show];
}

export function ToastView({ message }) {
  if (!message) return null;
  return (
    <div
      role="status"
      style={{
        position: 'fixed',
        bottom: 100,
        left: '50%',
        transform: 'translateX(-50%)',
        background: '#0F172A',
        color: '#fff',
        padding: '12px 20px',
        borderRadius: 999,
        fontSize: 14,
        boxShadow: '0 8px 24px rgba(15,23,42,.25)',
        zIndex: 3000,
        maxWidth: '90vw',
      }}
    >
      {message}
    </div>
  );
}
