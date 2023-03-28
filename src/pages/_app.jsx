import '@/styles/globals.css'
import '@fontsource/poppins'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'

import { WalletProvider } from '@/contracts/WalletProvider'
import { SessionProvider } from 'next-auth/react'

import { WagmiConfig, createClient, configureChains } from 'wagmi'
import { goerli, sepolia } from 'wagmi/chains'
import { infuraProvider } from 'wagmi/providers/infura'
import { publicProvider } from 'wagmi/providers/public'

// Configure chains & providers with the Infura provider.
// Two popular providers are Alchemy (alchemy.com) and Infura (infura.io)
const { chains, provider, webSocketProvider } = configureChains(
    [goerli, sepolia],
    [infuraProvider({ apiKey: process.env.INFURA_API_KEY, priority:0 }), publicProvider()]
)

// Setup client
const client = createClient({
    autoConnect: false,
    provider,
    webSocketProvider
})

const theme = extendTheme({
    fonts: {
        heading: `Poppins`,
        body: `Poppins`,
    },
})

export default function App({ Component, pageProps: { session, ...pageProps } }) {
    return (
        <SessionProvider session={session}>
            <WagmiConfig client={client}>
                <WalletProvider>
                    <ChakraProvider theme={theme}>
                        <Component {...pageProps} />
                    </ChakraProvider>
                </WalletProvider>
            </WagmiConfig>
        </SessionProvider>
    )
}
