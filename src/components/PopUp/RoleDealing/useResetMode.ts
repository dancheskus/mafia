import { useEffect } from 'react';

export default function useResetMode(resetMode: () => void) {
  useEffect(() => {
    // Возвращаемся на пред. страницу при "Новой игре"
    localStorage.modeApproved === undefined && resetMode();
  });
}
