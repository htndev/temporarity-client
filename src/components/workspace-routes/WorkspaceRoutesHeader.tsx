import {
  Box,
  FormControl,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent
} from '@mui/material';
import { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { HttpMethod } from '../../common/types/routes.type';
import { Button } from '../common/Button';
import { Input } from '../common/Input';
import { WorkspaceCreateRouteModal } from './WorkspaceCreateRouteModal';

interface Props {
  onChange: (event: { methods: HttpMethod[]; search: string }) => void;
}

const HTTP_METHODS = Object.values(HttpMethod);
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  }
};

export const WorkspaceRoutesHeader: FC<Props> = ({ onChange }) => {
  const { t } = useTranslation();
  const [search, setSearch] = useState('');
  const [isCreateRouteModalOpen, setIsCreateRouteModalOpen] = useState(false);
  const [methods, setMethods] = useState<HttpMethod[]>([]);

  const handleSearchChange = (input: string) => {
    setSearch(input);
  };
  const handleMethodChange = (event: SelectChangeEvent) => {
    const {
      target: { value }
    } = event;
    setMethods(typeof value === 'string' ? (value.split(',') as HttpMethod[]) : value);
  };
  const closeRouteModal = () => {
    setIsCreateRouteModalOpen(false);
  };
  const openRouteModal = () => {
    setIsCreateRouteModalOpen(true);
  };

  useEffect(() => {
    onChange({ methods, search });
  }, [methods, search]);

  const renderSelect: any = (selected: string[]) =>
    selected.length === 0 ? t('workspace.routes.search.placeholder') : selected.join(', ');

  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }} component="header">
      <Input
        value={search}
        onChange={handleSearchChange}
        placeholder={t('workspace.routes.search.placeholder')}
        sx={{ mb: 0 }}
        size="small"
      />
      <FormControl variant="outlined" sx={{ minWidth: 200, ml: 2 }}>
        <Select
          onChange={handleMethodChange}
          multiple
          autoWidth
          displayEmpty
          input={<OutlinedInput />}
          renderValue={renderSelect}
          value={methods as any}
          MenuProps={MenuProps}
          size="small"
        >
          <MenuItem disabled value="">
            <em>{t('workspace.routes.search.method-placeholder')}</em>
          </MenuItem>
          {HTTP_METHODS.map((method) => (
            <MenuItem value={method} key={method}>
              {method}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Button variant="outlined" sx={{ ml: 'auto' }} onClick={openRouteModal}>
        {t('workspace.routes.create-route-modal.button')}
      </Button>
      <WorkspaceCreateRouteModal isOpen={isCreateRouteModalOpen} onClose={closeRouteModal} />
    </Box>
  );
};
