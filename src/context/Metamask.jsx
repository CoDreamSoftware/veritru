import { createContext, useEffect, useState } from 'react'
import { truncateAddress } from '@/utilities/address.utils'
import { useToast } from '@chakra-ui/react'

export const MetamaskContext = createContext()

const { ethereum } = typeof window !== 'undefined' ? window : {}

const MetamaskProvider = ({ children }) => {
    const [account, setAccount] = useState('')
    const [connected, setConnected] = useState(false)

    const toaster = useToast()
    const toast = (value) => {
        toaster({
            title: value.title,
            description: value.msg,
            status: value.stats,
            duration: 3000,
            isClosable: true,
            position: 'top',
        })
    }

    const isMetamaskInstalled = () => {
        if (!ethereum) {
            toast({
                title: 'Error!', 
                msg: 'Please Install MetaMask.', 
                stats: 'error'
            })
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
            toast({
                title: 'Error!', 
                msg: `${err.message}`, 
                stats: 'error'
            })
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
                toast({
                    title: 'Success!', 
                    msg: `Connected to ${truncateAddress(accounts[0])}`, 
                    stats: 'success'
                })
            } catch (err) {
                toast({
                    title: 'Error!', 
                    msg: `${err.message}`, 
                    stats: 'error'
                })
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
