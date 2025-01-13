import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const owner = "0x64a50d78387B4d307Abd23e3fD57666D9bfdF0F4";

const RecycleChainModule = buildModule("RecycleChainModule1", (m) => {
  const lock = m.contract("RecycleChain", [owner], {
    _owner: owner,
  });
  return { lock };
});

export default RecycleChainModule;
