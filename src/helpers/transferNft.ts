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

  const contract = new ethers.Contract(contractAddress, erc721ABI, signer);
  await contract.functions.transfer(toAddress, tokenId);
}

export default transferNFT;
