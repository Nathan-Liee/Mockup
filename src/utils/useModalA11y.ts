import { useEffect } from 'react';

/**
 * KRIT-6/7 fix 2026-09-04: semua overlay modal/drawer pakai hook ini.
 * - Escape → onClose.
 * - Lock `document.body.style.overflow` saat mount; restore saat unmount.
 */
export function useModalA11y(open: boolean, onClose: () => void) {
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [open, onClose]);
}
