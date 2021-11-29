const { ethers, upgrades } = require("hardhat");

async function main() {
  const baseInstance = await ethers.getContractFactory("Hifi");
  const Hifi = await baseInstance.deploy("Hifi", "Hifi", "https://gateway.pinata.cloud/ipfs/QmVsiTX927j76bRrRRZM95Q4YP6KrdKGsHHBZQwNFed3u4/");
  console.log("Hifi Contract is deployed to:", Hifi.address);
}

main();