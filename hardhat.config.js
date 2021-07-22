const { task } = require("hardhat/config");

require("@nomiclabs/hardhat-waffle");

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

task("balances", "Gets the default address balances", async(taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();
  const provider = await hre.ethers.provider;

  for (const account of account) {
    console.log(provider.getBalance(account.address))
  }
  
})

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.4",
  paths: {
    artifacts: './src/artifacts',
  },

  networks:{
    hardhat: {
      chainId: 1337,
    },
    ropsten: {
      url: `https://ropsten.infura.io/v3/${process.env.INFURA_PROJ_ID}`,
      accounts: [`0x${process.env.ACCOUNT_KEY}`]
    },
    rinkeby: {
      url: `shttps://rinkeby.infura.io/v3/${process.env.INFURA_PROJ_ID}`,
      accounts: [`0x${process.env.RINKEBY_ACCT_KEY}`]
    }
  }
};
