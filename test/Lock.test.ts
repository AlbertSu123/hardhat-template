import { expect } from "chai";
import { ethers } from "hardhat";
import { Lock } from "../typechain-types";
import { SignerWithAddress } from "@nomicfoundation/hardhat-ethers/signers";
import { time } from "@nomicfoundation/hardhat-network-helpers";

describe("Lock", function () {
  const unlockTime = 10000000000000n;
  const funding = 1000n;

  let deployerAccount: SignerWithAddress;
  let Lock: Lock;

  before(async function () {
    [deployerAccount] = await ethers.getSigners();
    Lock = await ethers.deployContract("Lock", [unlockTime], {
      from: deployerAccount,
      value: funding,
    });
  });

  it("Should initialize with correct unlock time", async function () {
    expect(await Lock.unlockTime()).to.equal(unlockTime);
  });

  it("Should be able to unlock at the correct time", async function () {
    await time.increaseTo(unlockTime);
    const beforeBal = await ethers.provider.getBalance(await Lock.getAddress());
    await Lock.connect(deployerAccount).withdraw();
    const afterBal = await ethers.provider.getBalance(await Lock.getAddress());
    expect(beforeBal - afterBal).to.equal(funding);
  });
});
