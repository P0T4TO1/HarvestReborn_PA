import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { redirect } from "next/navigation";
import {
  OrdersCliente,
  OrdersNegocio,
  SidebarWrapperNegocio,
  NavbarWrapperNegocio,
  NavbarComponent,
  Footer,
} from "@/components";

const OrdersPage = async () => {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/auth/login");
  if (session?.user.id_rol === 4) redirect("/auth/register?oauth=true");
  if (session?.user.id_rol === 1) redirect("/admin/dashboard");

  return (
    <>
      {session?.user.id_rol === 2 ? (
        <>
          <section className="flex">
            <SidebarWrapperNegocio />
            <NavbarWrapperNegocio>
              <OrdersNegocio />
              <Footer />
            </NavbarWrapperNegocio>
          </section>
        </>
      ) : (
        <>
          <NavbarComponent />
          <OrdersCliente />
          <Footer />
        </>
      )}
    </>
  );
};

export default OrdersPage;
