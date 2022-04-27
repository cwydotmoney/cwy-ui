import { ethers } from 'ethers'
import { poolAddressesMoonriver } from 'src/chain-info/network-addreses/pool-addresses-moonriver'

import normalAbi from '../../chain-info/abis/normalMoonriverAbi.json'

const contractMappings = {
  MOVR: { contract: poolAddressesMoonriver['MoonbeamMOVR'], decimals: 18 },
  WETH: { contract: poolAddressesMoonriver['MoonbeamETH'], decimals: 18 },
  WBTC: {
    contract: poolAddressesMoonriver['MoonbeamBTCSupplyOnly'],
    decimals: 8
  },
  USDC: { contract: poolAddressesMoonriver['MoonbeamUSDC'], decimals: 6 },
  FRAX: { contract: poolAddressesMoonriver['MoonbeamFRAX'], decimals: 18 },
  USDT: { contract: poolAddressesMoonriver['MoonbeamUSDT'], decimals: 6 },
  '3POOL': {
    contract: poolAddressesMoonriver['Solarbeam3pool'],
    decimals: 18
  },
  FRAX3POOL: {
    contract: poolAddressesMoonriver['SolarbeamFrax3pool'],
    decimals: 18
  },
  'KSM-stKSM': {
    contract: poolAddressesMoonriver['SolarbeamstKSMpool'],
    decimals: 18
  }
}

export default async function handler(req, res) {
  const { vault, useraddress } = req.query
  let rpcUrl =
    'https://moonriver.blastapi.io/81297d7f-8827-4a29-86f1-a2dc3ffbf66b'
  const providerRPC = {
    moonriver: {
      name: 'moonriver',
      rpc: rpcUrl, // Insert your RPC URL here
      chainId: 1285 // 0x505 in hex,
    }
  }
  // 3. Create ethers provider
  const provider = new ethers.providers.StaticJsonRpcProvider(
    providerRPC.moonriver.rpc,
    {
      chainId: providerRPC.moonriver.chainId,
      name: providerRPC.moonriver.name
    }
  )

  var contract = new ethers.Contract(
    contractMappings[vault]['contract']['Vault'],
    normalAbi,
    provider
  )
  let balance =
    parseInt(await contract.balanceOf(useraddress)) /
    10 ** contractMappings[vault]['decimals']

  res.status(200).json({ deposited: balance })
}
