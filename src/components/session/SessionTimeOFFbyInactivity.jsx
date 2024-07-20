/**
 * src/session/SessionTimeOFFbyInactivity.js
 */

import { useEffect, useRef } from 'react';

export default function SessionTimeOFFbyInactivity(onTimeout, timeout = 900000) {
  const timeoutRef = useRef(null);

  useEffect(() => {
    const resetTimeout = () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(onTimeout, timeout);
    };

    const handleActivity = () => {
      resetTimeout();
    };

    // Monitorando eventos de atividade do usuário
    window.addEventListener('mousemove', handleActivity);
    window.addEventListener('mousedown', handleActivity);
    window.addEventListener('keydown', handleActivity);
    window.addEventListener('touchstart', handleActivity);

    // timeout inicial
    resetTimeout();

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      window.removeEventListener('mousemove', handleActivity);
      window.removeEventListener('mousedown', handleActivity);
      window.removeEventListener('keydown', handleActivity);
      window.removeEventListener('touchstart', handleActivity);
    };
  }, [onTimeout, timeout]);

  return null;
}