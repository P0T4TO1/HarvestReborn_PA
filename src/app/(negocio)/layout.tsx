import {
  SidebarWrapperNegocio,
  NavbarWrapperNegocio,
  Footer,
} from "@/components";
import { ReactNode } from "react";

export default function AdminLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <>
      <div className="flex">
        <SidebarWrapperNegocio />
        <NavbarWrapperNegocio>
          {children}
          <Footer />
        </NavbarWrapperNegocio>
      </div>
    </>
  );
}
