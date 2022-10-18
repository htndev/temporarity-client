import { ComponentType, FC, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import authApi from '../../api/auth.api';
import { GET_ME, SET_TOKENS } from '../../store/actions/auth';
import { useAppSelector } from '../../store/hooks';
import { userSelector } from '../../store/selectors/auth';
import { LoadingScreen } from '../common/LoadingScreen';

export const withAuthGuardApp = <P extends object>(WC: ComponentType<P>) => {
  const AuthGuard: FC<P> = (props) => {
    const tokens = useAppSelector((state) => state.auth.tokens);
    const user = useAppSelector(userSelector);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [searchParams, setSearchParams] = useSearchParams();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      const tokensFromUrl = Object.fromEntries(searchParams);

      if (tokens && user) {
        setIsLoading(false);
        return;
      }

      if (tokensFromUrl.access && tokensFromUrl.refresh) {
        dispatch(SET_TOKENS({ access: tokensFromUrl.access, refresh: tokensFromUrl.refresh }));
        setSearchParams({});
        return;
      }

      if (tokens && !user) {
        dispatch(GET_ME());
        setIsLoading(false);
        return;
      }

      authApi
        .getTokens()
        .then(({ tokens: newTokens }) => dispatch(SET_TOKENS(newTokens)))
        .catch(() => navigate('/signin'))
        .finally(() => {
          setIsLoading(false);
        });
    }, [tokens, searchParams, user]);

    return isLoading ? <LoadingScreen /> : <WC {...props} />;
  };

  return AuthGuard;
};
