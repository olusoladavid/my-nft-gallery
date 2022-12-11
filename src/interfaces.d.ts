export interface IToken {
  contract: string;
  tokenId: string;
  name: string;
  image: string;
  collection: {
    id: string;
    name: string;
    imageUrl: string;
    floorAskPrice: number;
  };
}

export interface ITokenOwnership {
  token: IToken;
  ownership: {
    tokenCount: string;
    onSaleCount: string;
    floorAsk: {
      id: string | null;
      price: string | null;
      maker: string | null;
      validFrom: string | null;
      validUntil: string | null;
      source: {};
    };
    acquiredAt: string;
  };
}
