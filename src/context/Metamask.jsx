import { createContext, useEffect, useState } from 'react'
import { truncateAddress } from '@/utilities/address.utils'
import { useToast } from '@chakra-ui/react'

export const MetamaskContext = createContext()

const { ethereum } = typeof window !== 'undefined' ? window : {}

const MetamaskProvider = ({ children }) => {
    const [account, setAccount] = useState('')
    const [connected, setConnected] = useState(false)

    const toast = useToast()
    const successMessage = (value) => {
        toast({
            title: 'Success',
            description: `Connected to ${value}`,
            status: 'success',
            duration: 3000,
            isClosable: true,
            position: 'top',
        })
    }
    const errorMessage = (value) => {
        toast({
            title: 'Error',
            description: `${value}`,
            status: 'error',
            duration: 3000,
            isClosable: true,
            position: 'top',
        })
    }

    const isMetamaskInstalled = () => {
        if (!ethereum) {
            errorMessage('Please Install MetaMask.')
            return false
        }
        return true
    }

    const disconnect = () => {
        setAccount('')
        setConnected(false)
    }

    const isMetamaskConnected = async () => {
        try {
            const accounts = await ethereum.request({
                method: 'eth_accounts'
            })
            setAccount(accounts[0])
        } catch (err) {
            errorMessage(err.message)
        }
    }

    const connectWallet = async () => {
        if (isMetamaskInstalled() ) {
            try {
                const accounts = await ethereum.request({
                    method: 'eth_requestAccounts'
                })
                setAccount(accounts[0])
                setConnected(true)
                successMessage(truncateAddress(accounts[0]))
            } catch (err) {
                errorMessage(err.message)
            }
        }
    }

    useEffect(() => {
        if (isMetamaskInstalled()) {
            ethereum.on('accountsChanged', isMetamaskConnected)
            isMetamaskConnected()
        }
        return () => {
            if (isMetamaskInstalled()) {
                ethereum.removeListener('accountsChanged', isMetamaskConnected)
            }
        }
    }, [connected])

    return (
        <MetamaskContext.Provider value={{account, connectWallet, disconnect}}>
            {children}
        </MetamaskContext.Provider>
    )
}

export default MetamaskProvider
