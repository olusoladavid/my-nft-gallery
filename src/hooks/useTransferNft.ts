import type { BigNumber } from "ethers";
import { usePrepareContractWrite, useContractWrite, useWaitForTransaction, erc721ABI, Address } from "wagmi";

interface TransferNFTOptions {
  contractAddress: Address;
  tokenId: BigNumber;
  toAddress: Address;
  fromAddress: Address;
}

// create a hook to transfer an NFT based on the options
const useTransferNFT = ({ contractAddress, tokenId, toAddress, fromAddress }: TransferNFTOptions) => {
  // prepare the contract write
  const { config } = usePrepareContractWrite({
    address: contractAddress,
    abi: erc721ABI,
    functionName: "transferFrom",
    args: [fromAddress, toAddress, tokenId],
  });

  // execute the contract write
  const { write: transferNFT, data } = useContractWrite(config);

  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  });

  if (!contractAddress || !tokenId || !toAddress || !fromAddress) {
    return {};
  }

  return { transferNFT, isLoading, isSuccess };
};

export default useTransferNFT;
