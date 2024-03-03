import { HardhatUserConfig } from "hardhat/config";
import "hardhat-deploy";
import "hardhat-contract-sizer";
import "@nomicfoundation/hardhat-verify";
import "@nomicfoundation/hardhat-ethers";
import "@typechain/hardhat";

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.24",
    settings: {
      optimizer: {
        enabled: true,
        runs: 10_000,
      },
    },
  },
  networks: {
    hardhat: {
      deploy: ["./deploy/hardhat/"],
      accounts: {
        mnemonic:
          "abstract vacuum mammal awkward pudding scene penalty purchase dinner depart evoke puzzle",
      },
    },
    sepolia: {
      deploy: ["./deploy/sepolia/"],
      url: process.env.SEPOLIA_RPC_URL,
      chainId: 11155111,
      accounts: [process.env.DEPLOYER_PRIVATE_KEY!],
    },
  },
  namedAccounts: {
    deployer: {
      hardhat: 0,
      sepolia: "0x08C6fBA53BF2Ae19DBdC330E258B510c1C148e44",
    },
  },
  etherscan: {
    apiKey: {
      sepolia: process.env.ETHERSCAN_API_KEY!,
      edgelessSepoliaTestnet:
        "You can enter any api key here, it doesn't matter ",
    },
    customChains: [
      {
        network: "edgelessSepoliaTestnet",
        chainId: 202,
        urls: {
          apiURL: "https://edgeless-testnet.explorer.caldera.xyz/api/",
          browserURL: "https://edgeless-testnet.explorer.caldera.xyz/",
        },
      },
    ],
  },
};

export default config;
