import React, { useEffect, useState } from "react";
import { useUsers } from "../../hooks/useUsers";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  getFilteredRowModel,
  getSortedRowModel,
} from "@tanstack/react-table";
import {
  RiArrowDropLeftLine,
  RiArrowDropRightLine,
  RiArrowLeftDoubleLine,
  RiArrowRightDoubleLine,
  RiDeleteBin7Line,
  RiEdit2Line,
  RiInformationLine,
  RiLineHeight,
  RiLoopLeftFill,
  RiSearch2Line,
  RiSortAsc,
  RiSortDesc,
} from "react-icons/ri";
import { rankItem } from "@tanstack/match-sorter-utils";
import classNames from "classnames";
import { ModalForm } from "./ModalForm";
import { NavLink } from "react-router-dom";
const fuzzyFilter = (row, columnId, value, addMeta) => {
  const itemRank = rankItem(row.getValue(columnId), value);

  addMeta({ itemRank });

  return itemRank.passed;
};

const DebuncedInput = ({ value: keyWord, onchange, ...props }) => {
  const [value, setValue] = useState(keyWord);

  useEffect(() => {
    const timeout = setTimeout(() => {
      onchange(value);
    }, 500);

    return () => clearTimeout(timeout);
  }, [value]);

  return (
    <input
      {...props}
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
};

export const DataTable = ({ dataUsers }) => {
  const {
    visibleFormCreate,
    isLoadingUsers,
    handlerOpenFormCreate,
    getUsers,
    handlerUserSelectedForm,
    handlerRemoveUser,
  } = useUsers();
  const [data, setData] = useState(dataUsers);
  const [globalFilter, setGlobalFilter] = useState("");
  const [sorting, setSorting] = useState([]);

  useEffect(() => {
    setData(dataUsers);
  }, [dataUsers]);

  if (isLoadingUsers) {
    return (
      <div className="flex flex-col gap-2 items-center bg-secondary-900 py-4 rounded-lg">
        <div className="animate-spin rounded-full border-t-4 border-secondary border-opacity-50 h-12 w-12"></div>
        <span className="text-primary text-2xl flex items-center gap-2">
          {" "}
          <RiLoopLeftFill /> Cargando usuarios ...
        </span>
      </div>
    );
  }

  const columns = [
    {
      accessorKey: "name",
      header: () => <span>Nombre(s)</span>,
    },
    {
      accessorKey: "lastName",
      header: () => <span>Apellido(s)</span>,
    },
    {
      accessorKey: "email",
      header: () => <span>Correo</span>,
    },
    {
      accessorKey: "actions",
      header: "Acciones",
      enableSorting: false,
    },
  ];

  const getStateTable = () => {
    const totalRows = table.getFilteredRowModel().rows.length;
    const pageSize = table.getState().pagination.pageSize;
    const pageIndex = table.getState().pagination.pageIndex;
    const rowsPerPage = table.getRowModel().rows.length;

    const firstIndex = pageIndex * pageSize + 1;
    const lastIndex = pageIndex * pageSize + rowsPerPage;
    return {
      totalRows,
      firstIndex,
      lastIndex,
    };
  };

  const table = useReactTable({
    data,
    columns,
    state: {
      globalFilter,
      sorting,
    },
    initialState: {
      pagination: {
        pageSize: 5,
      },
    },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    globalFilterFn: fuzzyFilter,
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
  });
  return (
    <>
      <div className="">
        {/*input*/}
        <div className="mb-5">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-y-4 ">
            <h1 className=" font-bold text-sm md:text-3xl mb-6">
              Busca el usuario por cualquier campo.
            </h1>
            {visibleFormCreate || (
              <button
                className="font-bold text-xs py-2 px-4 bg-primary/80 text-black hover:bg-primary rounded-lg transition-colors"
                onClick={handlerOpenFormCreate}
              >
                Agregar Usuario
              </button>
            )}
          </div>

          {visibleFormCreate || (
            <div className="relative">
              <RiSearch2Line className="absolute top-1/2  -translate-y-1/2 left-4" />
              <DebuncedInput
                type="text"
                value={globalFilter ?? ""}
                onchange={(value) => {
                  setGlobalFilter(String(value));
                  getUsers();
                }}
                className="bg-secondary-900 outline-none py-2 pr-4 pl-10 rounded-lg
              placeholder:text-gray-500 w-full"
                placeholder="Buscar..."
              />
            </div>
          )}
        </div>
        {/*Modal para crear*/}
        {!visibleFormCreate || <ModalForm />}
        {/*Tabla */}
        <div className="overflow-x-auto">
          <table className="table-auto min-w-full">
            <thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      className="py-2 px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12"
                    >
                      {header.isPlaceholder ? null : (
                        <div
                          className={classNames({
                            " flex items-center gap-2 justify-between select-none cursor-pointer hover:text-primary hover:bg-secondary-900 py-2 px-2 rounded-lg":
                              header.column.getCanSort(),
                          })}
                          onClick={header.column.getToggleSortingHandler()}
                        >
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                          {{
                            asc: <RiSortAsc />,
                            desc: <RiSortDesc />,
                          }[header.column.getIsSorted()] ??
                            (header.column.getCanSort() ? (
                              <RiLineHeight />
                            ) : null)}
                        </div>
                      )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.map((row) => (
                <tr key={row.id} className="bg-secondary-900 ">
                  {row.getVisibleCells().map((cell) => (
                    <td
                      key={cell.id}
                      className="py-2 px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 border "
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                      {cell.column.id === "actions" && (
                        <div className="flex items-center gap-2">
                          <NavLink className="py-2 px-2 bg-primary/80 text-black hover:bg-secondary-100 rounded-lg transition-colors" to={"users/show/"+row.original.id}>
                            <RiInformationLine className="text-lg" />
                          </NavLink>
                          <button
                            type="button"
                            className="py-2 px-2 bg-primary/80 text-black hover:bg-primary rounded-lg transition-colors"
                            onClick={() => {
                              // Pasa los datos del usuario al hacer clic en el botón de edición
                              handlerUserSelectedForm(row.original);
                            }}
                          >
                            <RiEdit2Line className="text-lg" />
                          </button>
                          <button
                            type="button"
                            className="py-2 px-2 bg-secondary-100/50 hover:bg-secondary-100 text-red-500/70 hover:text-red-500
                 transition-colors rounded-lg  flex items-center "
                            onClick={() => {
                              handlerRemoveUser(row.original.id);
                            }}
                          >
                            <RiDeleteBin7Line className="text-lg" />
                          </button>
                        </div>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/*Paginador*/}
        <div className="mt-4 flex flex-col  items-center justify-between space-y-4 text-center">
          <div className="md:flex grid grid-cols-5 items-center gap-2">
            <button
              className="p-2 hover:bg-secondary-900 rounded-lg  hover:text-primary
          disabled:hover:bg-secondary-100 disabled:text-gray-300 transition-colors "
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}
            >
              <RiArrowLeftDoubleLine className="text-2xl" />
            </button>
            <button
              className="p-2 hover:bg-secondary-900 rounded-lg hover:text-primary
          disabled:hover:bg-secondary-100 disabled:text-gray-300 transition-colors"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              <RiArrowDropLeftLine className="text-2xl" />
            </button>

            {table.getPageOptions().map((value, key) => (
              <button
                key={key}
                className={classNames({
                  "text-gray-100 bg-secondary-100 py-0.5 px-2 font-bold rounded-lg hover:bg-secondary-900 hover:text-primary disabled:hover:bg-secondary-100 disabled:text-gray-300": true,
                  "bg-secondary-900 text-primary":
                    value === table.getState().pagination.pageIndex,
                })}
                onClick={() => table.setPageIndex(value)}
              >
                {value + 1}
              </button>
            ))}

            <button
              className="p-2 hover:bg-secondary-900 rounded-lg hover:text-primary
              disabled:hover:bg-secondary-100 disabled:text-gray-300 transition-colors"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              <RiArrowDropRightLine className="text-2xl" />
            </button>
            <button
              className="p-2 hover:bg-secondary-900 rounded-lg hover:text-primary
              disabled:hover:bg-secondary-100 disabled:text-gray-300 transition-colors"
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              disabled={!table.getCanNextPage()}
            >
              <RiArrowRightDoubleLine className="text-2xl" />
            </button>
          </div>
          <div className="text-gray-600 font-semibold">
            Mostrando registros del {getStateTable().firstIndex} a{" "}
            {getStateTable().lastIndex} de un total de{" "}
            {getStateTable().totalRows} registros{" "}
          </div>
          {/*Selector */}
          <select
            className="bg-secondary-900 text-primary font-bold  rounded-lg outline-secondary-100 py-2"
            onChange={(e) => table.setPageSize(Number(e.target.value))}
          >
            <option value="5">5 reg.</option>
            <option value="10">10 reg.</option>
            <option value="20">20 reg.</option>
            <option value="25">25 reg.</option>
            <option value="30">30 reg.</option>
          </select>
        </div>
      </div>
    </>
  );
};
