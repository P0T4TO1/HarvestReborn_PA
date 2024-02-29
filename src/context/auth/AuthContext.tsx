"use client";

import { createContext } from "react";
import { IUser } from "@/interfaces";

interface ContextProps {
  isLoggedIn: boolean;
  user?: IUser;

  loginUser: (email: string, password: string) => Promise<boolean>;
  registerUserBusiness: (
    owner_name: string,
    owner_surnames: string,
    business_name: string,
    business_tel: string,
    business_email: string,
    business_pass: string
  ) => Promise<{ hasError: boolean; message?: string }>;
  registerUserOrganization: (
    org_name: string,
    org_acro: string,
    org_cluni: string,
    org_rfc: string,
    org_tel: string,
    org_email: string,
    org_pass: string
  ) => Promise<{ hasError: boolean; message?: string }>;
  logout: () => void;
}

export const AuthContext = createContext({} as ContextProps);
