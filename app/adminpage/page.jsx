'use client'

import React, { useState, useEffect } from "react";

const AdminPage = () => {
  const [agItems, setAgItems] = useState([]);
  const [edmItems, setEdmItems] = useState([]);
  const [newAgCode, setNewAgCode] = useState("");
  const [newAgText, setNewAgText] = useState("");
  const [newEdmCode, setNewEdmCode] = useState("");
  const [newEdmText, setNewEdmText] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = () => {
    fetch("https://localhost:7195/api/ag")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch AG items.");
        }
        return response.json();
      })
      .then((data) => setAgItems(data))
      .catch((error) => setError(error.message));

    fetch("https://localhost:7195/api/edm")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch EDM items.");
        }
        return response.json();
      })
      .then((data) => setEdmItems(data))
      .catch((error) => setError(error.message));
  };

  const addAgItem = () => {
    fetch("https://localhost:7195/api/ag", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: generateId(), code: newAgCode, text: newAgText }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to add AG item.");
        }
        return response.json();
      })
      .then((data) => {
        setAgItems([...agItems, data]);
        setNewAgCode("");
        setNewAgText("");
      })
      .catch((error) => setError(error.message));
  };

  const addEdmItem = () => {
    fetch("https://localhost:7195/api/edm", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: generateId(), code: newEdmCode, text: newEdmText }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to add EDM item.");
        }
        return response.json();
      })
      .then((data) => {
        setEdmItems([...edmItems, data]);
        setNewEdmCode("");
        setNewEdmText("");
      })
      .catch((error) => setError(error.message));
  };

  const deleteAgItem = (id) => {
    fetch(`https://localhost:7195/api/ag/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to delete AG item.");
        }
        const updatedItems = agItems.filter((item) => item.id !== id);
        setAgItems(updatedItems);
      })
      .catch((error) => setError(error.message));
  };

  const deleteEdmItem = (id) => {
    fetch(`https://localhost:7195/api/edm/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to delete EDM item.");
        }
        const updatedItems = edmItems.filter((item) => item.id !== id);
        setEdmItems(updatedItems);
      })
      .catch((error) => setError(error.message));
  };

  const generateId = () => {
    return `ID${Math.random().toString(36).substr(2, 9)}`;
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold text-center my-4">Administración de AG y EDM</h1>
      
      {/* Formulario para agregar nuevo elemento AG */}
      <div className="my-4">
        <h2 className="text-xl font-bold">Agregar Nuevo AG</h2>
        <div className="flex items-center my-2">
          <input
            type="text"
            className="border rounded px-2 py-1 mr-2"
            placeholder="Código AG"
            value={newAgCode}
            onChange={(e) => setNewAgCode(e.target.value)}
          />
          <input
            type="text"
            className="border rounded px-2 py-1 mr-2"
            placeholder="Texto AG"
            value={newAgText}
            onChange={(e) => setNewAgText(e.target.value)}
          />
          <button
            className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
            onClick={addAgItem}
          >
            Agregar AG
          </button>
        </div>
      </div>

      {/* Lista de elementos AG existentes */}
      <div>
        <h2 className="text-xl font-bold">Elementos AG Existentes</h2>
        <ul className="list-disc list-inside my-2">
          {agItems.map((item) => (
            <li key={item.id} className="flex items-center justify-between my-1">
              <span>{item.code}: {item.text}</span>
              <button
                className="text-red-500 hover:text-red-700"
                onClick={() => deleteAgItem(item.id)}
              >
                Eliminar
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Formulario para agregar nuevo elemento EDM */}
      <div className="my-4">
        <h2 className="text-xl font-bold">Agregar Nuevo EDM</h2>
        <div className="flex items-center my-2">
          <input
            type="text"
            className="border rounded px-2 py-1 mr-2"
            placeholder="Código EDM"
            value={newEdmCode}
            onChange={(e) => setNewEdmCode(e.target.value)}
          />
          <input
            type="text"
            className="border rounded px-2 py-1 mr-2"
            placeholder="Texto EDM"
            value={newEdmText}
            onChange={(e) => setNewEdmText(e.target.value)}
          />
          <button
            className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
            onClick={addEdmItem}
          >
            Agregar EDM
          </button>
        </div>
      </div>

      {/* Lista de elementos EDM existentes */}
      <div>
        <h2 className="text-xl font-bold">Elementos EDM Existentes</h2>
        <ul className="list-disc list-inside my-2">
          {edmItems.map((item) => (
            <li key={item.id} className="flex items-center justify-between my-1">
              <span>{item.code}: {item.text}</span>
              <button
                className="text-red-500 hover:text-red-700"
                onClick={() => deleteEdmItem(item.id)}
              >
                Eliminar
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Manejo de errores */}
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
};

export default AdminPage;