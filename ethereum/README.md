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
    ```javascript
    npm install -g truffle
    ```

2. In the `ethereum` directory, you can see the directory structure of truffle.
    ```bash
    cd ethereum
    ls
    /contracts /migrations /test truffle-config.js
    ```

3. Compile and migrate the smart contracts.
    ```javascript
    truffle compile
    truffle migrate
    ```

4. Truffle can run tests written in JavaScript against your smart contracts which you find at the `ethereum/test/` directory. Note the command varies slightly if you're in or outside of the development console.
    ```javascript
    // inside the development console.
    truffle develop
    test

    // outside the development console..
    truffle test
    ```