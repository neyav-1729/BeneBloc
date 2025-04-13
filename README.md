# 🌟 Benebloc – Decentralized Giving for a Better Tomorrow

**Benebloc** is a Web3-powered crowdfunding platform that lets users create and fund social campaigns using cryptocurrency. Built with **Next.js** and **Thirdweb**, it brings transparency, trust, and decentralization to social impact.

---

## 🚀 Features

- **Create Campaigns**: Easily launch verified fundraising campaigns with clear goals and descriptions.
- **Wallet Integration**: Seamlessly connect wallets like MetaMask and WalletConnect to donate or create campaigns.
- **Transparent Donations**: All contributions are recorded on-chain for complete transparency.
- **Real-Time Tracking**: Monitor funding progress, supporter count, and campaign deadlines.
- **Tiered Rewards** *(Optional)*: Offer NFTs or acknowledgment badges to donors.
- **Decentralized**: Remove intermediaries, ensuring that funds go directly to the cause.

---

## 🛠️ Tech Stack

- **Frontend**: Next.js, TailwindCSS  
- **Blockchain**: Thirdweb, Ethers.js  
- **Wallet Integration**: MetaMask, WalletConnect  
- **Storage**: IPFS (for storing campaign images and metadata)

---

## 🧑‍💻 Getting Started

To get this project running locally:

1. Clone the repository:

    ```bash
    git clone https://github.com/yourusername/benebloc.git
    cd benebloc
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Run the app locally:

    ```bash
    npm run dev
    ```

4. Open the application in your browser at `http://localhost:3000`.

---
## 📡 Smart Contract Deployment

The smart contract for **Benebloc** was first deployed on **Thirdweb**. The deployment was done using the **Thirdweb secret key**, and a new project was created. A **web3.js** file was then generated for Web3 integration with **Next.js**. This file enables the frontend to interact with the deployed smart contract using the provided secret key.

To integrate Web3 with your frontend, the secret key is used for secure interaction with the blockchain, allowing users to create and fund campaigns directly through their crypto wallets.


## 📄 Environment Variables

Create a `.env.local` file in the root of the project and add the following:


