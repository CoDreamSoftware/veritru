## VeriTru by CoDream Software

## Installation

First ensure you are in a new and empty directory.

1. Clone repository and navigate to the repo
   ```javascript
   git clone
   cd veritru
   ```

2. Install Truffle globally.
    ```javascript
    npm install -g truffle
    ```

3. Create a `.env.local` file and copy the contents from `.env.example`, this is to securely store your env variables. `Don't forget to pass all the env variables to next.config.js as well to be able to use them in your project.`
   ```
    ## .env.local
    INFURA_API_KEY="Your Infura API Key"
    INFURA_IPFS_ID="Your Infura IPFS Key"
    INFURA_IPFS_SECRET="Your Infura IPFS Secret Key"
    CONTRACT_ADDRESS="Contract Address of your contract"
   ```
   ```javascript
   // next.config.js
   env: {
        INFURA_API_KEY: process.env.INFURA_API_KEY,
        INFURA_IPFS_ID: process.env.INFURA_IPFS_ID,
        INFURA_IPFS_SECRET: process.env.INFURA_IPFS_SECRET,
        CONTRACT_ADDRESS: process.env.CONTRACT_ADDRESS,
   }
   ```

4. In the `ethereum` directory, you can see the directory structure of truffle.
    ```bash
    cd ethereum
    ls
    /contracts /migrations /test truffle-config.js
    ```

5. Compile and migrate the smart contracts.
    ```javascript
    truffle compile
    truffle migrate
    ```

6. Back in the `veritru` project directory, we can run the Nextjs app. Smart contract changes must be manually recompiled and migrated.
    ```javascript
    // create another terminal (i.e. not in the truffle develop prompt)
    npm run dev
    ```

7. Truffle can run tests written in JavaScript against your smart contracts which you find at the `ethereum/test/` directory. Note the command varies slightly if you're in or outside of the development console.
    ```javascript
    // inside the development console.
    truffle develop
    test

    // outside the development console..
    truffle test
    ```

8. To build the application for production, use the build script. A production build will be in the `/build` folder.
    ```javascript
    // ensure you are inside the client directory when running this
    npm run build
    ```