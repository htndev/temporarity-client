import { Button, TextField } from '@mui/material';
import { FormEvent, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { OAuth } from '../common/types/auth.type';
import { useStyleVariables } from '../common/utils/hooks/useStyleVariables';
import { AppLink } from '../components/common/AppLink';
import { AuthForm, AuthPageWrapper } from '../components/common/auth/AuthPage.styled';
import { OAuthLink } from '../components/common/auth/OAuthLink.styled';
import { Heading } from '../components/common/typography/Heading';
import { Text } from '../components/common/typography/Text';

const SignIn = () => {
  const { t } = useTranslation();
  const { spacing } = useStyleVariables();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
  };

  return (
    <AuthPageWrapper>
      <AuthForm onSubmit={onSubmit}>
        <Heading level={2} isCentered>
          {t('auth.signin.title')}
        </Heading>
        <TextField
          label={t('auth.field.email.title')}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          sx={{ marginBottom: spacing.spacing2 }}
          fullWidth
        />
        <TextField
          label={t('auth.field.password.title')}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          sx={{ marginBottom: spacing.spacing2 }}
          fullWidth
        />
        <Button variant="outlined" fullWidth sx={{ marginBottom: spacing.spacing2 }}>
          {t('auth.button.login.title')}
        </Button>

        <Text isCentered>{t('auth.or')}</Text>

        <OAuthLink to="#google" network={OAuth.Google}>
          {t('auth.signin.oauth.google')}
        </OAuthLink>
        <OAuthLink to="#facebook" network={OAuth.Facebook}>
          {t('auth.signin.oauth.facebook')}
        </OAuthLink>
        <OAuthLink to="#github" network={OAuth.Github}>
          {t('auth.signin.oauth.github')}
        </OAuthLink>

        <Text isCentered sx={{ marginTop: spacing.spacing2 }}>
          {t('auth.signin.new')}&nbsp;
          <AppLink to="/signup">{t('auth.signin.create-account')}</AppLink>
        </Text>
      </AuthForm>
    </AuthPageWrapper>
  );
};

export default SignIn;
