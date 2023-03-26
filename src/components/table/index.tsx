import React, { useContext, useEffect, useMemo } from "react";
import { styled } from "../../../stitches.config";
import { Pessoa } from "@/services/pessoaService";
import { useTable } from "react-table";
import { Estado } from "@/services/estadoService";
import { GlobalContext } from "@/contexts/globalContext";
type Column<T> = {
  Header: string;
  accessor: string;
};
interface ITable {
  columns: Column<Pessoa>[];
  data: any;
}
const Table = ({ columns, data }: ITable) => {
  const tableData = useMemo(() => {
    return data;
  }, [data]);
  const tableColumns = columns as any;
  const tableInstance = useTable({ columns: tableColumns, data: tableData });

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;
  const { pessoas, estados } = useContext(GlobalContext);

  return (
    <TableStyle {...getTableProps()}>
      <thead>
        {headerGroups.map((headerGroup, i) => (
          <tr {...headerGroup.getHeaderGroupProps()} key={i}>
            {headerGroup.headers.map((column, i) => (
              <th {...column.getHeaderProps()} key={i}>
                {column.render("Header")}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row, i) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()} key={i}>
              {row.cells.map((cell, i) => (
                <td {...cell.getCellProps()} key={i}>
                  {cell.render("Cell")}
                </td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </TableStyle>
  );
};

const TableStyle = styled("table", {
  fontFamily: "Roboto, sans-serif",
  borderCollapse: "collapse",
  width: "70%",
  background: "White",
  borderRadius: "5px",
  "& th, td": {
    padding: "16px",
    textAlign: "left",
    borderBottom: "1px solid rgba(224, 224, 224, 1)",
    borderRadius: "8px",
  },
  "& tbody tr:last-of-type td": {
    borderBottom: "none",
  },
  "& th": {
    fontWeight: 700,
    color: "#4d4d4d",
    backgroundColor: "#fafafa",
    textTransform: "uppercase",
    fontSize: "0.8rem",
    letterSpacing: "0.1em",
    borderRadius: "8px",
  },
  "& tbody tr:nth-of-type(even)": {
    backgroundColor: "#f7f7f7",
  },
  "& tbody tr:hover": {
    backgroundColor: "#f0f0f0",
  },
  "& td": {
    color: "#3c3c3c",
    fontSize: "0.9rem",
    lineHeight: "1.5",
    textOverflow: "ellipsis",
    overflow: "hidden",
    whiteSpace: "nowrap",
  },
});

export default Table;
