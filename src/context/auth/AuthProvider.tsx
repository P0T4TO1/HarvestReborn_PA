"use client";

import React, { useReducer, useEffect, ReactNode } from "react";
import { useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";

import Cookies from "js-cookie";
import axios from "axios";

import { AuthContext, authReducer } from "./";

import { IUser } from "@/interfaces";
import { hrApi } from "@/api";

export interface AuthState {
  isLoggedIn: boolean;
  user?: IUser;
  userData: { email: string; password: string };
  personalData: {
    nombre: string;
    apellidos: string;
    fecha_nacimiento: string;
    tipo: string;
  };
  contactData: {
    nombreNegocio: string;
    telefono: string;
    calle: string;
    colonia: string;
    cp: string;
  };
  indexActive: number;
}

const AUTH_INITIAL_STATE: AuthState = {
  isLoggedIn: false,
  user: undefined,
  userData: { email: "", password: "" },
  personalData: {
    nombre: "",
    apellidos: "",
    fecha_nacimiento: "",
    tipo: "",
  },
  contactData: {
    nombreNegocio: "",
    telefono: "",
    calle: "",
    colonia: "",
    cp: "",
  },
  indexActive: 1,
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(authReducer, AUTH_INITIAL_STATE);
  const { data, status } = useSession();

  useEffect(() => {
    if (status === "authenticated") {
      dispatch({ type: "[Auth] - Login", payload: data?.user as IUser });
    }
  }, [status, data]);

  const checkToken = async () => {
    if (!Cookies.get("token")) {
      return;
    }

    try {
      const { data } = await hrApi.get("/user/validate-token");
      const { token, user } = data;
      Cookies.set("token", token);
      dispatch({ type: "[Auth] - Login", payload: user });
    } catch (error) {
      Cookies.remove("token");
    }
  };

  const loginUser = async (
    email: string,
    password: string
  ): Promise<boolean> => {
    try {
      const { data } = await hrApi.post("/user/login", { email, password });
      const { token, user } = data;
      Cookies.set("token", token);
      dispatch({ type: "[Auth] - Login", payload: user });
      return true;
    } catch (error) {
      return false;
    }
  };

  const registerContext = async (
    email: string,
    password: string,
    tipo: string,
    nombre: string,
    apellidos: string,
    fecha_nacimiento: string,
    nombreNegocio: string,
    telefono: string,
    calle: string,
    colonia: string,
    cp: string
  ): Promise<{ hasError: boolean; message?: string }> => {
    try {
      const { data } = await hrApi.post("/user/register", {
        email,
        password,
        tipo,
        nombre,
        apellidos,
        fecha_nacimiento,
        nombreNegocio,
        telefono,
        calle,
        colonia,
        cp,
      });
      const { token, user } = data;
      Cookies.set("token", token);
      dispatch({ type: "[Auth] - Login", payload: user });
      return {
        hasError: false,
      };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return {
          hasError: true,
          message: error.response?.data.message,
        };
      }
      return {
        hasError: true,
        message: "No se pudo crear el usuario - intente de nuevo",
      };
    }
  };

  const logout = () => {
    Cookies.remove("cart");
    Cookies.remove("firstName");
    Cookies.remove("lastName");
    Cookies.remove("address");
    Cookies.remove("address2");
    Cookies.remove("zip");
    Cookies.remove("city");
    Cookies.remove("country");
    Cookies.remove("phone");

    signOut().then();
    // router.reload();
    // Cookies.remove('token');
  };

  const setUserData = (userData: { email: string; password: string }) => {
    dispatch({ type: "[Auth] - SetUserData", payload: userData });
  };

  const setPersonalData = (data: any) => {
    dispatch({ type: "[Auth] - SetPersonalData", payload: data });
  };

  const setContactData = (data: any) => {
    dispatch({ type: "[Auth] - SetContactData", payload: data });
  };

  const setIndexActive = (index: number): void => {
    dispatch({ type: '[Auth] - SetIndexActive', payload: index });
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,

        // Methods
        loginUser,
        registerContext,
        logout,
        userData: state.userData,
        personalData: state.personalData,
        contactData: state.contactData,
        indexActive : state.indexActive,
        setUserData,
        setPersonalData,
        setContactData,
        setIndexActive,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
