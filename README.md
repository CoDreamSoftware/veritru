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

3. In the `ethereum` directory, you can see the directory structure of truffle.
    ```bash
    cd ethereum
    ls
    /contracts /migrations /test truffle-config.js
    ```

4. Compile and migrate the smart contracts.
    ```javascript
    truffle compile
    truffle migrate
    ```

5. Back in the `veritru` project directory, we can run the Nextjs app. Smart contract changes must be manually recompiled and migrated.
    ```javascript
    // create another terminal (i.e. not in the truffle develop prompt)
    npm run dev
    ```

6. Truffle can run tests written in JavaScript against your smart contracts which you find at the `ethereum/test/` directory. Note the command varies slightly if you're in or outside of the development console.
    ```javascript
    // inside the development console.
    truffle develop
    test

    // outside the development console..
    truffle test
    ```

7. To build the application for production, use the build script. A production build will be in the `/build` folder.
    ```javascript
    // ensure you are inside the client directory when running this
    npm run build
    ```