'use client'

import React, { useState } from "react";

const initialData = {
  headers: [
    { id: "EG01", label: "Portafolio de productos y servicios competitivos" },
    { id: "EG02", label: "Gestión de riesgo de negocio" },
    { id: "EG03", label: "Cumplimiento con las leyes y regulaciones externas" },
    { id: "EG04", label: "Calidad de la información financiera" },
    { id: "EG05", label: "Cultura de servicio orientada al cliente" },
    {
      id: "EG06",
      label: "Continuidad y disponibilidad del servicio del negocio",
    },
    { id: "EG07", label: "Calidad de la información sobre gestión" },
    {
      id: "EG08",
      label:
        "Optimización de la funcionalidad de procesos internos del negocio",
    },
    { id: "EG09", label: "Optimización de costes de los procesos del negocio" },
    {
      id: "EG10",
      label: "Habilidades, motivación y productividad del personal",
    },
    { id: "EG11", label: "Cumplimiento de las políticas internas" },
    { id: "EG12", label: "Gestión de programas de transformación digital" },
    { id: "EG13", label: "Innovación de productos y negocios" },
  ],
  rows: [
    {
      id: "AG01",
      label:
        "Cumplimiento y soporte de I&T para el cumplimiento empresarial con las leyes y regulaciones externas",
      values: ["", "", "", "", "", "", "", "", "", "", "", "", ""],
    },
    {
      id: "AG02",
      label: "Gestión de riesgo relacionado con I&T",
      values: ["", "", "", "", "", "", "", "", "", "", "", "", ""],
    },
    {
      id: "AG03",
      label:
        "Beneficios obtenidos del portafolio de inversiones y servicios relacionados con I&T",
      values: ["", "", "", "", "", "", "", "", "", "", "", "", ""],
    },
    {
      id: "AG04",
      label:
        "Calidad de la informaci6n financiera relacionada con la tecnologia",
      values: ["", "", "", "", "", "", "", "", "", "", "", "", ""],
    },
    {
      id: "AG05",
      label:
        "Prestacion de servicios de I&T conforme a los requisitos del negocio",
      values: ["", "", "", "", "", "", "", "", "", "", "", "", ""],
    },
    {
      id: "AG06",
      label:
        "Agilidad para convertir los requisitos del negocio en soluciones operativas",
      values: ["", "", "", "", "", "", "", "", "", "", "", "", ""],
    },
    {
      id: "AG07",
      label:
        "Seguridad de la informacion, infraestructura de procesamiento, aplicaciones y privacidad",
      values: ["", "", "", "", "", "", "", "", "", "", "", "", ""],
    },
    {
      id: "AG08",
      label:
        "Habilitar y dar soporte a procesos de negocio mediante Ia integracion de aplicaciones y tecnologia",
      values: ["", "", "", "", "", "", "", "", "", "", "", "", ""],
    },
    {
      id: "AG09",
      label:
        "Ejecucion de programas dentro del plazo, sin exceder eI presupuesto, y que cumplen con los requisitos y eståndares de calidad",
      values: ["", "", "", "", "", "", "", "", "", "", "", "", ""],
    },
    {
      id: "AG010",
      label:
        "Calidad de la informacion sobre gestion de I&T",
      values: ["", "", "", "", "", "", "", "", "", "", "", "", ""],
    },
    {
      id: "AG11",
      label:
        "Cumplimiento de I&T con las politicas internas",
      values: ["", "", "", "", "", "", "", "", "", "", "", "", ""],
    },
    {
      id: "AG12",
      label:
        "Personal competente y motivado con un entendimiento mutuo de la tecnologia y el negocio",
      values: ["", "", "", "", "", "", "", "", "", "", "", "", ""],
    },
    {
      id: "AG013",
      label:
        "Conocimiento, experiencia e iniciativas para la innovacion empresarial",
      values: ["", "", "", "", "", "", "", "", "", "", "", "", ""],
    },

    // Añadir el resto de filas según sea necesario
  ],
};

const Table = ({ setResult }) => {
  const [data, setData] = useState(initialData);

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
      ...initialData,
      rows: initialData.rows.map((row) => ({
        ...row,
        values: row.values.map(() => ""),
      })),
    };
    setData(resetData);
  };

  const handleNext = () => {
    setResult(data);
  };

  const handleClearRow = (rowIndex) => {
    const newData = { ...data };
    newData.rows[rowIndex].values = new Array(newData.headers.length).fill("");
    setData(newData);
  };

  return (
    <div className="p-4">
      <table className="table-auto w-full border-collapse border border-gray-200">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2"></th>
            {data.headers.map((header, index) => (
              <th key={header.id} className="border border-gray-300 px-1 py-2">
                {header.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.rows.map((row, rowIndex) => (
            <tr key={row.id}>
              <td className="border border-gray-300 px-4 py-2">{row.label}</td>
              {row.values.map((value, colIndex) => (
                <td
                  key={colIndex}
                  onClick={() => handleCellClick(rowIndex, colIndex)}
                  className={`border border-gray-300 px-4 py-2 cursor-pointer ${
                    value === "P"
                      ? "bg-blue-500 text-white"
                      : value === "S"
                      ? "bg-gray-600 text-white"
                      : ""
                  }`}
                >
                  {value}
                </td>
              ))}
              <td>
                {row.values.filter((val) => val === "P" || val === "S").length >
                  2 && (
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
