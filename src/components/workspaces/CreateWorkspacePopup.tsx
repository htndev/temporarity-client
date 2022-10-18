import { Box, Modal } from '@mui/material';
import { FC } from 'react';

interface CreateWorkspacePopupProps {
  isOpen: boolean;
  onChange: (isOpen: boolean) => void;
}

export const CreateWorkspacePopup: FC<CreateWorkspacePopupProps> = ({
  isOpen,
  onChange,
  children
}) => {
  return (
    <Modal open={isOpen} onClose={() => onChange(false)}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          boxShadow: 24,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          p: 4
        }}
      >
        {children}
      </Box>
    </Modal>
  );
};
