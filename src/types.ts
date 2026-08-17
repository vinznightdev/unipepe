export interface TokenomicsItem {
  label: string;
  value: string;
  description: string;
}

export interface BuyStep {
  stepNumber: number;
  title: string;
  description: string;
}

export const CONTRACT_ADDRESS = "0x1FAc9677f6dc1e7aDDf3eB0E4fa2f5FB9aC4F75b"; // updated contract address

export const SOCIAL_LINKS = {
  twitter: "https://x.com/Peppytheunipepe",
  telegram: "https://t.me/Peppytheunipepe",
  dexscreener: "https://dexscreener.com",
  uniswap: "https://uniswap.org",
  robinhood: "https://robinhood.com/wallet",
};

export const TOKENOMICS_DATA: TokenomicsItem[] = [
  {
    label: "Total Supply",
    value: "1,000,000,000",
    description: "No more, no less. 100% of tokens in circulation.",
  },
  {
    label: "Tax Rate",
    value: "0% Buy / Sell",
    description: "Zero transaction taxes. Keep all your $PEPPY gains.",
  },
  {
    label: "Liquidity Pool",
    value: "100% Burned",
    description: "LP tokens burnt forever. Completely rug-proof.",
  },
  {
    label: "Contract Renounced",
    value: "Renounced",
    description: "Ownership renounced forever. Unchangeable and completely community-owned.",
  },
];

export const HOW_TO_BUY_STEPS: BuyStep[] = [
  {
    stepNumber: 1,
    title: "Create Robinhood Wallet",
    description: "Download the Robinhood Wallet app from the App Store or Google Play Store. Set it up securely and back up your secret recovery phrase.",
  },
  {
    stepNumber: 2,
    title: "Load with Crypto",
    description: "Deposit or purchase Ethereum (ETH) or Arbitrum ETH directly inside your Robinhood Wallet, or transfer funds from another wallet.",
  },
  {
    stepNumber: 3,
    title: "Connect to Uniswap",
    description: "Open the in-app browser inside your Robinhood Wallet or visit Uniswap. Connect your wallet via WalletConnect or browser extension.",
  },
  {
    stepNumber: 4,
    title: "Swap ETH for $PEPPY",
    description: "Paste our official contract address into Uniswap, set your slippage tolerance to 0.1% (since there's no tax!), and confirm the transaction.",
  },
];
