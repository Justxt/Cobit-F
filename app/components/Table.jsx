'use client'

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const Table = ({ setResult }) => {
  const [data, setData] = useState({
    headers: [],
    rows: []
  });
  const router = useRouter();

  useEffect(() => {
    const fetchHeaders = async () => {
      try {
        const response = await fetch("https://localhost:7087/api/EDMModels");
        if (!response.ok) {
          throw new Error("Error al obtener los headers");
        }
        const headersData = await response.json();
        const headers = headersData.map(item => ({
          id: item.codeText,
          label: item.text
        }));
        setData(prevState => ({ ...prevState, headers }));
      } catch (error) {
        console.error("Error fetching EDMModels:", error);
      }
    };

    const fetchRows = async () => {
      try {
        const response = await fetch("https://localhost:7087/api/AGModels");
        if (!response.ok) {
          throw new Error("Error al obtener los rows");
        }
        const rowsData = await response.json();
        const rows = rowsData.map(item => ({
          id: item.codeText,
          label: item.text,
          values: new Array(data.headers.length).fill("")
        }));
        setData(prevState => ({ ...prevState, rows }));
      } catch (error) {
        console.error("Error fetching AGModels:", error);
      }
    };

    fetchHeaders();
    fetchRows();
  }, [data.headers.length]);

  const handleCellClick = (rowIndex, colIndex) => {
    const newData = { ...data };
    const currentValue = newData.rows[rowIndex].values[colIndex];
    const newValue =
      currentValue === "P" ? "S" : currentValue === "S" ? "" : "P";
    newData.rows[rowIndex].values[colIndex] = newValue;
    setData(newData);
  };

  const handleReset = () => {
    const resetData = {
      headers: data.headers,
      rows: data.rows.map(row => ({
        ...row,
        values: new Array(data.headers.length).fill("")
      }))
    };
    setData(resetData);
  };

  const handleNext = () => {
    // Convertimos los resultados a JSON y los pasamos como query param a la página de resultados
    const results = JSON.stringify(data);
    router.push({
      pathname: '/ResultPage',
      query: { results },
    });
  };

  const handleClearRow = rowIndex => {
    const newData = { ...data };
    newData.rows[rowIndex].values = new Array(newData.headers.length).fill("");
    setData(newData);
  };

  const isHeaderP = colIndex => {
    return data.rows.some(row => row.values[colIndex] === "P");
  };

  return (
    <div className="p-4">
      <table className="table-auto w-full border-collapse border border-gray-200">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2"></th>
            {data.headers.map((header, index) => (
              <th
                key={header.id}
                className={`border border-gray-300 px-1 py-2 text-xs ${
                  isHeaderP(index) ? "bg-blue-500 text-white" : ""
                }`}
              >
                {header.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.rows.map((row, rowIndex) => (
            <tr key={row.id}>
              <td className="border border-gray-300 px-4 py-2 text-xs">
                {row.label}
              </td>
              {row.values.map((value, colIndex) => (
                <td
                  key={colIndex}
                  onClick={() => handleCellClick(rowIndex, colIndex)}
                  className={`border border-gray-300 px-4 py-2 cursor-pointer text-xs ${
                    value === "P" ? "bg-blue-500 text-white" : value === "S" ? "bg-gray-400 text-white" : ""
                  }`}
                >
                  {value}
                </td>
              ))}
              <td>
                {row.values.filter(val => val === "P" || val === "S").length >
                  0 && (
                  <button
                    className="bg-red-500 text-white py-1 px-3 rounded-lg"
                    onClick={() => handleClearRow(rowIndex)}
                  >
                    x
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-4">
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded-lg mr-3"
          onClick={handleReset}
        >
          Reiniciar
        </button>
        <button
          className="bg-green-500 text-white py-2 px-4 rounded-lg"
          onClick={handleNext}
        >
          Siguiente
        </button>
      </div>
    </div>
  );
};

export default Table;
