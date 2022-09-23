import { useContext } from 'react';
import { ToastContext, ToastContextType } from './ToastContext';

export { ToastProvider } from './ToastProvider';

export const useToast = (): ToastContextType => useContext(ToastContext) as ToastContextType;
