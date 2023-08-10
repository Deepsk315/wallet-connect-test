
export const env = 'test'

export const url = () => {
  switch (env) {
    case 'prod':
      return 'https://'
    case 'test':
      return 'https://w3api.ceewen.xyz/'
    default: //dev
      return 'https://3e73-45-32-14-180.ngrok-free.app/'
  }
}


export const TOKENS = env == "prod" ? {
  //production ids 1 = eth mainnet and 137 = polygon mainnet
  1: {
    JSONRPCPROVIDER:
    "https://mainnet.infura.io/v3/76c9150bab304d2c9bd9daf8c6c7a15f"
  },
  137: {
    JSONRPCPROVIDER: "https://polygon-rpc.com/"
  }
} : {
  //testnets ids 80001 = polygon testnet and 4 = eth testnet
  80001: {
    JSONRPCPROVIDER: "https://rpc-mumbai.maticvigil.com/"
  },
  5: {
    JSONRPCPROVIDER:
    "https://goerli.infura.io/v3/76c9150bab304d2c9bd9daf8c6c7a15f"
  },
  1: {
    JSONRPCPROVIDER:
    "https://mainnet.infura.io/v3/76c9150bab304d2c9bd9daf8c6c7a15f"
  },
  137: {
    JSONRPCPROVIDER: "https://polygon-rpc.com/"
  }
}
