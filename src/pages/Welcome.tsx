import { BoxProps, Typography, useTheme } from '@mui/material';
import { Box } from '@mui/system';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { AppLink } from '../components/common/AppLink';
import { ExternalLink } from '../components/common/ExternalLink';
import { Logo } from '../components/common/Logo';

const Wrapper: FC<{ sx?: BoxProps }> = ({ children, sx }) => (
  <Box
    sx={[
      {
        width: '80%',
        margin: '0 auto'
      },
      ...(Array.isArray(sx) ? sx : [sx])
    ]}
  >
    {children}
  </Box>
);

export const Welcome: FC = () => {
  const theme = useTheme();
  const { t } = useTranslation();

  return (
    <Box width="100%">
      <header style={{ background: theme.palette.primary.light }}>
        <Wrapper sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Logo small />
          <AppLink to="/signin">{t('welcome.join-us')}</AppLink>
        </Wrapper>
      </header>
      <main style={{ height: '70vh', margin: '2rem 0' }}>
        <Wrapper
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%'
          }}
        >
          <Typography variant="h1">{t('common.title')}</Typography>
          <Typography variant="h3">{t('welcome.suggestion')}</Typography>
          <Typography variant="subtitle1">{t('welcome.hint')}</Typography>
        </Wrapper>
      </main>
      <footer>
        <Wrapper>
          <Typography variant="body1" textAlign="center">
            {t('welcome.developed-by')}
            <ExternalLink to="https://github.com/htndev">{t('welcome.author')}</ExternalLink>
          </Typography>
        </Wrapper>
      </footer>
    </Box>
  );
};
