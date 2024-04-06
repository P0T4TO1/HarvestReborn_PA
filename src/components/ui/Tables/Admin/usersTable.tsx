"use client";

import {
  Chip,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Tooltip,
  Pagination,
  Input,
  Button,
  Link,
} from "@nextui-org/react";
import React, { ChangeEvent, useState } from "react";
import { IUser } from "@/interfaces";
import { hrApi } from "@/api";
import { toast } from "sonner";
import { DANGER_TOAST, SUCCESS_TOAST } from "@/components";
import { FaCheck, FaEdit, FaRegTrashAlt, FaSearch } from "react-icons/fa";
import { MdOutlinePersonOff } from "react-icons/md";

interface Props {
  users: IUser[];
}

export const TableUsers = ({ users }: Props) => {
  const [search, setSearch] = useState("");
  const [page, setPage] = React.useState(1);
  const rowsPerPage = 10;

  const pages = Math.ceil(users.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return users.slice(start, end);
  }, [page, users]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const results = !search
    ? items
    : items.filter((dato) =>
        dato.nombre?.toLowerCase().includes(search.toLocaleLowerCase())
      );

  const handleDelete = async (id: string) => {
    try {
      await hrApi.delete(`/admin/users/${id}`).then(() => {
        toast("Usuario eliminado correctamente", SUCCESS_TOAST);
        window.location.reload();
      });
    } catch (error) {
      console.log(error);
      toast("Error al eliminar el usuario", DANGER_TOAST);
    }
  };

  const handleChangeStatus = async (id: string, status: string) => {
    try {
      await hrApi.patch(`/admin/users/status/${id}`, { status }).then(() => {
        toast(
          "Se ha cambiado el estado del usuario exitosamente",
          SUCCESS_TOAST
        );
        window.location.reload();
      });
    } catch (error) {
      console.log(error);
      toast("Error al desactivar el usuario", DANGER_TOAST);
    }
  };

  return (
    <>
      <div className="flex flex-1 justify-center sm:justify-start">
        <div className="mt-4 p-2">
          <Input
            size="md"
            radius="lg"
            placeholder="Buscar usuarios..."
            type="text"
            startContent={<FaSearch size={24} />}
            defaultValue={search}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className=" w-full flex flex-col gap-4">
        <Table
          aria-label="Tabla de usuario"
          selectionMode="multiple"
          bottomContent={
            <div className="flex w-full justify-center">
              <Pagination
                isCompact
                showControls
                showShadow
                color="primary"
                page={page}
                total={pages}
                onChange={(page) => setPage(page)}
              />
            </div>
          }
        >
          <TableHeader>
            <TableColumn allowsSorting>Nombre</TableColumn>
            <TableColumn allowsSorting>Apellido</TableColumn>
            <TableColumn allowsSorting>Correo</TableColumn>
            <TableColumn allowsSorting>Rol</TableColumn>
            <TableColumn allowsSorting>Estado</TableColumn>
            <TableColumn>Correo verificado</TableColumn>
            <TableColumn>Acciones</TableColumn>
          </TableHeader>
          <TableBody items={items}>
            {results.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="py-4">
                  {user.id_rol === 2 ? (
                    user.duenonegocio?.nombre_dueneg
                  ) : user.id_rol === 3 ? (
                    user.cliente?.nombre_cliente
                  ) : (
                    <>
                      {user.cliente?.nombre_cliente}
                      {user.duenonegocio?.nombre_dueneg}
                    </>
                  )}
                </TableCell>
                <TableCell className="py-4">
                  {user.id_rol === 2 ? (
                    user.duenonegocio?.apellidos_dueneg
                  ) : user.id_rol === 3 ? (
                    user.cliente?.apellidos_cliente
                  ) : (
                    <>
                      {user.cliente?.apellidos_cliente}
                      {user.duenonegocio?.apellidos_dueneg}
                    </>
                  )}
                </TableCell>
                <TableCell className="py-4">{user.email}</TableCell>
                <TableCell className="py-4">
                  {user.id_rol === 1
                    ? "Admin"
                    : user.id_rol === 2
                      ? "Dueño de negocio"
                      : "Cliente"}
                </TableCell>
                <TableCell className="py-4">
                  <Chip
                    size="sm"
                    variant="flat"
                    color={user.estado === "ACTIVO" ? "success" : "danger"}
                  >
                    {user.estado.charAt(0) + user.estado.slice(1).toLowerCase()}
                  </Chip>
                </TableCell>
                <TableCell className="py-4">
                  <Chip
                    size="sm"
                    variant="flat"
                    color={user.emailVerified ? "success" : "danger"}
                  >
                    {user.emailVerified ? "Verificado" : "No verificado"}
                  </Chip>
                </TableCell>
                <TableCell className="py-4">
                  <div className="flex items-center gap-4">
                    <div>
                      <Tooltip content="Editar">
                        <Link href={`/admin/dashboard/users/${user.id}`}>
                          <Button isIconOnly variant="light">
                            <FaEdit size={20} />
                          </Button>
                        </Link>
                      </Tooltip>
                    </div>
                    <div>
                      <Tooltip
                        content={
                          user.estado === "ACTIVO" ? "Desactivar" : "Activar"
                        }
                        color="warning"
                      >
                        <Button
                          isIconOnly
                          variant="light"
                          onPress={() =>
                            handleChangeStatus(user.id, user.estado)
                          }
                        >
                          {user.estado === "ACTIVO" ? (
                            <MdOutlinePersonOff size={20} />
                          ) : (
                            <FaCheck size={20} />
                          )}
                        </Button>
                      </Tooltip>
                    </div>
                    <div>
                      <Tooltip content="Eliminar" color="danger">
                        <Button
                          isIconOnly
                          variant="light"
                          onPress={() => handleDelete(user.id)}
                        >
                          <FaRegTrashAlt className="text-red-800 cursor-pointer" size={20} />
                        </Button>
                      </Tooltip>
                    </div>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
};
