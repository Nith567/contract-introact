// const hre = require("hardhat");

const hre = require("hardhat");

async function main() {
    const [owner, ram, sita] = await hre.ethers.getSigners();
    const ramAddress = "0x8A0d290b2EE35eFde47810CA8fF057e109e4190B";
    const sitaAddress = "0x161D70B69fdbD2D4656Dd1ba62845DEa5008c634";

    const DatingContract = await hre.ethers.getContractFactory('DatingContract');
    const datingcontract = await DatingContract.deploy(ramAddress, sitaAddress);
    //  await datingcontract.deployed();
    // await datingcontract.deployTransaction.wait();
    const addresses = [owner.address, ramAddress, sitaAddress];
    console.log(`Our contract is deployed to:`, datingcontract.address);
    for (const address of addresses) {
      console.log(address);
    }
}

const runMain = async() => {
  try {
    await main();
    process.exit(0);
  } catch(error) {
    console.log(error);
    process.exit(1);
  }
}

runMain();


// async function main() {
//     const [owner, ram, sita] = await hre.ethers.getSigners();
//      ram.address= 0x8A0d290b2EE35eFde47810CA8fF057e109e4190B
//      sita.address=0x161D70B69fdbD2D4656Dd1ba62845DEa5008c634
//     const DatingContract = await hre.ethers.getContractFactory('DatingContract');
//     const datingcontract = await DatingContract.deploy(ram.address,sita.address);
  


//   await datingcontract.deployed()
//     const addresses = [owner.address, ram.address, sita.address];
//     console.log(`our contract is  deployed to:`,datingcontract.address)
// }
// main()
//   .then(() => process.exit(0))
//   .catch((error) => {
//     console.error(error);
//     process.exit(1);
//   });
