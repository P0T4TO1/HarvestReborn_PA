"use client";

import { FC, useState, useEffect, useRef, useContext } from "react";
import { AuthContext } from "@/context/auth";
import { useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { SUCCESS_TOAST, showToast } from "@/components/toast";

export const Dropdown: FC = () => {
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const { user } = useContext(AuthContext);

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
      setOpen(!open);
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
          className="text-white hover:text-gray-300 text-sm px-4 py-2.5 text-left inline-flex items-center"
          type="button"
          data-dropdown-toggle="dropdown"
        >
          <span className="material-symbols-outlined">account_circle</span>
        </button>

        <div
          className={`bg-white text-base z-50 list-none divide-y divide-gray-100 rounded shadow my-4 min-w-40 max-w-40 overflow-hidden ${
            open ? "" : "hidden"
          }`}
          style={{
            position: "absolute",
            top: "calc(100% - 15px)",
            left: -110,
          }}
          ref={dropdownRef}
        >
          <div className="py-1 w-full" aria-labelledby="dropdown">
            {session ? (
              <>
                <div>
                  <button
                    onClick={() => {
                      router.push(`/user/profile?id=${user?.id}`);
                      handleItemClick();
                    }}
                    className="text-sm hover:bg-gray-100 text-gray-700 flex items-center px-4 py-2 w-full h-full"
                  >
                    <span className="material-symbols-outlined">person</span>
                    Perfil
                  </button>
                </div>
                <div>
                  {user?.id_rol === 2 ? (
                    <>
                      <button
                        onClick={() => {
                          router.push("/inventory");
                          handleItemClick();
                        }}
                        className="text-sm hover:bg-gray-100 text-gray-700 flex items-center px-4 py-2 w-full h-full"
                      >
                        <span className="material-symbols-outlined">
                          inventory
                        </span>
                        Mi inventario
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => {
                          router.push("/orders");
                          handleItemClick();
                        }}
                        className="text-sm hover:bg-gray-100 text-gray-700 flex items-center px-4 py-2 w-full h-full"
                      >
                        <span className="material-symbols-outlined">
                          inventory
                        </span>
                        Mis pedidos
                      </button>
                    </>
                  )}
                </div>

                {user?.id_rol === 1 ? (
                  <div>
                    <button
                      onClick={() => {
                        router.push("/dashboard");
                        handleItemClick();
                      }}
                      className="text-sm hover:bg-gray-100 text-gray-700 flex items-center px-4 py-2 w-full h-full"
                    >
                      <span className="material-symbols-outlined">
                        dashboard
                      </span>
                      Dashboard
                    </button>
                  </div>
                ) : null}
                <hr />
                <div>
                  <button
                    onClick={() =>
                      signOut().then(async () => {
                        showToast("Logout Successful", SUCCESS_TOAST);
                      })
                    }
                    className="text-sm hover:bg-gray-100 text-gray-700 flex items-center px-4 py-2 w-full h-full"
                  >
                    <span className="material-symbols-outlined">logout</span>
                    Cerrar sesión
                  </button>
                </div>
              </>
            ) : (
              <>
                <div>
                  <button
                    onClick={() => {
                      router.push("/auth/login");
                      handleItemClick(); // Llamamos a la función handleItemClick
                    }}
                    className="text-sm hover:bg-gray-100 text-gray-700 flex items-center px-4 py-2 w-full h-full"
                  >
                    <span className="material-symbols-outlined">login</span>
                    Iniciar sesión
                  </button>
                </div>
                <div>
                  <button
                    onClick={() => {
                      router.push("/auth/register");

                      handleItemClick();
                    }}
                    className="text-sm hover:bg-gray-100 text-gray-700 flex items-center px-4 py-2 w-full h-full"
                  >
                    <span className="material-symbols-outlined">
                      app_registration
                    </span>
                    Registrarse
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
