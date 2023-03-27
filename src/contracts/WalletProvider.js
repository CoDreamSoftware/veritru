import { createContext, useContext, useState } from 'react'
import { ethers } from 'ethers'

const WalletContext = createContext()
const API_KEY = process.env.INFURA_API_KEY

function WalletProvider({ children }) {
    const [provider, setProvider] = useState(null)

    async function connectWallet() {
        if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
            // Request account access if needed
            window.ethereum.request({ method: "eth_requestAccounts" })
            // We are in the browser and metamask is running
            const web3Provider = new ethers.providers.Web3Provider(window.ethereum)
            setProvider(web3Provider)
        } else {
            // Fallback to using Infura provider
            // We are on the server *OR* the user is not running metamask
            const infuraProvider = new ethers.providers.InfuraProvider('goerli', API_KEY)
            setProvider(infuraProvider)
        }
    }

    return (
        <WalletContext.Provider value={{ provider, connectWallet }}>
            {children}
        </WalletContext.Provider>
    )
}

const useWallet = () => useContext(WalletContext)

export { WalletProvider, useWallet }