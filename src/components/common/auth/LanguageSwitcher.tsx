import { Box, Button, Menu, MenuItem } from '@mui/material';
import { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  FALLBACK_LOCALE_I18N_KEY,
  Locale,
  LOCALE_FLAG
} from '../../../common/constants/locale.constant';
import { useStyleVariables } from '../../../common/hooks/use-style-variables';
import { Text } from '../typography/Text';

const Flag: FC<{ locale: string | Locale }> = ({ locale }) => {
  const { spacing } = useStyleVariables();
  const flag = LOCALE_FLAG[locale as Locale] || LOCALE_FLAG.DEFAULT;

  return (
    <Text isFluid sx={{ fontSize: '16px', marginRight: spacing.spacing1 }}>
      {flag}
    </Text>
  );
};

export const LanguageSwitcher = () => {
  const { t, i18n } = useTranslation();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [locale, setLocale] = useState<string>(i18n.language);

  const isOpened = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const closeLanguageMenu = () => setAnchorEl(null);
  const switchLanguage = (language: string) => {
    setAnchorEl(null);
    i18n.changeLanguage(language);
  };

  useEffect(() => setLocale(i18n.language), [i18n.language]);

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
      <Button aria-label="more" id="long-button" onClick={handleClick}>
        <Flag locale={locale} />
        {t([`i18n.locale.${locale}`, FALLBACK_LOCALE_I18N_KEY])}
      </Button>
      <Menu id="long-menu" anchorEl={anchorEl} open={isOpened} onClose={closeLanguageMenu}>
        {i18n.languages.map((language: any) => (
          <MenuItem
            key={language}
            selected={language === locale}
            onClick={() => switchLanguage(language)}
          >
            <Flag locale={language} />
            {t([`i18n.locale.${language}`, FALLBACK_LOCALE_I18N_KEY])}
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};
