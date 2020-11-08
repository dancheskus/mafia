import { useEffect } from 'react';

export default resetMode => {
  useEffect(() => {
    // Возвращаемся на пред. страницу при "Новой игре"
    localStorage.modeApproved === undefined && resetMode();
  });
};
