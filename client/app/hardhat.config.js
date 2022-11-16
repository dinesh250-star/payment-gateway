require("@nomicfoundation/hardhat-toolbox");
require("@nomiclabs/hardhat-ethers");
require("dotenv").config();
require("@nomicfoundation/hardhat-chai-matchers");
/** @type import('hardhat/config').HardhatUserConfig */

module.exports = {
  solidity: "0.8.4",
  paths: {
    artifacts: "./src/artifacts",
  },
  networks: {
    ganache: {
      url: "HTTP://127.0.0.1:7545",
      accounts: [`${process.env.REACT_APP_PVT_KEY}`],
    },
    hardhat: {
      chainId: 1337,
    },
  },
};
