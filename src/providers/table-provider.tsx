"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

interface TableContextType {
  tableData: { tableId: number; barId: number } | null;
  setTableData: (data: { tableId: number; barId: number }) => void;
  selectedCategoryData: string | null;
  setSelectedCategoryData: (category: string | null) => void;
  searchArticleData: string;
  setSearchArticle: (search: string) => void;
}

const TableContext = createContext<TableContextType | undefined>(undefined);

export const TableProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [tableData, setTableDataState] = useState<{
    tableId: number;
    barId: number;
  } | null>(null);

  const [selectedCategoryData, setSelectedCategoryDataState] = useState<
    string | null
  >(null);
  const [searchArticleData, setSearchArticleState] = useState<string>("");

  const setSelectedCategoryData = (category: string | null) => {
    setSelectedCategoryDataState(category);
  };

  const setSearchArticle = (search: string) => {
    setSearchArticleState(search);
  };

  const setTableData = (data: { tableId: number; barId: number }) => {
    setTableDataState(data);
  };

  return (
    <TableContext.Provider
      value={{
        tableData,
        setTableData,
        selectedCategoryData,
        setSelectedCategoryData,
        searchArticleData,
        setSearchArticle,
      }}
    >
      {children}
    </TableContext.Provider>
  );
};

export const useTable = (): TableContextType => {
  const context = useContext(TableContext);
  if (!context) {
    throw new Error("useTable must be used within a TableProvider");
  }
  return context;
};
