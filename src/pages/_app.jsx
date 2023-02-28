import '@/styles/globals.css'
import { ChakraProvider } from '@chakra-ui/react'
import theme from './_theme'

import { SessionProvider } from "next-auth/react"
//<SessionProvider session={session}></SessionProvider>

import { WagmiConfig, createClient, configureChains } from 'wagmi'
import { goerli } from 'wagmi/chains'
import { infuraProvider } from 'wagmi/providers/infura'
import { publicProvider } from 'wagmi/providers/public'

// Configure chains & providers with the Infura provider.
// Two popular providers are Alchemy (alchemy.com) and Infura (infura.io)
const { chains, provider, webSocketProvider } = configureChains(
    [goerli],
    [infuraProvider({ apiKey: process.env.INFURA_API_KEY, priority:0 }), publicProvider()]
)

// Setup client
const client = createClient({
    autoConnect: true,
    provider,
    webSocketProvider
})

export default function App({ Component, pageProps }) {
    return (
        <WagmiConfig client={client}>
            <ChakraProvider theme={theme}>
                <Component {...pageProps} />
            </ChakraProvider>
        </WagmiConfig>
    )
}
