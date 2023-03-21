const API_KEY = process.env.INFURA_API_KEY
import { ethers } from "ethers"

let provider

// Let user interact with metamask provider
if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
    // We are in the browser and metamask is running.
    window.ethereum.request({ method: "eth_requestAccounts" })
    provider = new ethers.providers.Web3Provider(window.ethereum)
}

// Use Infura Provider instead
else {
    // We are on the server *OR* the user is not running metamask
    provider = new ethers.providers.InfuraProvider(
        'goerli',
        API_KEY
    )
}

export default provider