import { ReactChild } from 'react';

export function AuthPage({ children }: { children: ReactChild }) {
  return (
    <>
      Auth page
      {children}
    </>
  );
}
