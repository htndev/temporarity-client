import { Box, LinearProgress } from '@mui/material';
import { FC, memo, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { HttpMethod } from '../../common/types/routes.type';
import { FETCH_ROUTES } from '../../store/actions/routes';
import { useAppSelector } from '../../store/hooks';
import { currentWorkspaceSlugSelector } from '../../store/selectors/current-workspace';
import { routesSelector } from '../../store/selectors/routes';
import { Text } from '../common/typography/Text';
import { WorkspaceRoute } from './WorkspaceRoute';
import { WorkspaceRoutesHeader } from './WorkspaceRoutesHeader';
import { isEqual } from 'lodash';

export const WorkspaceRoutes: FC = () => {
  const [searchFilters, setSearchFilters] = useState<{ methods: HttpMethod[]; search: string }>({
    search: '',
    methods: []
  });
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const slug = useAppSelector(currentWorkspaceSlugSelector);
  const isFetchingRoutes = useAppSelector((state) => state.routes.isFetchingRoutes);
  const routes = useAppSelector(routesSelector);
  const filteredRoutes = useMemo(
    () =>
      [...routes]
        .sort((a, b) => a.path.localeCompare(b.path))
        .filter((route) => {
          const hasMethod =
            searchFilters.methods.length === 0 ||
            route.methods.some((method) => searchFilters.methods.includes(method));
          const hasPath = route.path.includes(searchFilters.search);
          return hasMethod && hasPath;
        }),
    [routes, searchFilters]
  );
  const handleSearch = (search: { search: string; methods: HttpMethod[] }) => {
    if (search.search !== searchFilters.search || !isEqual(searchFilters.methods, search.methods)) {
      setSearchFilters(search);
    }
  };

  const Routes = memo(() => (
    <Box>
      {!filteredRoutes.length ? (
        <Text>{t('workspace.routes.no-routes')}</Text>
      ) : (
        filteredRoutes.map((route) => (
          <WorkspaceRoute route={route} key={route.path + route.methods.join(',')} />
        ))
      )}
    </Box>
  ));

  useEffect(() => {
    if (slug) {
      dispatch(FETCH_ROUTES({ slug: slug ?? '' }));
    }
  }, [slug]);

  return isFetchingRoutes ? (
    <LinearProgress sx={(theme) => ({ marginTop: theme.spacing(2) })} />
  ) : (
    <Box sx={{ mt: 2 }}>
      <WorkspaceRoutesHeader onChange={handleSearch} />
      <Routes />
    </Box>
  );
};
