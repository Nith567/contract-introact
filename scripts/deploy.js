
const hre = require("hardhat");

async function main() {
  const [owner, ram, sita] = await hre.ethers.getSigners();

  const DatingContract = await hre.ethers.getContractFactory('DatingContract');
  const datingcontract = await DatingContract.deploy(ram.address, sita.address);


  const addresses = [owner.address, ram.address, sita.address];
  console.log('Addresses:', addresses);

  const amount = { value: hre.ethers.parseEther("3")};

  // Simulate Ram sending a request
  try {
    const tx = await datingcontract.connect(ram).sendRequest();
    await tx.wait();
    console.log('Ram sent a request');
  } catch (error) {
    console.error('Error sending request:', error.message);
  }

  // Simulate Ram making a payment
  try {
    const tx = await datingcontract.connect(ram).sendPayment({ value: amount.value });
    await tx.wait();
    console.log('Ram made a payment');
  } catch (error) {
    console.error('Error making payment:', error.message);
  }
  // Simulate Sita making a payment
  try {
    const tx = await datingcontract.connect(sita).paySita({ value: amount.value });
    await tx.wait();
    console.log('Sita made a payment');
  } catch (error) {
    console.error('Error making payment:', error.message);
  }
  // Simulate Sita accepting the request
  try {
    const tx = await datingcontract.connect(sita).acceptRequest();
    await tx.wait();
    console.log('Sita accepted the request');
  } catch (error) {
    console.error('Error accepting request:', error.message);
  }

  console.log("sita now accepting after payment ")

 

  // Confirm photos
  try {
    const tx = await datingcontract.connect(owner).confirmPhotos();
    await tx.wait();
    console.log('Photos confirmed');
  } catch (error) {
    console.error('Error confirming photos:', error.message);
  }

  console.log('Deployment and interactions completed the final results  .');

  
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

