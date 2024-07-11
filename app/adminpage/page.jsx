'use client';

import React, { useState, useEffect } from 'react';

const AdminPage = () => {
  const [agItems, setAgItems] = useState([]);
  const [edmItems, setEdmItems] = useState([]);
  const [newAgCode, setNewAgCode] = useState('');
  const [newAgText, setNewAgText] = useState('');
  const [newEdmCode, setNewEdmCode] = useState('');
  const [newEdmText, setNewEdmText] = useState('');
  const [showAddAgModal, setShowAddAgModal] = useState(false);
  const [showAddEdmModal, setShowAddEdmModal] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = () => {
    fetch('https://localhost:7087/api/AGModels')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch AG items.');
        }
        return response.json();
      })
      .then((data) => setAgItems(data))
      .catch((error) => setError(error.message));

    fetch('https://localhost:7087/api/EDMModels')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch EDM items.');
        }
        return response.json();
      })
      .then((data) => setEdmItems(data))
      .catch((error) => setError(error.message));
  };

  const addAgItem = () => {
    fetch('https://localhost:7087/api/AGModels', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ codeText: newAgCode, text: newAgText }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to add AG item: ${response.status} ${response.statusText}`);
        }
        return response.json();
      })
      .then((data) => {
        setAgItems([...agItems, data]);
        setNewAgCode('');
        setNewAgText('');
        setShowAddAgModal(false);
      })
      .catch((error) => setError(error.message));
  };

  const addEdmItem = () => {
    fetch('https://localhost:7087/api/EDMModels', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ codeText: newEdmCode, text: newEdmText }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to add EDM item.');
        }
        return response.json();
      })
      .then((data) => {
        setEdmItems([...edmItems, data]);
        setNewEdmCode('');
        setNewEdmText('');
        setShowAddEdmModal(false);
      })
      .catch((error) => setError(error.message));
  };

  const deleteAgItem = (id) => {
    fetch(`https://localhost:7087/api/AGModels/${id}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to delete AG item.');
        }
        const updatedItems = agItems.filter((item) => item.id !== id);
        setAgItems(updatedItems);
      })
      .catch((error) => setError(error.message));
  };

  const deleteEdmItem = (id) => {
    fetch(`https://localhost:7087/api/EDMModels/${id}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to delete EDM item.');
        }
        const updatedItems = edmItems.filter((item) => item.id !== id);
        setEdmItems(updatedItems);
      })
      .catch((error) => setError(error.message));
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold text-center my-4">Administración de AG y EDM</h1>

      {/* Sección AG */}
      <div>
        <h2 className="text-2xl font-bold">AG</h2>
        <button
          className="bg-teal-500 text-white px-4 py-1 rounded my-2"
          onClick={() => setShowAddAgModal(true)}
        >
          Agregar
        </button>
        <div className="grid grid-cols-5 gap-4">
          {agItems.map((item) => (
            <div key={item.id} className="bg-gray-200 p-4 rounded shadow-md">
              <h3 className="font-bold">{item.codeText}</h3>
              <p>{item.text}</p>
              <button
                className="text-red-500 hover:text-red-700 mt-2"
                onClick={() => deleteAgItem(item.id)}
              >
                Eliminar
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Modal para agregar AG */}
      {showAddAgModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-md">
            <h2 className="text-2xl font-bold">AGREGAR NUEVO AG</h2>
            <input
              type="text"
              className="border rounded px-2 py-1 my-2 w-full"
              placeholder="Código AG"
              value={newAgCode}
              onChange={(e) => setNewAgCode(e.target.value)}
            />
            <textarea
              className="border rounded px-2 py-1 my-2 w-full"
              placeholder="Texto AG"
              value={newAgText}
              onChange={(e) => setNewAgText(e.target.value)}
            />
            <button
              className="bg-teal-500 text-white px-4 py-2 rounded"
              onClick={addAgItem}
            >
              Agregar
            </button>
            <button
              className="bg-gray-500 text-white px-4 py-2 rounded ml-2"
              onClick={() => setShowAddAgModal(false)}
            >
              Cancelar
            </button>
          </div>
        </div>
      )}

      {/* Sección EDM */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold">EDM</h2>
        <button
          className="bg-teal-500 text-white px-4 py-1 rounded my-2"
          onClick={() => setShowAddEdmModal(true)}
        >
          Agregar
        </button>
        <div className="grid grid-cols-5 gap-4">
          {edmItems.map((item) => (
            <div key={item.id} className="bg-gray-200 p-4 rounded shadow-md">
              <h3 className="font-bold">{item.codeText}</h3>
              <p>{item.text}</p>
              <button
                className="text-red-500 hover:text-red-700 mt-2"
                onClick={() => deleteEdmItem(item.id)}
              >
                Eliminar
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Modal para agregar EDM */}
      {showAddEdmModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-md">
            <h2 className="text-2xl font-bold">AGREGAR NUEVO EDM</h2>
            <input
              type="text"
              className="border rounded px-2 py-1 my-2 w-full"
              placeholder="Código EDM"
              value={newEdmCode}
              onChange={(e) => setNewEdmCode(e.target.value)}
            />
            <textarea
              className="border rounded px-2 py-1 my-2 w-full"
              placeholder="Texto EDM"
              value={newEdmText}
              onChange={(e) => setNewEdmText(e.target.value)}
            />
            <button
              className="bg-teal-500 text-white px-4 py-2 rounded"
              onClick={addEdmItem}
            >
              Agregar
            </button>
            <button
              className="bg-gray-500 text-white px-4 py-2 rounded ml-2"
              onClick={() => setShowAddEdmModal(false)}
            >
              Cancelar
            </button>
          </div>
        </div>
      )}

      {/* Manejo de errores */}
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
};

export default AdminPage;
