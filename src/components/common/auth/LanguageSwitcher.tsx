import { Box, Button, Menu, MenuItem } from '@mui/material';
import { FC, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  FALLBACK_LOCALE_I18N_KEY,
  Locale,
  LOCALE_FLAG
} from '../../../common/constants/locale.constant';
import { useStyleVariables } from '../../../common/hooks/use-style-variables';
import { Text } from '../typography/Text';

interface Props {
  onChange: (locale: Locale) => void;
  align?: 'left' | 'right';
  value?: Locale;
}

const Flag: FC<{ locale: Locale }> = ({ locale }) => {
  const { spacing } = useStyleVariables();
  const flag = LOCALE_FLAG[locale as Locale] || LOCALE_FLAG.DEFAULT;

  return (
    <Text isFluid sx={{ fontSize: '16px', marginRight: spacing.spacing1 }}>
      {flag}
    </Text>
  );
};

const ALIGN_VALUE = {
  left: 'flex-start',
  right: 'flex-end'
};

export const LanguageSwitcher: FC<Props> = ({ onChange, align = 'right', value }) => {
  const { t, i18n } = useTranslation();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [locale, setLocale] = useState<Locale>(i18n.language as Locale);
  const activeItem = useMemo<Locale>(() => value || locale, [value, locale]);

  const isOpened = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const closeLanguageMenu = () => setAnchorEl(null);
  const switchLanguage = (language: Locale) => {
    setAnchorEl(null);
    onChange(language);
    setLocale(language);
  };

  useEffect(() => setLocale(i18n.language as Locale), [i18n.language]);

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: ALIGN_VALUE[align] }}>
      <Button aria-label="more" id="long-button" onClick={handleClick}>
        <Flag locale={activeItem} />
        {t([`i18n.locale.${activeItem}`, FALLBACK_LOCALE_I18N_KEY])}
      </Button>
      <Menu id="long-menu" anchorEl={anchorEl} open={isOpened} onClose={closeLanguageMenu}>
        {i18n.languages.map((language: any) => (
          <MenuItem
            key={language}
            selected={language === activeItem}
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
