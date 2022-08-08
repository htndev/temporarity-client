import { Box, Button, Menu, MenuItem } from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ReactComponent as UkraineFlag } from '../../../assets/images/ua-flag.svg';
import { ReactComponent as EnglandFlag } from '../../../assets/images/en-flag.svg';
import { Locale } from '../../../common/constants/locale.constant';

const FLAG_SIZE = { width: '30px', height: '20px' };

const LANGUAGE_FLAG = {
  [Locale.EN]: <EnglandFlag {...FLAG_SIZE} />,
  [Locale.UK]: <UkraineFlag {...FLAG_SIZE} />
};

const options = [
  'None',
  'Atria',
  'Callisto',
  'Dione',
  'Ganymede',
  'Hangouts Call',
  'Luna',
  'Oberon',
  'Phobos',
  'Pyxis',
  'Sedna',
  'Titania',
  'Triton',
  'Umbriel'
];

export const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ position: 'absolute', top: '1rem', right: '1rem' }}>
      {LANGUAGE_FLAG.uk}
      <Button aria-label="more" id="long-button" onClick={handleClick}>
        Lang
      </Button>
      <Menu id="long-menu" anchorEl={anchorEl} open={open} onClose={handleClose}>
        {options.map((option) => (
          <MenuItem key={option} selected={option === 'Pyxis'} onClick={handleClose}>
            {option}
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};
