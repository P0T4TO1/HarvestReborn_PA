"use client";

import { createContext } from "react";
import { IUser } from "@/interfaces";

interface ContextProps {
  isLoggedIn: boolean;
  user?: IUser;

  loginUser: (email: string, password: string) => Promise<boolean>;

  registerContext: (
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
  ) => Promise<{ hasError: boolean; message?: string }>;

  logout: () => void;

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

  setUserData: (userData: { email: string; password: string }) => void;
  setPersonalData: (data: {
    nombre: string;
    apellidos: string;
    fecha_nacimiento: string;
    tipo: string;
  }) => void;
  setContactData: (data: {
    nombreNegocio: string;
    telefono: string;
    calle: string;
    colonia: string;
    cp: string;
  }) => void;
  setIndexActive: (index: number) => void;
}

export const AuthContext = createContext({} as ContextProps);
