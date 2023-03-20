## VeriTru by CoDream Software

## truffle version
- Truffle v5.7.8 (core: 5.7.8)
- Ganache v7.7.5
- Solidity v0.5.16 (solc-js)
- Node v18.14.0
- Web3.js v1.8.2

## npm --version 
- 8.19.4

Ensure you are in a `ethereum` directory.

1. Install Truffle globally.
    ```
    npm install -g truffle
    ```

2. In the `ethereum` directory, you can see the directory structure of truffle.
    ```
    cd ethereum
    ls
    /contracts /migrations /test truffle-config.js
    ```

3. Create a `.env.local` file and copy the contents from `.env.example`, this is to securely store your env variables. `Don't forget to pass all the env variables to next.config.js as well to be able to use them in your project.`
   ```
    ## .env.local
    INFURA_API_KEY="Your Infura API Key"
    PRIVATE_KEY="Account Address where the contract was deployed"
    CONTRACT_ADDRESS="Contract Address of your contract"
   ```

4. If `3` is not working, replace the following with your PRIVATE_KEY and INFURA_API_KEY in `truffle-config.js`: (Don't forget to revert the changes back once you have finished migrating your contract) (DO NOT UPLOAD THIS WITH YOUR KEYS EXPOSED)
   ```js
    goerli: {
    provider: () => new HDWalletProvider(
        `YOUR_PRIVATE_KEY_HERE`, 
        `https://goerli.infura.io/v3/YOUR_INFURA_API_KEY_HERE`, 
        AccountIndex
    ),
    network_id: 5,
    gas: 5500000,
    },
   ```

5. Compile and migrate the smart contracts.
    ```javascript
    // create a json format for abi
    truffle compile

    // deploy the smart contract
    truffle migrate --network [configNetwork]
    // Note: --network specifies on what network you
    // will deploy the contract based from your truffle-config.js
    // By default, it will look for a network named `development`
    ```

6. Truffle can run tests written in JavaScript against your smart contracts which you find at the `ethereum/test/` directory. Note the command varies slightly if you're in or outside of the development console.
    ```javascript
    // inside the development console..
    truffle develop
    test

    // outside the development console..
    truffle test
    ```