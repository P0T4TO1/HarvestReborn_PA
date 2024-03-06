"use client";

import { FC, useState } from "react";
import { Product } from "@/interfaces";

interface Props {
  product: Product;
}

export const ProductCard: FC<Props> = ({ product }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <section className="flex relative justify-center overflow-hidden min-h-screen py-20">
        <div className="container mx-auto px-4 sm:px-8 md:px-16 lg:px-32 flex flex-col relative py-8 sm:py-16 h-full w-full">
          <div>
            <div className="mt-12">
              <div className="flex flex-wrap items-center gap-8">
                <div className="product">
                  <div className="left-side bg-[#87b663]">
                    <img
                      src="https://raw.githubusercontent.com/r-e-d-ant/bmc-bakery-static-version/997d7db57078eb3621cff9aa546cc0c2e515d922/assets/images/flour.svg"
                      alt=""
                      className="image"
                    />
                    <h2 className="name">{product.product_name}</h2>
                  </div>

                  <div
                    className={`setting-modal-container ${
                      open ? "show-setting-modal" : " "
                    }`}
                  >
                    <button className="edit-btn setting-modal-btn">
                      Editar producto
                    </button>
                    <button className="delete-btn setting-modal-btn">
                      Borrar producto
                    </button>
                  </div>

                  <div className="right-side">
                    <div className="setting-icon-container">
                      <button onClick={() => setOpen(!open)}>
                        <span className="material-symbols-outlined setting-icon">
                          settings
                        </span>
                      </button>
                    </div>

                    {product.product_amount && (
                      <h3 className="weight">
                        <p className="reste">Quedan</p>
                        <p className="amount">
                          {product.product_amount}
                          <i>Kg</i>
                        </p>
                      </h3>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
