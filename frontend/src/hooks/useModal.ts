import { useState } from 'react';
import type { UseModalResult } from '../types';

export const useModal = <T = unknown>(): UseModalResult<T> => {
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState<T | null>(null);

  const open = (itemData?: T) => {
    if (itemData) {
      setData(itemData);
    }
    setIsOpen(true);
  };

  const close = () => {
    setIsOpen(false);
    setData(null);
  };

  return { isOpen, data, open, close };
};
