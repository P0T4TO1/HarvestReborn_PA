import { ILote } from "@/interfaces";
import * as React from "react";
import {
  TableRow,
  TableCell,
  IconButton,
  Collapse,
  Box,
  Typography,
  Table,
  TableHead,
  TableBody,
} from "@mui/material";
import { Image } from "@nextui-org/react";

interface RowProps {
  lote: ILote;
  allLotes: ILote[];
  children: React.ReactNode;
}

export const Row = ({ lote, allLotes, children }: RowProps) => {
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow key={lote.id_lote}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
            className="dark:text-gray-300"
          >
            {open ? (
              <span className="material-symbols-outlined">expand_less</span>
            ) : (
              <span className="material-symbols-outlined">expand_more</span>
            )}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          <Image
            src={lote.producto?.imagen_producto}
            alt="imagenproduct"
            style={{ width: "100px", height: "100px" }}
          />
        </TableCell>
        <TableCell align="right" className="dark:text-gray-300">
          {lote.producto?.nombre_producto}
        </TableCell>
        <TableCell align="right" className="dark:text-gray-300">
          {
            allLotes?.filter(
              (loteFilter) => loteFilter.id_producto === lote.id_producto
            ).length
          }
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography
                variant="h6"
                gutterBottom
                component="div"
                className="dark:text-gray-300"
              >
                Detalles
              </Typography>
              <Table size="small" aria-label="tableproducts">
                <TableHead>
                  <TableRow>
                    <TableCell className="dark:text-gray-300">
                      Fecha de entrada
                    </TableCell>
                    <TableCell className="dark:text-gray-300">
                      Cantidad en kg
                    </TableCell>
                    <TableCell align="right" className="dark:text-gray-300">
                      Fecha aproximada de vencimiento
                    </TableCell>
                    <TableCell align="right" className="dark:text-gray-300">
                      Acciones
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {allLotes?.map(
                    (loteMap) =>
                      loteMap?.id_producto === lote?.id_producto && (
                        <TableRow key={loteMap.id_lote}>
                          <TableCell
                            component="th"
                            scope="row"
                            className="dark:text-gray-300"
                          >
                            {loteMap?.fecha_entrada
                              .split("T")[0]
                              .split("-")
                              .reverse()
                              .join(" del ")
                              .slice(0, 20)}
                          </TableCell>
                          <TableCell className="dark:text-gray-300">
                            {loteMap?.cantidad_producto}
                          </TableCell>
                          <TableCell
                            align="right"
                            className="dark:text-gray-300"
                          >
                            {loteMap?.fecha_vencimiento
                              .split("T")[0]
                              .split("-")
                              .reverse()
                              .join(" del ")
                              .slice(0, 20)}
                          </TableCell>
                          <TableCell align="right">{children}</TableCell>
                        </TableRow>
                      )
                  )}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
};
