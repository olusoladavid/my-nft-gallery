import { useState, useEffect } from "react";
import { ethers } from "ethers";

function useConnectedAccount() {
  const [account, setAccount] = useState<string | null>(null);

  useEffect(() => {
    async function getAccount() {
      // Get the provider instance
      const provider = new ethers.providers.Web3Provider(
        (window as any).ethereum
      );

      // Get the signer instance
      const signer = provider.getSigner();

      // Get the connected account
      const connectedAccount = await signer.getAddress();

      setAccount(connectedAccount);
    }

    getAccount();
  }, []);

  return account;
}

export default useConnectedAccount;
