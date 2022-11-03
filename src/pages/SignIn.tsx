import { FormEvent, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { BASE_URL } from '../common/constants/api.constant';
import { useDocumentTitle } from '../common/hooks/use-document-title';
import { useStyleVariables } from '../common/hooks/use-style-variables';
import { OAuth } from '../common/types/auth.type';
import { connectComponentHoc } from '../common/utils/connect-component-hoc';
import { isEmptyValidator } from '../common/utils/validators';
import { AppLink } from '../components/common/AppLink';
import { AuthForm, AuthPageWrapper } from '../components/common/auth/AuthPage.styled';
import { OAuthLink } from '../components/common/auth/OAuthLink.styled';
import { Button } from '../components/common/Button';
import { Input } from '../components/common/Input';
import { Heading } from '../components/common/typography/Heading';
import { Text } from '../components/common/typography/Text';
import { withAuthGuardAuthorization } from '../components/hoc/AuthGuardAuthorization';
import { withDisplayErrorMessage } from '../components/hoc/DisplayErrorMessage';
import { LOGIN } from '../store/actions/auth';
import { useAppSelector } from '../store/hooks';
import { isLoadingSelector } from '../store/selectors/auth';

const SignIn = () => {
  const dispatch = useDispatch();
  const isLoading = useAppSelector(isLoadingSelector);

  const { t } = useTranslation();
  const { spacing } = useStyleVariables();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [disableLoginButton, setDisableLoginButton] = useState(false);

  useDocumentTitle(t('page-title.signin'));

  useEffect(() => {
    setDisableLoginButton([!email, !password].some((v) => v === true));
  }, [email, password]);

  const signIn = (e: FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      return;
    }

    dispatch(LOGIN({ email, password }));
  };

  const getOauthUrl = (service: OAuth): `${typeof BASE_URL}/auth/${OAuth}` =>
    `${BASE_URL}/auth/${service}`;

  const emptyValidators = [isEmptyValidator(t('auth.validator.isEmpty'))];

  return (
    <AuthPageWrapper>
      <AuthForm onSubmit={signIn}>
        <Heading level={2} isCentered>
          {t('auth.signin.title')}
        </Heading>
        <Input
          placeholder={t('auth.field.email.title')}
          value={email}
          rules={emptyValidators}
          onChange={setEmail}
          fullWidth
        />
        <Input
          placeholder={t('auth.field.password.title')}
          value={password}
          rules={emptyValidators}
          onChange={setPassword}
          type="password"
          fullWidth
        />
        <Button
          type="submit"
          variant="outlined"
          fullWidth
          sx={{ marginBottom: spacing.spacing2 }}
          disabled={disableLoginButton}
          loading={isLoading}
        >
          {t('auth.button.login.title')}
        </Button>

        <Text isCentered>{t('auth.or')}</Text>

        <OAuthLink to={getOauthUrl(OAuth.Google)} network={OAuth.Google}>
          {t('auth.signin.oauth.google')}
        </OAuthLink>
        <OAuthLink to={getOauthUrl(OAuth.Facebook)} network={OAuth.Facebook}>
          {t('auth.signin.oauth.facebook')}
        </OAuthLink>
        <OAuthLink to={getOauthUrl(OAuth.Github)} network={OAuth.Github}>
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

export default connectComponentHoc(SignIn)(withAuthGuardAuthorization, withDisplayErrorMessage);
