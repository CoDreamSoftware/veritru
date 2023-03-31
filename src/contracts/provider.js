import { ethers } from "ethers"

const API_KEY = process.env.INFURA_API_KEY

let provider

// Let user interact with metamask provider
if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
    // We are in the browser and metamask is running.
    if (localStorage.getItem('userConnectedWallet') === 'true') {
        if (localStorage.getItem('isWalletConnected') === 'true') {
            window.ethereum.request({ method: "eth_requestAccounts" })
            provider = new ethers.providers.Web3Provider(window.ethereum)
        }
    }
}

// Use Infura Provider instead
else {
    // We are on the server *OR* the user is not running metamask
    provider = new ethers.providers.InfuraProvider(
        'goerli',
        API_KEY
    )
}

// Export a function to get the provider
export function getProvider() {
    return provider
}