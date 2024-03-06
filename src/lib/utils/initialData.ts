interface IProduct {
  product_name: string;
  product_image: string;
  product_isSeason: boolean;
  amount: {
    create: {
      amount: number;
    };
  };
  arrive: {
    create: {
      arrive: Date;
    };
  };
  expiration: {
    create: {
      expiration: Date;
    };
  };
}

interface seedData {
  products: IProduct[];
}

export const initialData: seedData = {
  products: [
    {
      product_name: "Jitomate",
      product_image: "/images/products/jitomate.png",
      product_isSeason: true,
      amount: {
        create: {
          amount: 10,
        },
      },
      arrive: {
        create: {
          arrive: new Date(),
        },
      },
      expiration: {
        create: {
          expiration: new Date(),
        },
      },
    },
    {
      product_name: "Pepino",
      product_image: "/images/products/pepino.png",
      product_isSeason: true,
      amount: {
        create: {
          amount: 10,
        },
      },
      arrive: {
        create: {
          arrive: new Date(),
        },
      },
      expiration: {
        create: {
          expiration: new Date(),
        },
      },
    },
    {
      product_name: "Cebolla",
      product_image: "/images/products/cebolla.png",
      product_isSeason: true,
      amount: {
        create: {
          amount: 10,
        },
      },
      arrive: {
        create: {
          arrive: new Date(),
        },
      },
      expiration: {
        create: {
          expiration: new Date(),
        },
      },
    },
    {
      product_name: "Cebolla morada",
      product_image: "/images/products/cebolla_morada.png",
      product_isSeason: true,
      amount: {
        create: {
          amount: 10,
        },
      },
      arrive: {
        create: {
          arrive: new Date(),
        },
      },
      expiration: {
        create: {
          expiration: new Date(),
        },
      },
    },
    {
      product_name: "Zanahoria",
      product_image: "/images/products/zanahoria.png",
      product_isSeason: true,
      amount: {
        create: {
          amount: 10,
        },
      },
      arrive: {
        create: {
          arrive: new Date(),
        },
      },
      expiration: {
        create: {
          expiration: new Date(),
        },
      },
    },
    {
      product_name: "Papa",
      product_image: "/images/products/papa.png",
      product_isSeason: true,
      amount: {
        create: {
          amount: 10,
        },
      },
      arrive: {
        create: {
          arrive: new Date(),
        },
      },
      expiration: {
        create: {
          expiration: new Date(),
        },
      },
    },
    {
      product_name: "Lechuga romana",
      product_image: "/images/products/lechuga_romana.png",
      product_isSeason: true,
      amount: {
        create: {
          amount: 10,
        },
      },
      arrive: {
        create: {
          arrive: new Date(),
        },
      },
      expiration: {
        create: {
          expiration: new Date(),
        },
      },
    },
    {
      product_name: "Lechuga orejona",
      product_image: "/images/products/lechuga_orejona.png",
      product_isSeason: true,
      amount: {
        create: {
          amount: 10,
        },
      },
      arrive: {
        create: {
          arrive: new Date(),
        },
      },
      expiration: {
        create: {
          expiration: new Date(),
        },
      },
    },
    {
      product_name: "Espinaca",
      product_image: "/images/products/espinaca.png",
      product_isSeason: true,
      amount: {
        create: {
          amount: 10,
        },
      },
      arrive: {
        create: {
          arrive: new Date(),
        },
      },
      expiration: {
        create: {
          expiration: new Date(),
        },
      },
    },
    {
      product_name: "Calabaza",
      product_image: "/images/products/calabaza.png",
      product_isSeason: true,
      amount: {
        create: {
          amount: 10,
        },
      },
      arrive: {
        create: {
          arrive: new Date(),
        },
      },
      expiration: {
        create: {
          expiration: new Date(),
        },
      },
    },
    {
      product_name: "Elote",
      product_image: "/images/products/elote.png",
      product_isSeason: true,
      amount: {
        create: {
          amount: 10,
        },
      },
      arrive: {
        create: {
          arrive: new Date(),
        },
      },
      expiration: {
        create: {
          expiration: new Date(),
        },
      },
    },
    {
      product_name: "Chile serrano",
      product_image: "/images/products/chile_serrano.png",
      product_isSeason: true,
      amount: {
        create: {
          amount: 10,
        },
      },
      arrive: {
        create: {
          arrive: new Date(),
        },
      },
      expiration: {
        create: {
          expiration: new Date(),
        },
      },
    },
  ],
};
