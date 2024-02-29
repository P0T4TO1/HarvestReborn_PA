export interface Product {
  id: number;
  name: string;
  amount?: number;
  price?: number;
  arrivalDate?: Date;
  expirationDate?: Date;
  inSeason: boolean;

  inventory_id?: number;
  donation_request_id?: number;
  donation_id?: number;
}
