import { Alert, AlertProps, Slide, Snackbar, SnackbarProps } from '@mui/material';
import { FC, useState } from 'react';
import { ToastContext, ToastOptions } from './ToastContext';

type ToastState = Pick<SnackbarProps, 'anchorOrigin' | 'key' | 'autoHideDuration'> &
  Pick<AlertProps, 'severity'> & { isClosable: boolean };

const DURATION: { [k in ToastOptions['duration']]: number | null } = {
  short: 5,
  medium: 10,
  long: 15,
  infinite: null
};

const DEFAULT_TOAST_MESSAGE_OPTIONS: ToastOptions = {
  type: 'info',
  duration: 'medium',
  position: 'bottom-right',
  isClosable: false
};

export const ToastProvider: FC = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [toastOptions, setToastOptions] = useState<ToastState | null>(null);

  const toast = (message: string, options: Partial<ToastOptions> = {}) => {
    const opts = { ...DEFAULT_TOAST_MESSAGE_OPTIONS, ...options };
    const [vertical, horizontal] = opts.position.split('-') as [
      'top' | 'bottom',
      'left' | 'center' | 'right'
    ];
    const duration = DURATION[opts.duration] || DURATION.medium;
    setToastOptions({
      anchorOrigin: { vertical, horizontal },
      key: opts.position,
      autoHideDuration: duration && duration * 1000,
      severity: opts.type,
      isClosable: opts.isClosable
    });
    setIsOpen(true);
    setMessage(message);
  };

  const onClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      <ToastContext.Provider value={{ toast }}>{children}</ToastContext.Provider>
      <Snackbar
        open={isOpen}
        onClose={onClose}
        anchorOrigin={toastOptions?.anchorOrigin}
        key={toastOptions?.key}
        autoHideDuration={toastOptions?.autoHideDuration}
        TransitionComponent={Slide}
      >
        <Alert
          variant="filled"
          severity={toastOptions?.severity}
          onClose={toastOptions?.isClosable ? onClose : undefined}
          sx={{ width: '100%' }}
        >
          {message}
        </Alert>
      </Snackbar>
    </>
  );
};
