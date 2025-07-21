import { useState, useEffect } from 'react';
import { invoke } from '@tauri-apps/api/core';

export function useWindowLabel() {
  const [windowLabel, setWindowLabel] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getWindowLabel = async () => {
      try {
        const label = await invoke('get_current_window_label');
        setWindowLabel(label as string);
      } catch (error) {
        console.error('Erro ao obter label da janela:', error);
        setWindowLabel('unknown');
      } finally {
        setIsLoading(false);
      }
    };

    getWindowLabel();
  }, []);

  return { windowLabel, isLoading };
} 