import { ITokenOwnership } from './../interfaces.d';
import { useState, useEffect } from "react";
import { ethers } from 'ethers';

const useWalletTokens = (walletAddress?: string) => {
  const [tokens, setTokens] = useState<ITokenOwnership[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const response = await fetch(
          `https://api.reservoir.tools/users/${walletAddress}/tokens/v5?normalizeRoyalties=false&sortBy=acquiredAt&sortDirection=desc&offset=0&limit=20&includeTopBid=false`,
          {
            headers: {
              accept: "*/*",
              "x-api-key": "demo-api-key",
            },
          }
        );
        const data = await response.json();
        setTokens(data.tokens);

        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    if (!walletAddress) {
      return;
    }

    if (ethers.utils.isAddress(walletAddress)) {
      fetchData();
    }
  }, [walletAddress]);

  return { tokens, loading };
};

export default useWalletTokens;
