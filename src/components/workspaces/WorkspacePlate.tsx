import { Box, Grid, Paper, Typography } from '@mui/material';
import { alpha, styled } from '@mui/system';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { AppLink } from '../common/AppLink';

interface WorkspacePlateProps {
  title: string;
  description: string;
  slug: string;
}

const HoverContent = styled('div')(({ theme }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  opacity: 0,
  padding: theme.spacing(1),
  background: alpha(theme.palette.secondary.light, 0.7),
  transition: '0.25s ease opacity',
  willChange: 'opacity',
  '&:hover': {
    opacity: 1
  }
}));

export const WorkspacePlate: FC<WorkspacePlateProps> = ({ title, description, slug }) => {
  const { t } = useTranslation();

  return (
    <Grid item>
      <Paper sx={{ height: '100%' }}>
        <Box minWidth="200px" maxWidth="200px" padding={1} position="relative" height="100%">
          <Typography variant="subtitle1">{title}</Typography>
          <Typography variant="body1">{description}</Typography>
          <HoverContent>
            <AppLink to={`/workspaces/${slug}`}>{t('common.open')}</AppLink>
          </HoverContent>
        </Box>
      </Paper>
    </Grid>
  );
};
