'use client';

import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const Results = () => {
  const router = useRouter();
  const { data } = router.query;
  const [resultData, setResultData] = useState(null);

  useEffect(() => {
    if (data) {
      setResultData(JSON.parse(data));
    }
  }, [data]);

  if (!resultData) {
    return <div>Loading...</div>;
  }

  const prioritizedItems = [];
  const secondaryItems = [];

  resultData.rows.forEach((row) => {
    row.values.forEach((value, colIndex) => {
      if (value === "P") {
        prioritizedItems.push({ label: row.label, header: resultData.headers[colIndex].label });
      } else if (value === "S") {
        secondaryItems.push({ label: row.label, header: resultData.headers[colIndex].label });
      }
    });
  });

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold">Resultados</h2>
      <div className="mt-4">
        <h3 className="text-xl font-bold">Grupo Prioritario (P)</h3>
        <div className="grid grid-cols-5 gap-4 mt-2">
          {prioritizedItems.map((item, index) => (
            <div key={index} className="bg-blue-500 text-white p-4 rounded shadow-md">
              <h4 className="font-bold">{item.label}</h4>
              <p>{item.header}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-8">
        <h3 className="text-xl font-bold">Grupo Secundario (S)</h3>
        <div className="grid grid-cols-5 gap-4 mt-2">
          {secondaryItems.map((item, index) => (
            <div key={index} className="bg-gray-400 text-white p-4 rounded shadow-md">
              <h4 className="font-bold">{item.label}</h4>
              <p>{item.header}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Results;
