import { createContext, useEffect, useState } from 'react'

export const MetamaskContext = createContext()

const { ethereum } = typeof window !== 'undefined' ? window : {}

const MetamaskProvider = ({ children }) => {
    const [account, setAccount] = useState('')
    const [error, setError] = useState('')

    const checkEthereumExists = () => {
        if (!ethereum) {
            setError('Please Install MetaMask.')
            return false
        }
        return true
    }

    const getConnectedAccounts = async () => {
        initErrorState()
        try {
            const accounts = await ethereum.request({
                method: 'eth_accounts',
            })
            console.log(accounts)
            setAccount(accounts[0])
        } catch (err) {
            setError(err.message)
        }
    }

    const connectWallet = async () => {
        initErrorState()
        if (checkEthereumExists()) {
            try {
                const accounts = await ethereum.request({
                    method: 'eth_requestAccounts',
                })
                console.log(accounts)
                setAccount(accounts[0])
            } catch (err) {
                setError(err.message)
            }
        }
    }

    const initErrorState = async () => {
        setError('')
    }

    const disconnect = async () => {
        setError('')
        setAccount('')
    }

    useEffect(() => {
        if (checkEthereumExists()) {
            ethereum.on('accountsChanged', getConnectedAccounts)
            getConnectedAccounts()
        }
        return () => {
            if (checkEthereumExists()) {
                ethereum.removeListener('accountsChanged', getConnectedAccounts)
            }
        }
    }, [])

    return (
        <MetamaskContext.Provider value={{ account, connectWallet, initErrorState, error, disconnect }}>
            {children}
        </MetamaskContext.Provider>
    )
}

export default MetamaskProvider
