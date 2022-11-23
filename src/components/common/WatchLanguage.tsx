import { FC, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from '../../store/hooks';

export const WatchLanguage: FC = ({ children }) => {
  const { i18n } = useTranslation();
  const userLanguage = useAppSelector((state) => state.auth.preferences.language);

  useEffect(() => {
    if (i18n.language !== userLanguage) {
      i18n.changeLanguage(userLanguage);
    }
  }, [userLanguage]);

  return <>{children}</>;
};
