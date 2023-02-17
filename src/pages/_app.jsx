import '@/styles/globals.css'
import { ChakraProvider } from '@chakra-ui/react'
import theme from './_theme'
import MetamaskProvider from '@/context/Metamask' 

export default function App({ Component, pageProps }) {
    return (
        <ChakraProvider theme={theme}>
            <MetamaskProvider>
                <Component {...pageProps} />
            </MetamaskProvider>
        </ChakraProvider>
    )
}
