export interface Product {
  product_id: number;
  product_name: string;
  product_amount?: number;
  product_price?: number;
  product_description?: string;
  product_image?: string;
  product_arrive?: Date;
  product_expiration?: Date;
  product_isSeason: boolean;

  inventory_id?: number;
  donation_request_id?: number;
  donation_id?: number;
}
