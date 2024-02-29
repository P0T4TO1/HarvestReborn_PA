interface IProduct {
  product_name: string;
  product_amount?: number;
  price?: number;
  product_arrive: Date;
  product_expiration: Date;
  product_isSeason: boolean;
}

interface seedData {
  products: IProduct[];
}

export const initialData: seedData = {
  products: [
    {
      product_name: "Jitomate",
      product_amount: 10,
      product_arrive: new Date(),
      product_expiration: new Date(),
      product_isSeason: true,
    },
    {
      product_name: "Pepino",
      product_amount: 10,
      product_arrive: new Date(),
      product_expiration: new Date(),
      product_isSeason: true,
    },
    {
      product_name: "Cebolla",
      product_amount: 10,
      product_arrive: new Date(),
      product_expiration: new Date(),
      product_isSeason: true,
    },
    {
      product_name: "Zanahoria",
      product_amount: 10,
      product_arrive: new Date(),
      product_expiration: new Date(),
      product_isSeason: true,
    },
    {
      product_name: "Papa",
      product_amount: 10,
      product_arrive: new Date(),
      product_expiration: new Date(),
      product_isSeason: true,
    },
    {
      product_name: "Lechuga",
      product_amount: 10,
      product_arrive: new Date(),
      product_expiration: new Date(),
      product_isSeason: true,
    },
    {
      product_name: "Espinaca",
      product_amount: 10,
      product_arrive: new Date(),
      product_expiration: new Date(),
      product_isSeason: true,
    },
    {
      product_name: "Calabaza",
      product_amount: 10,
      product_arrive: new Date(),
      product_expiration: new Date(),
      product_isSeason: true,
    },
    {
      product_name: "Elote",
      product_amount: 10,
      product_arrive: new Date(),
      product_expiration: new Date(),
      product_isSeason: true,
    },
    {
      product_name: "Chile serrano",
      product_amount: 10,
      product_arrive: new Date(),
      product_expiration: new Date(),
      product_isSeason: true,
    },
  ],
};
