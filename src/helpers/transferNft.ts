import { ethers } from "ethers";
import erc721ABI from "../abi/ERC721.json";

interface TransferNFTOptions {
  provider: ethers.providers.Provider;
  contractAddress: string;
  tokenId: string;
  toAddress: string;
  signer: ethers.Signer;
}

async function transferNFT(
  options: TransferNFTOptions
): Promise<void> {
  const { contractAddress, tokenId, toAddress, signer } = options;

  // Get the contract instance
  const contract = new ethers.Contract(contractAddress, erc721ABI, signer);

  await contract.transfer(toAddress, tokenId, { gasLimit: 200000 });
}

export default transferNFT;
