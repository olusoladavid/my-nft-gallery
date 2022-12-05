import { useState, useEffect } from "react";

const useWalletTokens = (walletAddress: string) => {
  const [tokens, setTokens] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
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
      } catch (error) {
        console.error(error);
      }
    };

    if (walletAddress) {
      fetchData();
    }
  }, [walletAddress]);

  return tokens;
};

export default useWalletTokens;
