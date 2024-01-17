import { Suspense } from 'react'
import { HelmetProvider } from 'react-helmet-async'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from '~/lib/react-query'
import { ErrorBoundary } from 'react-error-boundary'
import ErrorFallback from '~/components/ErrorFallback.tsx'

interface AppProviderProps extends React.PropsWithChildren {}

const Loading = () => (
  <div className="flex items-center justify-center w-screen h-screen">
    {/*<Spinner size="xl" />*/}
    <p>Loading...</p>
  </div>
)

export const AppProvider = (props: AppProviderProps) => {
  return (
    <Suspense fallback={<Loading />}>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <HelmetProvider>
          <QueryClientProvider client={queryClient}>
            {/*{process.env.NODE_ENV !== 'test' && <ReactQueryDevtools />}*/}
            {/*<Notifications />*/}
            {/*<AuthProvider>*/}
            {props.children}
            {/*</AuthProvider>*/}
          </QueryClientProvider>
        </HelmetProvider>
      </ErrorBoundary>
    </Suspense>
  )
}
