"use client";

import { FC, useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

export const Dropdown: FC = () => {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setOpen(false);
    }
  };

  const handleItemClick = () => {
    if (window.innerWidth <= 640) {
      setOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <div className="max-w-lg mx-auto relative" ref={dropdownRef}>
        <button
          onClick={() => setOpen(!open)}
          className="text-white hover:text-gray-300 text-sm px-4 py-2.5 text-center inline-flex items-center"
          type="button"
          data-dropdown-toggle="dropdown"
        >
          <span className="material-symbols-outlined">account_circle</span>
        </button>

        <div
          className={`bg-white text-base z-50 list-none divide-y divide-gray-100 rounded shadow my-4 ${
            open ? "" : "hidden"
          }`}
          style={{ position: "absolute", top: "calc(100% - 15px)", left: -60 }}
          ref={dropdownRef}
        >
          <ul className="py-1" aria-labelledby="dropdown">
            <li>
              <button
                onClick={() => {
                  router.push("/auth/login");
                  handleItemClick(); // Llamamos a la función handleItemClick
                }}
                className="text-sm hover:bg-gray-100 text-gray-700 block px-4 py-2"
              >
                Iniciar sesión
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  router.push("/auth/register");

                  handleItemClick();
                }}
                className="text-sm hover:bg-gray-100 text-gray-700 block px-4 py-2"
              >
                Registrarse
              </button>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};
