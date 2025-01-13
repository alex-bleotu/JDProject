import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {
  solidity: "0.8.28",
  networks: {
    testnet: {
      url: "http://95.179.246.157:8545",
      chainId: 1337,
      accounts: ["0xc6ff6c42f3115b1c8309e061976c28183d37412f1ff2477a0154b50254d9a516"],
    },
  },
};

export default config;
