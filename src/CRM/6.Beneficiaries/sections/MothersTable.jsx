import React, { useMemo } from "react";
import { useReactTable, getCoreRowModel, flexRender, getPaginationRowModel } from "@tanstack/react-table";
import { Icon } from "@iconify/react";
import { mockMothers } from "../mockData";

const MothersTable = () => {
  const data = useMemo(() => mockMothers, []);

  const columns = useMemo(() => [
    { header: "ID", accessorKey: "id", cell: (info) => <span className="font-bold text-brand-dark-400">{info.getValue()}</span> },
    { 
      header: "Name", 
      accessorKey: "name", 
      cell: (info) => (
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-brand-lilac-100 flex items-center justify-center text-brand-lilac font-bold text-xs">{info.getValue().charAt(0)}</div>
          <span className="font-primary font-bold text-brand-dark">{info.getValue()}</span>
        </div>
      )
    },
    { header: "Location", accessorKey: "location" },
    { header: "Program", accessorKey: "program", cell: (info) => <span className="px-3 py-1 rounded-full bg-brand-navy-100 text-brand-navy-900 text-[10px] font-bold uppercase tracking-wider">{info.getValue()}</span> },
    { 
      header: "Status", 
      accessorKey: "status", 
      cell: (info) => {
        const status = info.getValue();
        let color = "bg-brand-teal text-white";
        if (status === "Pending") color = "bg-brand-gold text-brand-navy-900";
        if (status === "Graduated") color = "bg-brand-navy text-white";
        return <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${color}`}>{status}</span>;
      }
    },
    { 
      header: "Impact", 
      accessorKey: "impactScore", 
      cell: (info) => (
        <div className="flex items-center gap-2 w-24">
          <div className="flex-1 h-1.5 bg-brand-dark-200/20 rounded-full overflow-hidden">
            <div className="h-full bg-brand-gold" style={{ width: `${info.getValue()}%` }}></div>
          </div>
          <span className="text-[10px] font-bold text-brand-dark-400">{info.getValue()}%</span>
        </div>
      )
    },
    { header: "Actions", id: "actions", cell: () => (
      <div className="flex gap-2">
        <button className="p-2 hover:bg-brand-teal/10 text-brand-teal transition-colors rounded-lg"><Icon icon="heroicons:eye" className="w-5 h-5" /></button>
        <button className="p-2 hover:bg-brand-gold/10 text-brand-gold transition-colors rounded-lg"><Icon icon="heroicons:pencil-square" className="w-5 h-5" /></button>
      </div>
    )},
  ], []);

  const table = useReactTable({ data, columns, getCoreRowModel: getCoreRowModel(), getPaginationRowModel: getPaginationRowModel(), initialState: { pagination: { pageSize: 5 } } });

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-brand-dark-200/10 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead className="bg-brand-white border-b border-brand-dark-200/10">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id} className="p-4 text-[11px] font-bold text-brand-dark-400 uppercase tracking-widest">{flexRender(header.column.columnDef.header, header.getContext())}</th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="divide-y divide-brand-dark-200/5">
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="hover:bg-brand-white-200 transition-colors duration-200 group">
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="p-4 text-sm font-secondary text-brand-dark-600">{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MothersTable;
