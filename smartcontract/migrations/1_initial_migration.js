const Migrations = artifacts.require("Migrations");
const MeritBlockNFT = artifacts.require("MeritBlockNFT");

module.exports = async function (deployer, network, accounts) {
  await deployer.deploy(Migrations);
  const meritBlockNFT = await deployer.deploy(MeritBlockNFT);

  await meritBlockNFT.changeMinter(accounts[0], true);
};
