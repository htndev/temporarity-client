import { Box } from '@mui/material';
import { FC } from 'react';
import { ResponseType, WorkspaceRouteResponseType } from '../../../common/types/routes.type';
import { ResponseFile } from './ResponseFile';
import { ResponseRandomImage } from './ResponseRandomImage';
import { ResponseSchema } from './ResponseSchema';

interface Props {
  responseType: WorkspaceRouteResponseType;
  response: ResponseType;
  status: number;
  onChange: (value: File | object | null | string) => void;
}

export const Response: FC<Props> = ({ responseType, response, onChange, status }) => {
  switch (responseType) {
    case WorkspaceRouteResponseType.RandomImage:
      return <ResponseRandomImage />;
    case WorkspaceRouteResponseType.File:
      return <ResponseFile url={response as string} onChange={onChange} />;
    case WorkspaceRouteResponseType.Schema:
      return <ResponseSchema schema={response as object} onChange={onChange} status={status} />;
    default:
      return <Box>Unknown response type</Box>;
  }
};
