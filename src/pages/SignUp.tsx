import { FormEvent, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { BASE_URL } from '../common/constants/api.constant';
import { Locale } from '../common/constants/locale.constant';
import { FULL_NAME_REGEX, PASSWORD_REGEX } from '../common/constants/regex.constant';
import { useDocumentTitle } from '../common/hooks/use-document-title';
import { useStyleVariables } from '../common/hooks/use-style-variables';
import { OAuth } from '../common/types/auth.type';
import { connectComponentHoc } from '../common/utils/connect-component-hoc';
import {
  isEmailValidator,
  isEmptyValidator,
  ValidatorFnResponse
} from '../common/utils/validators';
import { AppLink } from '../components/common/AppLink';
import { AuthForm, AuthPageWrapper } from '../components/common/auth/AuthPage.styled';
import { OAuthLink } from '../components/common/auth/OAuthLink.styled';
import { Button } from '../components/common/Button';
import { Input } from '../components/common/Input';
import { Heading } from '../components/common/typography/Heading';
import { Text } from '../components/common/typography/Text';
import { withAuthGuardAuthorization } from '../components/hoc/AuthGuardAuthorization';
import { withDisplayErrorMessage } from '../components/hoc/DisplayErrorMessage';
import { SIGNUP } from '../store/actions/auth';
import { useAppSelector } from '../store/hooks';
import { isLoadingSelector } from '../store/selectors/auth';

const SignUp = () => {
  const dispatch = useDispatch();
  const isLoading = useAppSelector(isLoadingSelector);
  const { t, i18n } = useTranslation();
  const { spacing } = useStyleVariables();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);
  const [isFullNameValid, setIsFullNameValid] = useState(true);
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [isPasswordConfirmationValid, setIsPasswordConfirmationValid] = useState(true);

  const isEmptyErrorMessage = t('auth.validator.isEmpty');

  const emailRules = [
    isEmptyValidator(isEmptyErrorMessage),
    isEmailValidator(t('auth.validator.emailFormat'))
  ];

  const passwordRules = [
    isEmptyValidator(isEmptyErrorMessage),
    (v: string): ValidatorFnResponse =>
      PASSWORD_REGEX().test(v) || t('auth.validator.passwordFormat')
  ];

  const passwordConfirmationRules = [
    isEmptyValidator(isEmptyErrorMessage),
    (v: string): ValidatorFnResponse =>
      v === password ? true : t('auth.validator.passwordConfirmationShouldEqualPassword')
  ];

  const fullNameRules = [
    isEmptyValidator(isEmptyErrorMessage),
    (v: string): ValidatorFnResponse =>
      FULL_NAME_REGEX().test(v) || t('auth.validator.fullNameFormat')
  ];

  console.log(i18n.language);

  const signUp = (e: FormEvent) => {
    e.preventDefault();

    if (!email || !password || !passwordConfirmation || !fullName) {
      return;
    }

    dispatch(SIGNUP({ email, password, fullName, language: i18n.language as Locale }));
  };

  const getOauthUrl = (service: OAuth): `${typeof BASE_URL}/auth/${OAuth}` =>
    `${BASE_URL}/auth/${service}`;

  useDocumentTitle(t('page-title.signup'));

  useEffect(() => {
    setIsFormValid(
      [isFullNameValid, isEmailValid, isPasswordValid, isPasswordConfirmationValid].every(
        (v) => v === true
      )
    );
  }, [isFullNameValid, isEmailValid, isPasswordValid, isPasswordConfirmationValid]);

  return (
    <AuthPageWrapper>
      <AuthForm onSubmit={signUp}>
        <Heading level={2} isCentered>
          {t('auth.signup.title')}
        </Heading>
        <Input
          value={fullName}
          rules={fullNameRules}
          placeholder={t('auth.field.full-name.title')}
          type="text"
          fullWidth
          onChange={setFullName}
          onValidationStateChange={setIsFullNameValid}
        />
        <Input
          value={email}
          rules={emailRules}
          placeholder={t('auth.field.email.title')}
          type="email"
          fullWidth
          onChange={setEmail}
          onValidationStateChange={setIsEmailValid}
        />
        <Input
          value={password}
          rules={passwordRules}
          placeholder={t('auth.field.password.title')}
          type="password"
          fullWidth
          onChange={setPassword}
          onValidationStateChange={setIsPasswordValid}
        />
        <Input
          value={passwordConfirmation}
          rules={passwordConfirmationRules}
          placeholder={t('auth.field.passwordConfirmation.title')}
          type="password"
          fullWidth
          onChange={setPasswordConfirmation}
          onValidationStateChange={setIsPasswordConfirmationValid}
        />

        <Button
          type="submit"
          variant="outlined"
          fullWidth
          sx={{ marginBottom: spacing.spacing2 }}
          disabled={!isFormValid}
          loading={isLoading}
        >
          {t('auth.button.signup.title')}
        </Button>

        <Text isCentered>{t('auth.or')}</Text>

        <OAuthLink to={getOauthUrl(OAuth.Google)} network={OAuth.Google}>
          {t('auth.signup.oauth.google')}
        </OAuthLink>
        <OAuthLink to={getOauthUrl(OAuth.Facebook)} network={OAuth.Facebook}>
          {t('auth.signup.oauth.facebook')}
        </OAuthLink>
        <OAuthLink to={getOauthUrl(OAuth.Github)} network={OAuth.Github}>
          {t('auth.signup.oauth.github')}
        </OAuthLink>

        <Text isCentered sx={{ marginTop: spacing.spacing2 }}>
          {t('auth.signup.haveAccount')}&nbsp;
          <AppLink to="/signin">{t('auth.signup.login')}</AppLink>
        </Text>
      </AuthForm>
    </AuthPageWrapper>
  );
};

export default connectComponentHoc(SignUp)(withAuthGuardAuthorization, withDisplayErrorMessage);
