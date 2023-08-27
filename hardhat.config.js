require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config()
/** @type import('hardhat/config').HardhatUserConfig */

const sepolia_url = process.env.sepolia_url;
const PRIVATE_KEY = process.env.PRIVATE_KEY;

module.exports = {
  solidity: "0.8.10",
  networks: {
    Sepolia: {
      url: sepolia_url,
      accounts: [PRIVATE_KEY]
    }
  }
};