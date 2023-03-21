// Interact with smart contract
import contract from "@/contracts/compile/Veritru.json"
import { ethers } from "ethers"

const contractAddress = process.env.CONTRACT_ADDRESS

// Contract
export async function Veritru(signer) {
    const instance = new ethers.Contract(
        contractAddress,
        contract.abi,
        signer
    )
    return instance
}