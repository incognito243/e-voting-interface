"use client";

import './global.css';
import {Inter} from 'next/font/google';
import React from "react";
import {themeAntd, themeStyledComponents} from "@/utils/themeConfig";
import {ConfigProvider, Layout} from "antd";
import {Sidebar} from "@/components/Common/Sidebar";
import HeaderBar from "@/components/Common/HeaderBar";
// import FooterBar from "@/components/Layout/FooterBar";
import {ThemeProvider} from "styled-components";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {EthereumWalletConnectors} from "@dynamic-labs/ethereum";
import {DynamicContextProvider} from "@dynamic-labs/sdk-react-core";
import {UserProvider} from "@/context/UserContext";
import {WagmiProvider} from "wagmi";
import {clientConfig} from "@/constant/chain";
import {DynamicWagmiConnector} from "@dynamic-labs/wagmi-connector";
// import { DynamicWagmiConnector } from "@dynamic-labs/wagmi-connector";

const inter = Inter({subsets: ['latin']});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      retryDelay: 500,
    },
  },
});

export default function RootLayout({children}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
    <body className={inter.className}>
    <DynamicContextProvider
      settings={{
        environmentId: "0af9f21a-90e0-4e8c-970e-74ce2b04f70f",
        walletConnectors: [EthereumWalletConnectors],
        initialAuthenticationMode: "connect-only",
      }}
      theme="dark"
    >
      <WagmiProvider config={clientConfig}>
        <UserProvider>
          <ConfigProvider theme={themeAntd}>
            <QueryClientProvider client={queryClient}>
              <DynamicWagmiConnector>
                <ThemeProvider theme={themeStyledComponents}>
                  <Layout style={{minHeight: '100vh'}}>
                    <Sidebar/>
                    <Layout>
                      <HeaderBar/>
                      {children}
                      {/*<FooterBar/>*/}
                    </Layout>
                  </Layout>
                </ThemeProvider>
              </DynamicWagmiConnector>
            </QueryClientProvider>
          </ConfigProvider>
        </UserProvider>
      </WagmiProvider>
    </DynamicContextProvider>
    </body>
    </html>
  );
}