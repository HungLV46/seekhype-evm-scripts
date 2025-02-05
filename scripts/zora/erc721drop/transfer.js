/**
 * Script to create Zora drop
 */
require("dotenv").config();

const { getNetworkConfig } = require("../../../config/network-config");
const { ethers } = require("hardhat");
const fs = require("fs");

const collectionAddress = "0xab20ee01c395f64efd9f45b12a9633e054d0bdf6";
const tokenId = 21;

// A5 user is owner of token: 0xBf5A7aB89ac095b221522B430306D67b44e50955
// A6 is offerer: 0x5606b4eA93F696Dd82Ca983BAF5723d00729f127
async function transfer() {
  const networkConfig = getNetworkConfig(process.env.CHAIN_NAME);

  const provider = new ethers.JsonRpcProvider(networkConfig.json_rpc_url);
  const deployer = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

  // 1. filler approve erc721 transfer helper to transfer token in collection
  const dropABI = JSON.parse(
    fs.readFileSync("./config/abis/ERC721Drop.json"),
  ).abi;
  const dropContract = new ethers.Contract(
    collectionAddress,
    dropABI,
    deployer,
  );
  const approveResponse = await dropContract.transferFrom(
    "0x5606b4eA93F696Dd82Ca983BAF5723d00729f127",
    networkConfig.multicall_addresses.ATTACKER,
    tokenId,
  );
}

transfer();
