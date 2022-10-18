import { ComponentType, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAppSelector } from '../../store/hooks';
import { useToast } from '../common/toastMessage';

const ERROR_MESSAGE_QUERY_PARAM = 'errorMessage';

export const withDisplayErrorMessage = <P extends object>(WC: ComponentType<P>) => {
  const DisplayErrorMessageFromUrl: ComponentType<P> = (props) => {
    const errorMessage = useAppSelector((state) => state.auth.error);
    const [searchParams, setSearchParams] = useSearchParams();
    const { toast } = useToast();

    useEffect(() => {
      if (!errorMessage) {
        return;
      }

      toast(errorMessage, { duration: 'long', type: 'error' });
    }, [errorMessage]);

    useEffect(() => {
      const error = searchParams.get(ERROR_MESSAGE_QUERY_PARAM);

      if (!error) {
        return;
      }

      setSearchParams({});
      toast(error, { duration: 'medium', type: 'error' });
    }, [searchParams, toast, setSearchParams]);

    return <WC {...props} />;
  };

  return DisplayErrorMessageFromUrl;
};
