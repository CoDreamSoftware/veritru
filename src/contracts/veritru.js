import contract from "@/contracts/compile/Veritru.json"
import web3 from "@/contracts/web3"

const contractAddress = process.env.CONTRACT_ADDRESS
const contractInterface = contract.abi

const Veritru = new web3.eth.Contract(
    contractInterface, 
    contractAddress
)


export default Veritru