const Web3 = require('web3');
const ethers = require('ethers');
const factory = require('../artifacts/contracts/Hifi.sol/Hifi.json');
const HDWalletProvider = require("@truffle/hdwallet-provider");
const { mnemonic, walletAddress, infuraKey, contractAddr } = require('../secrets.json');
const {
  expectRevert,
  expectEvent,
  BN,
  ether,
  constants,
  balance,
  send
} = require('@openzeppelin/test-helpers');

const ownerAddr = "0xD387098B3CA4C6D592Be0cE0B69E83BE86011c50";

const main = async () => {
  console.log('here executed');
  try {
    let provider = new HDWalletProvider({
      mnemonic: {
        phrase: mnemonic
      },
      providerOrUrl: 'https://rinkeby.infura.io/v3/' + infuraKey
    });
    const web3 = new Web3(provider);
    const contract = new web3.eth.Contract(factory.abi, contractAddr);

    const tx = await contract.methods.mint(ownerAddr).send({
      from: ownerAddr,
      gas: 4600000,
      gasLimit: 800000
    });
    
  } catch(e) {
    console.log('this is error', e);
  }
}
module.exports = async function(callback) {
  // perform actions
  await main();
}