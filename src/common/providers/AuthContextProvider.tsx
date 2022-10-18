import { FC, useState } from 'react';
import { AuthContext } from '../context/auth.context';

export const AuthContextProvider: FC = ({ children }) => {
  const [isAllowedAccessToApp, setIsAllowedAccessToApp] = useState(false);
  const [doTokensFetched, setDoTokensFetched] = useState(false);

  return (
    <AuthContext.Provider
      value={{ isAllowedAccessToApp, setIsAllowedAccessToApp, doTokensFetched, setDoTokensFetched }}
    >
      {children}
    </AuthContext.Provider>
  );
};
