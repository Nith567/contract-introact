const hre = require("hardhat");

async function main() {
  console.log("deploying...");
  const FlashLoan = await hre.ethers.getContractFactory("FlashLoan");
  const flashLoan = await FlashLoan.deploy(
    "0x0496275d34753A48320CA58103d5220d394FF77F"
  );
  const address = await flashLoan.getAddress();
  console.log("Flash loan contract deployed: ", address);
 
}
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
