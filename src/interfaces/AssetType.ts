export type AssetType = {
  userData: any;
  _id: string;
  name: string;
  address: { lat: number; lng: number };
  realAddress: string;
  numberOfUnits: number;
  price: number;
  images: Array<string>;
  yearPurchased: number;
  constructionYear: number;
  class: string;
  status: string;
  assetType: string;
  squareFeet: string;
  isSaved: boolean;
};
