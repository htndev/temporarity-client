import { Box } from '@mui/material';
import { AxiosError } from 'axios';
import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { preferencesApi } from '../api';
import { Locale } from '../common/constants/locale.constant';
import { FULL_NAME_REGEX, PASSWORD_REGEX } from '../common/constants/regex.constant';
import { HttpResponse } from '../common/types/common.type';
import { connectComponentHoc } from '../common/utils/connect-component-hoc';
import {
  isEmailValidator,
  isEmptyValidator,
  ValidatorFnResponse
} from '../common/utils/validators';
import { LanguageSwitcher } from '../components/common/auth/LanguageSwitcher';
import { Button } from '../components/common/Button';
import { Input } from '../components/common/Input';
import { Layout } from '../components/common/Layout';
import { useToast } from '../components/common/toastMessage';
import { Text } from '../components/common/typography/Text';
import { withAuthGuardApp } from '../components/hoc/AuthGuardApp';
import { withFetchWorkspaces } from '../components/hoc/FetchWorkspaces';
import { SET_EMAIL, SET_FULL_NAME, SET_LANGUAGE, SET_TOKENS } from '../store/actions/auth';
import { useAppSelector } from '../store/hooks';
import { userSelector } from '../store/selectors/auth';

const UpdateField: FC<{ onUpdateClick: () => void | Promise<void> }> = ({ onUpdateClick }) => {
  const { t } = useTranslation();

  return (
    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
      <Button onClick={onUpdateClick} variant="contained">
        {t('common.update')}
      </Button>
    </Box>
  );
};

const Profile: FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { toast } = useToast();
  const user = useAppSelector(userSelector);
  const currentLocale = useAppSelector((state) => state.auth.preferences.language);
  const isOauthUser = useAppSelector((state) => state.auth.user?.isOauthUser);
  const [locale, setLocale] = useState<Locale>(currentLocale);
  const [fullName, setFullName] = useState(user?.fullName ?? '');
  const [email, setEmail] = useState(user?.email ?? '');
  const [newPassword, setNewPassword] = useState('');
  const [newPasswordConfirmation, setNewPasswordConfirmation] = useState('');
  const [oldPassword, setOldPassword] = useState('');

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
      v === newPassword ? true : t('auth.validator.passwordConfirmationShouldEqualPassword')
  ];

  const fullNameRules = [
    isEmptyValidator(isEmptyErrorMessage),
    (v: string): ValidatorFnResponse =>
      FULL_NAME_REGEX().test(v) || t('auth.validator.fullNameFormat')
  ];

  const oldPasswordRules = [isEmptyValidator(isEmptyErrorMessage)];

  const updateGeneral = async () => {
    const isAllowedToUpdate =
      fullNameRules.every((rule) => rule(fullName) === true) &&
      emailRules.every((rule) => rule(email) === true);

    const isTheSameValues = fullName === user?.fullName && email === user?.email;

    if (!isAllowedToUpdate || isTheSameValues) {
      return;
    }

    try {
      const { tokens } = await preferencesApi.updateGeneralPreferences({ fullName, email });
      dispatch(SET_TOKENS(tokens));

      if (user?.email !== email) {
        toast(t('profile.message.general.email'), { type: 'success' });
        dispatch(SET_EMAIL(email));
      }

      if (user?.fullName !== fullName) {
        toast(t('profile.message.general.fullName'), { type: 'success' });
        dispatch(SET_FULL_NAME(fullName));
      }
    } catch (e: any) {
      const error: AxiosError<HttpResponse> = e;
      toast(error.response?.data?.message ?? '', { type: 'error' });
    }
  };

  const updatePrivacy = async () => {
    const isAllowedToChangePassword =
      passwordRules.every((rule) => rule(newPassword) === true) &&
      passwordConfirmationRules.every((rule) => rule(newPasswordConfirmation) === true) &&
      oldPasswordRules.every((rule) => rule(oldPassword) === true);

    if (!isAllowedToChangePassword) {
      return;
    }

    try {
      await preferencesApi.updatePrivacyPreferences({
        newPassword,
        newPasswordConfirmation,
        oldPassword
      });
      toast(t('profile.message.privacy'), { type: 'success' });
    } catch (e: any) {
      const error: AxiosError<HttpResponse> = e;
      toast(error.response?.data?.message ?? '', { type: 'error' });
    }
  };

  const updateLanguage = async () => {
    if (locale === currentLocale) {
      return;
    }

    try {
      await preferencesApi.updateLanguagePreferences({ language: locale });
      dispatch(SET_LANGUAGE(locale));
      toast(t('profile.message.language'), { type: 'success' });
    } catch (e: any) {
      const error: AxiosError<HttpResponse> = e;
      toast(error.response?.data?.message ?? '', { type: 'error' });
    }
  };

  const handleLanguageChange = (locale: Locale) => setLocale(locale);

  return (
    <Layout>
      <Text as="h4">{t('profile.title')}</Text>
      <Box>
        <Text as="h5">{t('profile.section.general')}</Text>
      </Box>
      <Box>
        <Input
          variant="outlined"
          disabled={isOauthUser}
          originalLabel={t('profile.fullName.label')}
          placeholder={t('profile.fullName.placeholder')}
          value={fullName}
          onChange={setFullName}
          rules={fullNameRules}
          sx={{ mb: 2 }}
          {...(isOauthUser ? { helperText: t('profile.error.oauth.fullname') } : {})}
        />
      </Box>
      <Box>
        <Input
          disabled={isOauthUser}
          originalLabel={t('profile.email.label')}
          value={email}
          onChange={setEmail}
          rules={emailRules}
          {...(isOauthUser ? { helperText: t('profile.error.oauth.email') } : {})}
        />
      </Box>
      <UpdateField onUpdateClick={updateGeneral} />
      <Box>
        <Text as="h5">{t('profile.section.privacy')}</Text>
      </Box>
      <Box>
        <Input
          disabled={isOauthUser}
          originalLabel={t('profile.oldPassword.label')}
          value={oldPassword}
          onChange={setOldPassword}
          rules={oldPasswordRules}
          sx={{ mb: 2 }}
          type="password"
          {...(isOauthUser ? { helperText: t('profile.error.oauth.password') } : {})}
        />
      </Box>
      <Box>
        <Input
          disabled={isOauthUser}
          originalLabel={t('profile.password.label')}
          value={newPassword}
          onChange={setNewPassword}
          rules={passwordRules}
          sx={{ mb: 2 }}
          type="password"
          {...(isOauthUser ? { helperText: t('profile.error.oauth.password') } : {})}
        />
      </Box>
      <Box>
        <Input
          disabled={isOauthUser}
          originalLabel={t('profile.passwordConfirmation.label')}
          rules={passwordConfirmationRules}
          value={newPasswordConfirmation}
          onChange={setNewPasswordConfirmation}
          type="password"
          {...(isOauthUser ? { helperText: t('profile.error.oauth.password') } : {})}
        />
      </Box>
      <UpdateField onUpdateClick={updatePrivacy} />
      <Box>
        <Text as="h5">{t('profile.section.language')}</Text>
        <LanguageSwitcher align="left" value={locale} onChange={handleLanguageChange} />
      </Box>
      <UpdateField onUpdateClick={updateLanguage} />
    </Layout>
  );
};

export default connectComponentHoc(Profile)(withAuthGuardApp, withFetchWorkspaces);
