import { createConfig, configureChains } from 'wagmi'
import {
  goerli,
  mainnet,
  polygon,
  polygonMumbai
} from 'wagmi/chains';
import { EthereumClient, w3mConnectors, w3mProvider } from '@web3modal/ethereum'

const chains = [polygonMumbai , polygon , goerli , mainnet]
const projectId = '6bf69837af27b0625c701b85d11345c8'

export const { publicClient } = configureChains(chains, [w3mProvider({ projectId })]);
export const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: w3mConnectors({ chains, projectId }),
  publicClient
});

export const ethereumClient = new EthereumClient(wagmiConfig, chains);