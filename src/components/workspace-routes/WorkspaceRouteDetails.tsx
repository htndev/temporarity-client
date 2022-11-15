import { Box } from '@mui/material';
import { FC, useState } from 'react';
import { HttpMethod, Route, RouteDetails } from '../../common/types/routes.type';
import { RoutePathInput } from '../common/RoutePathInput';
import { SelectMethods } from '../common/SelectMethods';
import { StatusInput } from '../common/StatusInput';

interface Props {
  route: Route;
  details: RouteDetails;
  onPathUpdate: (value: string) => void | Promise<void>;
  onMethodsUpdate: (value: HttpMethod[]) => void | Promise<void>;
  onStatusUpdate: (value: number) => void | Promise<void>;
}

export const WorkspaceRouteDetails: FC<Props> = ({
  onPathUpdate,
  route,
  details,
  onMethodsUpdate,
  onStatusUpdate
}) => {
  const [value, setValue] = useState(route.path);
  const [methods, setMethods] = useState<HttpMethod[]>(route.methods);
  const [status, setStatus] = useState(String(route.status));

  const onMethodChange = (value: HttpMethod[]) => {
    setMethods(value);
    onMethodsUpdate(value);
  };

  const onStatusChange = (value: string) => {
    setStatus(String(value));
    onStatusUpdate(Number(value));
  };

  return (
    <Box>
      <Box>
        <RoutePathInput value={value} onChange={setValue} onBlur={() => onPathUpdate(value)} />
      </Box>
      <Box sx={{ mt: 2, mb: 2 }}>
        <SelectMethods value={methods} onChange={onMethodChange} />
      </Box>
      <Box sx={{ mt: 2, mb: 2 }}>
        <StatusInput value={status} onChange={onStatusChange} />
      </Box>
      <Box>{JSON.stringify({ c: 1 }, null, 2)}</Box>
    </Box>
  );
};
