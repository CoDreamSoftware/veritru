// Interact with smart contract
import contract from "@/contracts/compile/Veritru.json"
import { ethers } from "ethers"

const contractAddress = process.env.CONTRACT_ADDRESS

// Contract
export async function VeritruProvider(provider) {
    const instance = new ethers.Contract(
        contractAddress,
        contract.abi,
        provider
    )
    return instance
}

// Contract
export async function VeritruSigner(signer) {
    const instance = new ethers.Contract(
        contractAddress,
        contract.abi,
        signer
    )
    return instance
}