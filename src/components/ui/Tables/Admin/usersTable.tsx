"use client";

import { useState, useMemo, useCallback, Key, ChangeEvent } from "react";
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
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Selection,
  SortDescriptor,
  ChipProps,
} from "@nextui-org/react";
import { IUser } from "@/interfaces";
import { hrApi } from "@/api";
import {
  columnsUsuarios as columns,
  rolOptionsUsuarios,
  statusColorMapUsuarios as statusColorMap,
  statusOptionsUsuarios as statusOptions,
} from "@/utils/data-table";
import { toast } from "sonner";
import { DANGER_TOAST, SUCCESS_TOAST } from "@/components";
import {
  FaCheck,
  FaChevronDown,
  FaEdit,
  FaRegTrashAlt,
  FaSearch,
} from "react-icons/fa";
import { MdOutlinePersonOff } from "react-icons/md";
import { capitalize } from "@/utils/capitalize";

interface Props {
  users: IUser[];
}

const INITIAL_VISIBLE_COLUMNS = [
  "nombre",
  "apellido",
  "email",
  "rol",
  "estado",
  "correo_verificado",
  "acciones",
];

export const TableUsers = ({ users }: Props) => {
  const [filterValue, setFilterValue] = useState("");
  const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set([]));
  const [visibleColumns, setVisibleColumns] = useState<Selection>(
    new Set(INITIAL_VISIBLE_COLUMNS)
  );
  const [statusFilter, setStatusFilter] = useState<Selection>("all");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
    column: "fecha_orden",
    direction: "ascending",
  });

  const [page, setPage] = useState(1);

  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = useMemo(() => {
    if (visibleColumns === "all") return columns;

    return columns.filter((column) =>
      Array.from(visibleColumns).includes(column.uid)
    );
  }, [visibleColumns]);

  const filteredItems = useMemo(() => {
    let filteredOrders = [...users];

    if (hasSearchFilter) {
      filteredOrders = filteredOrders.filter(
        (user) =>
          user.duenonegocio?.nombre_dueneg
            .toLowerCase()
            .includes(filterValue.toLowerCase()) ||
          user.cliente?.nombre_cliente
            .toLowerCase()
            .includes(filterValue.toLowerCase())
      );
    }
    if (
      statusFilter !== "all" &&
      Array.from(statusFilter).length !== statusOptions.length
    ) {
      filteredOrders = filteredOrders.filter((user) =>
        Array.from(statusFilter).includes(user.estado)
      );
    }

    return filteredOrders;
  }, [users, filterValue, statusFilter]);

  const pages = Math.ceil(filteredItems.length / rowsPerPage);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const sortedItems = useMemo(() => {
    const { column, direction } = sortDescriptor;

    return items.sort((a, b) => {
      if ((a[column as keyof IUser] ?? "") < (b[column as keyof IUser] ?? "")) {
        return direction === "ascending" ? -1 : 1;
      }
      if ((a[column as keyof IUser] ?? "") > (b[column as keyof IUser] ?? "")) {
        return direction === "ascending" ? 1 : -1;
      }
      return 0;
    });
  }, [sortDescriptor, items]);

  const renderCell = useCallback((user: IUser, columnKey: Key) => {
    const cellValue = user[columnKey as keyof IUser];

    switch (columnKey) {
      case "id":
        return <>{user.id}</>;
      case "nombre":
        return (
          <>
            {user.duenonegocio?.nombre_dueneg || user.cliente?.nombre_cliente}
          </>
        );
      case "apellido":
        return (
          <>
            {user.duenonegocio?.apellidos_dueneg ||
              user.cliente?.apellidos_cliente}
          </>
        );
      case "correo":
        return <>{user.email}</>;
      case "rol":
        return (
          <>
            {user.id_rol === 1
              ? "Admin"
              : user.id_rol === 2
                ? "Dueño de negocio"
                : "Cliente"}
          </>
        );
      case "estado":
        return (
          <Chip
            size="sm"
            variant="flat"
            color={statusColorMap[user.estado] as ChipProps["color"]}
          >
            {user.estado.charAt(0) + user.estado.slice(1).toLowerCase()}
          </Chip>
        );
      case "correo_verificado":
        return (
          <Chip
            size="sm"
            variant="flat"
            color={user.emailVerified ? "success" : "danger"}
          >
            {user.emailVerified ? "Verificado" : "No verificado"}
          </Chip>
        );
      case "acciones":
        return (
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
                content={user.estado === "ACTIVO" ? "Desactivar" : "Activar"}
                color="warning"
              >
                <Button
                  isIconOnly
                  variant="light"
                  onPress={() => handleChangeStatus(user.id, user.estado)}
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
                  <FaRegTrashAlt
                    className="text-red-800 cursor-pointer"
                    size={20}
                  />
                </Button>
              </Tooltip>
            </div>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  const onNextPage = useCallback(() => {
    if (page < pages) {
      setPage(page + 1);
    }
  }, [page, pages]);

  const onPreviousPage = useCallback(() => {
    if (page > 1) {
      setPage(page - 1);
    }
  }, [page]);

  const onRowsPerPageChange = useCallback(
    (e: ChangeEvent<HTMLSelectElement>) => {
      setRowsPerPage(Number(e.target.value));
      setPage(1);
    },
    []
  );

  const onSearchChange = useCallback((value?: string) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue("");
    }
  }, []);

  const onClear = useCallback(() => {
    setFilterValue("");
    setPage(1);
  }, []);

  const topContent = useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex justify-between gap-3 items-end">
          <Input
            isClearable
            className="w-full sm:max-w-[44%]"
            placeholder="Buscar por nombre..."
            startContent={<FaSearch size={20} />}
            value={filterValue}
            onClear={() => onClear()}
            onValueChange={onSearchChange}
          />
          <div className="flex gap-3">
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button endContent={<FaChevronDown size={20} />} variant="flat">
                  Estado
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={statusFilter}
                selectionMode="multiple"
                onSelectionChange={setStatusFilter}
              >
                {statusOptions.map((status) => (
                  <DropdownItem key={status.uid} className="capitalize">
                    {capitalize(status.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button endContent={<FaChevronDown size={20} />} variant="flat">
                  Columnas
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={visibleColumns}
                selectionMode="multiple"
                onSelectionChange={setVisibleColumns}
              >
                {columns.map((column) => (
                  <DropdownItem key={column.uid} className="capitalize">
                    {capitalize(column.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-default-400 text-small">
            Total de clientes: {users.length}
          </span>
        </div>
      </div>
    );
  }, [
    filterValue,
    statusFilter,
    visibleColumns,
    onSearchChange,
    onRowsPerPageChange,
    users.length,
    hasSearchFilter,
  ]);

  const bottomContent = useMemo(() => {
    return (
      <div className="py-2 px-2 flex justify-between items-center">
        <span className="w-[30%] text-small text-default-400">
          {selectedKeys === "all"
            ? "Todos los clientes seleccionados"
            : `${selectedKeys.size} de ${filteredItems.length} clientes seleccionados`}
        </span>
        <Pagination
          isCompact
          showControls
          showShadow
          color="primary"
          page={page}
          total={pages}
          onChange={setPage}
        />
        <div className="hidden sm:flex w-[30%] justify-end gap-2">
          <Button
            isDisabled={pages === 1}
            size="sm"
            variant="flat"
            onPress={onPreviousPage}
          >
            Anterior
          </Button>
          <Button
            isDisabled={pages === 1}
            size="sm"
            variant="flat"
            onPress={onNextPage}
          >
            Siguiente
          </Button>
        </div>
      </div>
    );
  }, [selectedKeys, items.length, page, pages, hasSearchFilter]);

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
      <div className=" w-full flex flex-col gap-4">
        <Table
          aria-label="Example table with custom cells, pagination and sorting"
          isHeaderSticky
          bottomContent={bottomContent}
          bottomContentPlacement="outside"
          selectedKeys={selectedKeys}
          selectionMode="multiple"
          sortDescriptor={sortDescriptor}
          topContent={topContent}
          topContentPlacement="outside"
          onSelectionChange={setSelectedKeys}
          onSortChange={setSortDescriptor}
        >
          <TableHeader columns={headerColumns}>
            {(column) => (
              <TableColumn
                key={column.uid}
                align={column.uid === "actions" ? "center" : "start"}
                allowsSorting={column.sortable}
              >
                {column.name}
              </TableColumn>
            )}
          </TableHeader>
          <TableBody
            emptyContent={"No hay usuarios 😭"}
            items={sortedItems}
          >
            {(item) => (
              <TableRow key={item.id}>
                {(columnKey) => (
                  <TableCell>{renderCell(item, columnKey) as any}</TableCell>
                )}
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </>
  );
};
