import '../styles/globals.css'
import '../styles/font.css'

import { providers } from 'ethers'
import type { AppProps } from 'next/app'
import { Toaster } from 'react-hot-toast'
import ErrorBoundary from 'src/components/ErrorBoundary'
import { Provider } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'

const rpcUrl = process.env.NEXT_PUBLIC_RPC_URL as string

const supportedChains = [
  {
    id: 1285,
    name: 'Moonriver',
    // nativeCurrency: { name: 'Moonriver', symbol: 'MOVR', decimal: 18 },
    rpcUrls: [rpcUrl],
    blockExplorers: [
      { name: 'Moonscan', url: 'https://moonbeam.moonscan.io/' }
    ],
    testnet: true
  }
]

const connectors = () => {
  return [
    new InjectedConnector({ chains: supportedChains }),
    new WalletConnectConnector({
      options: {
        rpc: {
          1285: rpcUrl
        },
        qrcode: true
      }
    })
  ]
}

const provider = () =>
  new providers.StaticJsonRpcProvider(rpcUrl, {
    chainId: 1285,
    name: 'moonriver'
  })

function MyApp({ Component, pageProps }: AppProps) {
  console.log('PAGE PROPS ', pageProps)
  return (
    <ErrorBoundary>
      <Provider
        autoConnect
        connectorStorageKey="chewy.wallet"
        connectors={connectors}
        provider={provider}
      >
        <Toaster position="top-right" />
        <Component {...pageProps} />
      </Provider>
    </ErrorBoundary>
  )
}
export const getStaticProps = async () => {
  const resPriceFeed = await fetch('https://chewy-api.vercel.app/prices')
  const resPriceFeedJson = await resPriceFeed.json()
  const resApyList = await fetch('https://chewy-api.vercel.app/apy')
  const resApyListJson = await resApyList.json()
  return {
    props: {
      resPriceFeed: resPriceFeedJson,
      resApyList: resApyListJson
    }
  }
}

export default MyApp
