import { ComponentType } from 'react';

type Hoc = (Component: ComponentType) => ComponentType;

export const connectComponentHoc =
  (Component: ComponentType): ((...connections: Hoc[]) => ComponentType) =>
  (...connections: Hoc[]) =>
    connections.reduce((acc, connection) => connection(acc), Component);
