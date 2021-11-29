const Web3 = require('web3');
const ethers = require('ethers');
const factory = require('../artifacts/contracts/Hifi.sol/Hifi.json');
const HDWalletProvider = require("@truffle/hdwallet-provider");
const { mnemonic, walletAddress, contractAddr } = require('../secrets.json');
const fs = require("fs");

const mintNft = async () => {
    let provider = new HDWalletProvider({
        mnemonic: {
            phrase: mnemonic
        },
        providerOrUrl: "https://data-seed-prebsc-1-s1.binance.org:8545"
    });
    const web3 = new Web3(provider);
    const contract = new web3.eth.Contract(factory.abi, contractAddr);


    try {
        for(let i=0; i<100; i++) {
            const tx = await contract.methods.mint().send({
                from: walletAddress,
                gas: 4600000,
                gasLimit: 800000,
            });
            console.log( i + ' minting success');
            await sleep(1000)
        }
        console.log('Minting 100 nft is success!')
    } catch (e) {
        throw new Error(`mint tx error: ${e}`);
    }
}

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

const randomeePerToken = async () => {
    let provider = new HDWalletProvider({
        mnemonic: {
            phrase: mnemonic
        },
        providerOrUrl: "https://data-seed-prebsc-1-s1.binance.org:8545"
    });
    const web3 = new Web3(provider);
    const contract = new web3.eth.Contract(factory.abi, contractAddr);

    try {
        let randomArr = []
        for(let i=0; i<1000; i++) {
            let item = {};
            const randomee = await contract.methods.randomeeFromTokenId(i).call()
            item.tokenId = i;
            item.randomNumber = randomee;

            randomArr.push(item);
            
            if(i % 50 == 0) {
                console.log(i + ' data are made!');
            }
        }

        // Make the data
        fs.writeFileSync(
        	`randData.txt`,
        	JSON.stringify(randomArr, null, 2)
        );
        // console.log(randomArr);
    } catch(e) {
        throw new Error(`error: ${e}`)
    }
}

mintNft();
// randomeePerToken();
