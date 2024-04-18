"use client";

import React, { useState, useMemo, useCallback, ChangeEvent, Key, useEffect } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Button,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Chip,
  Pagination,
  Selection,
  ChipProps,
  SortDescriptor,
  Tooltip,
  useDisclosure,
} from "@nextui-org/react";
import { IMergedOrder, IOrden, IProductoOrden } from "@/interfaces";
import {
  columnsOrders,
  statusOptionsOrders,
  statusColorMapOrders as statusColorMap,
  INITIAL_VISIBLE_COLUMNS,
} from "@/utils/data-table";
import { OrderModal } from "@/components";
import { capitalize } from "@/utils/capitalize";
import { FaChevronDown, FaSearch, FaEye } from "react-icons/fa";

type Props = {
  orders: IMergedOrder[];
};

export const OrdersTable = ({ orders }: Props) => {
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

  const [orderModal, setOrderModal] = useState<IOrden | undefined>();
  const [productsModal, setProductsModal] = useState<IProductoOrden[]>([]);
  const [loading, setLoading] = useState(false);

  const [page, setPage] = useState(1);

  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = useMemo(() => {
    if (visibleColumns === "all") return columnsOrders;

    return columnsOrders.filter((column) =>
      Array.from(visibleColumns).includes(column.uid)
    );
  }, [visibleColumns]);

  const filteredItems = useMemo(() => {
    let filteredOrders = [...orders];

    if (hasSearchFilter) {
      filteredOrders = filteredOrders.filter((mergeOrder) =>
        mergeOrder.orden.cliente?.nombre_cliente
          .toLowerCase()
          .includes(filterValue.toLowerCase())
      );
    }
    if (
      statusFilter !== "all" &&
      Array.from(statusFilter).length !== statusOptionsOrders.length
    ) {
      filteredOrders = filteredOrders.filter((mergeOrder) =>
        Array.from(statusFilter).includes(mergeOrder.orden.estado_orden)
      );
    }

    return filteredOrders;
  }, [orders, filterValue, statusFilter, hasSearchFilter]);

  const pages = Math.ceil(filteredItems.length / rowsPerPage);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const sortedItems = useMemo(() => {
    const { column, direction } = sortDescriptor;

    return items.sort((a, b) => {
      if (
        (a.orden[column as keyof IOrden] ?? "") <
        (b.orden[column as keyof IOrden] ?? "")
      ) {
        return direction === "ascending" ? -1 : 1;
      }
      if (
        (a.orden[column as keyof IOrden] ?? "") >
        (b.orden[column as keyof IOrden] ?? "")
      ) {
        return direction === "ascending" ? 1 : -1;
      }
      return 0;
    });
  }, [sortDescriptor, items]);

  const { onOpen, onClose, isOpen } = useDisclosure();

  const setOrder = (order: IOrden) => {
    console.log(order);
  };

  const renderCell = useCallback((order: IMergedOrder, columnKey: Key) => {
    const cellValue = order[columnKey as keyof IMergedOrder];

    switch (columnKey) {
      case "id_orden":
        return <>{order.orden.id_orden}</>;
      case "cliente.nombre_cliente":
        return <>{order.orden.cliente?.nombre_cliente}</>;
      case "fecha_orden":
        return (
          <div>
            {new Date(order.orden.fecha_orden).toLocaleDateString("es-ES", {
              year: "numeric",
              month: "long",
              day: "numeric",
              hour: "numeric",
              minute: "numeric",
            })}
          </div>
        );
      case "monto_total":
        return (
          <div>
            ${order.productos.reduce((acc, curr) => acc + curr.monto, 0)} MXN
          </div>
        );
      case "estado_orden":
        return (
          <Chip
            color={
              statusColorMap[order.orden.estado_orden] as ChipProps["color"]
            }
            variant="flat"
            size="md"
            style={{ textTransform: "capitalize" }}
          >
            {capitalize(order.orden.estado_orden)}
          </Chip>
        );
      case "acciones":
        return (
          <div className="flex items-center gap-4">
            <Tooltip content="Ver detalles">
              <Button
                isIconOnly
                variant="light"
                onClick={() => {
                  setLoading(true);
                  setOrderModal(order.orden);
                  setProductsModal(order.productos);
                  onOpen();
                }}
              >
                <FaEye size={20} />
              </Button>
            </Tooltip>
          </div>
        );
      default:
        return cellValue;
    }
  }, [onOpen]);

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
            placeholder="Buscar por cliente..."
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
                {statusOptionsOrders.map((status) => (
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
                {columnsOrders.map((column) => (
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
            Total de pedidos: {orders.length}
          </span>
        </div>
      </div>
    );
  }, [
    filterValue,
    statusFilter,
    visibleColumns,
    onSearchChange,
    orders.length,
    onClear,
  ]);

  const bottomContent = useMemo(() => {
    return (
      <div className="py-2 px-2 flex justify-between items-center">
        <span className="w-[30%] text-small text-default-400">
          {selectedKeys === "all"
            ? "Todos los pedidos seleccionados"
            : `${selectedKeys.size} de ${filteredItems.length} pedidos seleccionados`}
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
  }, [selectedKeys, page, pages, filteredItems.length, onNextPage, onPreviousPage]);

  useEffect(() => {
    if (orderModal) {
      setLoading(false);
    }
  }, [orderModal]);

  return (
    <div className=" w-full flex flex-col gap-4 mt-6">
      <OrderModal
        loading={loading}
        order={orderModal as IOrden}
        products={productsModal}
        useDisclosure={{ isOpen, onClose }}
      />
      <Table
        aria-label="Example table with custom cells, pagination and sorting"
        isHeaderSticky
        bottomContent={bottomContent}
        bottomContentPlacement="outside"
        selectedKeys={selectedKeys}
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
          emptyContent={"No hay pedidos encontrados"}
          items={sortedItems}
        >
          {(item) => (
            <TableRow key={item.id_orden}>
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey) as any}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};
