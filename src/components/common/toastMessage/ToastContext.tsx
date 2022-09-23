import { createContext } from 'react';

export interface ToastOptions {
  type: 'error' | 'warning' | 'success' | 'info';
  duration: 'short' | 'medium' | 'long' | 'infinite';
  position:
    | 'top-center'
    | 'top-right'
    | 'top-left'
    | 'bottom-center'
    | 'bottom-left'
    | 'bottom-right';
  isClosable: boolean;
}

export type ToastContextType = {
  toast: (message: string, options?: Partial<ToastOptions>) => void;
};

export const ToastContext = createContext<null | ToastContextType>(null);
