'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { ReactNode, useMemo } from 'react';

const ReactQueryProvider = ({ children }: { children: ReactNode }) => {
  const queryClient = useMemo(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            retry: 0,
            staleTime: Infinity,
          },
          mutations: {
            retry: 0,
          },
        },
      }),
    [],
  );

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};

export default ReactQueryProvider;
