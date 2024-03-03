import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts } = hre;
  const { deploy, getOrNull, log } = deployments;
  const { deployer } = await getNamedAccounts();

  const Lock = await getOrNull("Lock");
  if (!Lock) {
    const unlockTime = "100000000000";
    await deploy("Lock", { from: deployer, log: true, args: [unlockTime] });
  } else {
    log("Lock already deployed, skipping...");
  }
};
export default func;
