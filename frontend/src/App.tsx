import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter } from 'react-router-dom';
import WithAxios from 'shared/service/withAxios';
import { SnackbarProvider } from 'notistack';
import Routes from './routes';
import { TokenProvider } from 'shared/service/token.context';
import Layout from 'shared/ui/layout';
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <SnackbarProvider maxSnack={3}>
          <TokenProvider>
            <WithAxios>
              <Layout>
                <Routes />
              </Layout>
            </WithAxios>
          </TokenProvider>
        </SnackbarProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
