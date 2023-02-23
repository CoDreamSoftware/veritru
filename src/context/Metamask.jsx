import { createContext, useEffect, useState } from 'react'
import { truncateAddress } from '@/utilities/address.utils';
import { useToast } from '@chakra-ui/react';

export const MetamaskContext = createContext()

const { ethereum } = typeof window !== 'undefined' ? window : {}

const MetamaskProvider = ({ children }) => {
    const [disconnected, setDisconnected] = useState(false)
    const [account, setAccount] = useState('')
    
    const toast = useToast()
    const successMessage = (value) => {
        toast({
            title: 'Success',
            description: `Connected to ${value}`,
            status: 'success',
            duration: 3000,
            isClosable: true,
            position: 'bottom-right',
        })
    }
    const errorMessage = (value) => {
        toast({
            title: 'Error',
            description: `${value}`,
            status: 'error',
            duration: 3000,
            isClosable: true,
            position: 'bottom-right',
        })
    }

    const isMetamaskInstalled = () => {
        if (!ethereum) {
            errorMessage('Please Install MetaMask.')
            return false
        }
        return true
    }

    const isMetamaskConnected = async () => {
        try {
            const accounts = await ethereum.request({
                method: 'eth_accounts',
            })
            console.log(accounts)
            setAccount(accounts[0])
        } catch (err) {
            errorMessage(err.message)
        }
    }

    const connectWallet = async () => {
        if (isMetamaskInstalled()) {
            try {
                const accounts = await ethereum.request({
                    method: 'eth_requestAccounts',
                })
                console.log(accounts)
                setAccount(accounts[0])
                successMessage(truncateAddress(accounts[0])) 
            } catch (err) {
                errorMessage(err.message)
            }
        }
    }

    const disconnect = () => {
        setAccount('')
        setDisconnected(true)
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
    }, [])

    return (
        <MetamaskContext.Provider value={{account, connectWallet, disconnect}}>
            {children}
        </MetamaskContext.Provider>
    )
}

export default MetamaskProvider
